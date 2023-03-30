const pool = require('../config/db');



exports.GetFillValues = async (userId, officeId) => {

    let offices = await Offices();
    let awbNos = await AwbNos(userId);
    let vendors = await Offices();
    let wheelDetails = await WheelDetails();

    return {

        offices,
        awbNos,
        defaultValues: {
            officeId
        },
        vendors,
        wheelDetails

    }


}

exports.CreateManifest = async (data) => {

    let con = await pool.getConnection();
    
    try{
        
        con.beginTransaction();

        let sql =
        `
    insert into client_1001.c_manifest SET ?
     
  `
    let para = {

        manifest_date: new Date(data?.manifest_date),
        origin_office_id: data?.origin_office_id,
        destination_office_id: data?.destination_office_id,
        is_received: false

    }

    let res = await con.query(sql, [para]);
    let manifestId = res[0]?.insertId;

    let values = data?.awb_id?.map(x=>{
        return [manifestId,x]
    })

    let awbDetailsql = ` Insert into client_1001.c_manifest_awb_detail (manifest_id,awb_id) values ?`
    let awbDetailRes = await con.query(awbDetailsql,[values]);

    con.commit();
    return manifestId;

    }
    catch(ex){
        con.rollback();
        throw ex;
    }
    finally{
        con.release();
    }


   
}

exports.CreateManifestDetail = async (data, manifestId) => {

    let sql =
        `
      insert into client_1001.c_manifest_detail SET ?
       
    `
    let para = {
        manifest_id: manifestId,
        vendor_id: data?.vendor_id,
        wheel_id: data?.wheel_detail_id,
    }

    let res = await pool.query(sql, [para]);
    return res[0];
}

exports.DeleteManifest = async (manifestId) => {

    let detailDeleteSql =
        `
      delete from client_1001.c_manifest_detail where manifest_id = ${manifestId}
       
    `
    let detailDeleteAwbSql =
        `
      delete from client_1001.c_manifest_awb_detail where manifest_id = ${manifestId}
       
    `
    let mainDeleteSql =
        `
      delete from client_1001.c_manifest where manifest_id = ${manifestId}
       
    `

    let con = await pool.getConnection();

    try {

        con.beginTransaction();

        await con.query(detailDeleteSql);
        await con.query(detailDeleteAwbSql);
        await con.query(mainDeleteSql);

        con.commit();

        return true;

    }
    catch (ex) {
        con.rollback();
        throw ex;
    }
    finally {
        con.release();
    }

}

exports.GetManifests = async () => {

    let detailDeleteSql =
        `
        SELECT m.*,
        Office.office_name AS 'origin_office',
        DOffice.office_name AS 'destination_office',
        (
		     SELECT GROUP_CONCAT(awb.awb_prefix) AS awbno
			  FROM client_1001.c_manifest_awb_detail as mawb
			  INNER JOIN client_1001.c_awb_type AS awb ON awb.awb_id = mawb.awb_id
			  WHERE mawb.manifest_id = m.manifest_id
			  GROUP BY mawb.manifest_id
		  ) AS 'awb_no',
        
        ROW_NUMBER() over(Order By manifest_id )AS seq ,
         true as 'delete'
         From client_1001.c_manifest AS m
         INNER JOIN client_1001.c_office AS Office ON Office.office_id = m.origin_office_id
         INNER JOIN client_1001.c_office AS DOffice ON DOffice.office_id = m.destination_office_id
      
         WHERE  m.status = 1
         AND m.is_visible =1
       
    `
    let res = await pool.query(detailDeleteSql);

    return res[0];

}

async function Offices() {

    let officeSql = `
       
    select office_id as Id,
    office_name as OfficeName
    From client_1001.c_office 
    where  status = 1
    And is_visible =1 
    
`

    let offices = await pool.query(officeSql);
    return offices[0]
}

async function AwbNos(userId) {

    let awbNosSql = `
    Select awb.awb_id,awb.awb_type,MAX(awb.awb_prefix) AS awb_prefix
    from client_1001.c_awb_type as awb
    inner join client_1001.c_booking as bk on bk.awb_id = awb.awb_id
    inner join client_1001.c_office as office on office.office_id = bk.booking_office_id
    inner join client_1001.c_user as u on u.office_id = office.office_id
    left join client_1001.c_office as childOffice on childOffice.parent_office_id = office.office_id
    left join client_1001.c_manifest_awb_detail as mawb on mawb.awb_id = awb.awb_id
    where u.id =  ${userId}
    And  awb.status = 1
    And awb.is_visible =1 
    AND mawb.awb_id IS null
    GROUP BY awb.awb_id,awb.awb_type
    `

    let awbNos = await pool.query(awbNosSql);

    return awbNos[0]


}

async function WheelDetails(){
    let sql = `
      select *
      From client_1001.c_wheel_detail
      where  status = 1
      And is_visible =1 
    `

   let result = await pool.query(sql);
   return result[0]; 
}