const pool = require('../config/db');
const connection = require('../config/db-transaction');
const placeService = require('../services/placeService');
const { format } = require('date-fns');

exports.SearchAWBNumber = async (str) => {

    let col = [
        'max(awb.awb_prefix) as AwbPrefix',
        'awb.awb_id as AwbId',
        'isu.id as IssueId',
        'max(isu.office_id) as OfficeId',
        'awb.payment_mode_id as PaymentModeId'
    ]
    let sql = `
            Select ${col}
            From client_1001.c_awb_type as awb
            inner join client_1001.c_awb_issue as isu on isu.awb_id = awb.awb_id
            where convert(awb.awb_prefix,char) Like '%${str}%'
            And awb.status = 1 And awb.is_visible = 1
            group by awb_prefix,isu.id
       `
    const result = await pool.query(sql);
    return result[0];
}

exports.SearchPinCode = async (str, id) => {

    let col = [
        'post_code_id as Id',
        'post_code as PostCode',
        'state_id as StateId',
        'city_id as CityId',
        'region_id as RegionId',
        'zone_id as ZoneId',
        'country_id as CountryId'
    ]
    let sql = `
            Select ${col}
            From dac.da_post_code 
            where status = 1 And is_visible = 1
            And ${str ? `post_code like '%${str}%'` : `post_code_id = ${id}`}
       `
    const result = await pool.query(sql);
    return result[0];
}
exports.SearchCities = async (str) => {

    const col = ['da_city.city_id as `Id`',
        'da_city.city_name as `Name`',
        'da_state.state_id as `StateId`',
        'da_state.state_name as `State`',
        'da_region.region_name as `Region`',
        'da_zone.zone_name as `Zone`',
        'da_country.country_name as `Country`',
        'da_city.status as `Status`',
        'da_city.created_at as `Created At`'
    ];

    const sql = `SELECT ${col}
            FROM 
            da_city 
            JOIN da_state ON da_city.state_id = da_state.state_id 
            JOIN da_region ON da_state.region_id = da_region.region_id 
            JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
            JOIN da_country ON da_zone.country_id = da_country.country_id 
            where da_city.city_name like '%${str}%'
    `;

    const result = await pool.query(sql);
    return result[0];
}
exports.SearchStates = async (str) => {

    const col = ['da_state.state_id as `Id`',
        'da_state.state_name as `Name`',
        'da_region.region_id as `RegionId`',
        'da_region.region_name as `Region`',
        'da_zone.zone_name as `Zone`',
        'da_country.country_name as `Country`',
        'da_state.status as `Status`',
        'da_state.created_at as `Created At`'
    ];

    const sql = `SELECT ${col}
    FROM 
      da_state 
      JOIN da_region ON da_state.region_id = da_region.region_id
      JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
      JOIN da_country ON da_zone.country_id = da_country.country_id 
      where da_state.state_name like '%${str}%'
    `;

    const result = await pool.query(sql);
    return result[0];
}

exports.GetLocalitiesOnPostCode = async (postCodeId) => {

    let col = [
        'locality_id as Id',
        'locality_name as LocalityName',
        'state_id as StateId',
        'city_id as CityId',
        'region_id as RegionId',
        'zone_id as ZoneId',
        'country_id as CountryId'
    ]
    let sql = `
            Select ${col}
            From dac.da_locality as L
            where status = 1 And is_visible = 1
            And L.post_code_id  = ${postCodeId}
       `
    const result = await pool.query(sql);
    return result[0];

}

exports.GetCityById = async (id) => {

    const col = ['da_city.city_id as `Id`',
        'da_city.city_name as `Name`',
        'da_state.state_id as `StateId`',
        'da_state.state_name as `State`',
        'da_region.region_name as `Region`',
        'da_zone.zone_name as `Zone`',
        'da_country.country_name as `Country`',
        'da_city.status as `Status`',
        'da_city.created_at as `Created At`'
    ];

    const sql = `SELECT ${col}
            FROM 
            da_city 
            JOIN da_state ON da_city.state_id = da_state.state_id 
            JOIN da_region ON da_state.region_id = da_region.region_id 
            JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
            JOIN da_country ON da_zone.country_id = da_country.country_id 
            where da_city.city_id = ${id}
    `;

    const result = await pool.query(sql);
    return result[0];
}
exports.GetStateById = async (id) => {

    const col = ['da_state.state_id as `Id`',
        'da_state.state_name as `Name`',
        'da_region.region_id as `RegionId`',
        'da_region.region_name as `Region`',
        'da_zone.zone_name as `Zone`',
        'da_country.country_name as `Country`',
        'da_state.status as `Status`',
        'da_state.created_at as `Created At`'
    ];

    const sql = `SELECT ${col}
            FROM 
            da_state 
            JOIN da_region ON da_state.region_id = da_region.region_id
            JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
            JOIN da_country ON da_zone.country_id = da_country.country_id 
            where da_state.state_id = ${id}
    `;

    const result = await pool.query(sql);
    return result[0];
}

exports.GetLocalitiesById = async (id) => {

    let col = [
        'locality_id as Id',
        'locality_name as LocalityName',
        'state_id as StateId',
        'city_id as CityId',
        'region_id as RegionId',
        'zone_id as ZoneId',
        'country_id as CountryId'
    ]
    let sql = `
            Select ${col}
            From dac.da_locality as L
            where status = 1 And is_visible = 1
            And L.locality_id  = ${id}
       `
    const result = await pool.query(sql);
    return result[0];

}

exports.GetOfficeById = async (officeId) => {
    let col = [
        'office_id as Id',
        'office_name as OfficeName',
        'office_code as OfficeCode',
    ]
    let sql = `
            Select *,${col}
            From client_1001.c_office as L
            where status = 1 And is_visible = 1
            And L.office_id  = ${officeId}
       `
    const result = await pool.query(sql);
    return result[0];
}

exports.GetPincodeById = async (id) => {

    let col = [
        'post_code_id as Id',
        'post_code as PostCode',
        'state_id as StateId',
        'city_id as CityId',
        'region_id as RegionId',
        'zone_id as ZoneId',
        'country_id as CountryId'
    ]
    let sql = `
            Select ${col}
            From dac.da_post_code 
            where status = 1 And is_visible = 1
            And post_code_id  = ${id}
       `
    const result = await pool.query(sql);
    return result[0];
}

// fill values dependent
exports.GetFillValuesByBookingId = async (id) => {

    let sql = ` select * from client_1001.c_booking where booking_id = ${id}`;
    const result = await pool.query(sql);
    const row = result[0][0];

    let consignorsql = ` select * from client_1001.c_booking_consignor_detail where booking_id = ${id}`
    const consignorResult = await pool.query(consignorsql);
    let consignorRow;
    if (consignorResult[0].length > 0) {
        consignorRow = consignorResult[0][0];
    }

    const awb_id = row.awb_id;
    const booking_office_id = row.booking_office_id;
    const origin_pincode_id = row.origin_pincode_id;
    const destination_pincode_id = row.destination_pincode_id;
    const destination_locality_id = row.destination_locality_id;
    const destionation_city_id = row.destionation_city_id;
    const consignee_city_id = row.consignee_city_id;
    const consignee_state_id = row.consignee_state_id;
    const consignor_city_id = consignorRow?.consignor_city_id;
    const consignor_state_id = consignorRow?.consignor_state_id;

    let data = {
        originPinCode: await this.GetPincodeById(origin_pincode_id),
        destinationPinCode: await this.GetPincodeById(destination_pincode_id),
        offices: await this.GetOfficeById(booking_office_id),
        localities: await this.GetLocalitiesById(destination_locality_id),
        destinationCities: await placeService.getCity(destionation_city_id),
        consigneeCities: consignee_city_id ? await this.GetCityById(consignee_city_id) : [],
        consigneeStates: consignee_state_id ? await this.GetStateById(consignee_state_id) : [],
        consignoreCities: consignor_city_id ? await this.GetCityById(consignor_city_id) : [],
        consignoreStates: consignor_state_id ? await this.GetStateById(consignor_state_id) : [],
    }

    return data;
}

// fill values
exports.GetDeliveryModes = async () => {

    let col = ['delivery_mode_id as Id', 'delivery_mode_name as DeliveryMode'];
    let sql = `
            Select ${col}
            From client_1001.c_delivery_mode
            where status = 1 And is_visible = 1
    `
    const result = await pool.query(sql);
    return result[0];
}

exports.GetServiceModes = async () => {

    let col = ['service_mode_id as Id', 'service_mode_name as ServiceMode'];
    let sql = `
            Select ${col}
            From client_1001.c_service_mode
            where status = 1 And is_visible = 1
    `
    const result = await pool.query(sql);
    return result[0];
}

exports.GetPaymentModes = async () => {

    let col = ['payment_mode_id as Id', 'payment_mode_name as PaymentMode'];
    let sql = `
            Select ${col}
            From client_1001.c_payment_mode
            where status = 1 And is_visible = 1
    `
    const result = await pool.query(sql);
    return result[0];
}

exports.GetGstRates = async () => {

    let col = ['gst_rate_id as Id', 'gst_rate_name as Name', 'rate as Rate'];
    let sql = `
            Select ${col}
            From client_1001.c_gst_rate
            where status = 1 And is_visible = 1
    `
    const result = await pool.query(sql);
    return result[0];
}
exports.GetConsingmentTypes = async () => {

    let col = ['consignment_type_id as Id', 'consignment_type_name as ConsingmentType', 'from_weight as FromWeight', 'to_weight as ToWeight'];
    let sql = `
            Select ${col}
            From client_1001.c_consignment_type
            where status = 1 And is_visible = 1
    `
    const result = await pool.query(sql);
    return result[0];
}
//=================================


exports.CreatBooking = async (data, id) => {

    let sql;
    let para;
    if (id) {
        sql = `
             Update client_1001.c_booking 
             set ?
             where booking_id = ${Number(id)}
        `

        para = {
            booking_id: id,
            awb_id: data?.awb_id,
            booking_office_id: data?.booking_office_id,
            booking_date: new Date(data?.booking_date),
            origin_pincode_id: data?.origin_pincode_id,
            destination_pincode_id: data?.destination_pincode_id,
            destination_locality_id: data?.destination_locality_id,
            destionation_city_id: data?.destionation_city_id,
            service_mode_id: data?.service_mode_id,
            delivery_mode_id: data?.delivery_mode_id,
            no_of_packets: data?.no_of_packets,
            actual_weight: data?.actual_weight,
            length: data?.length,
            width: data?.width,
            height: data?.height,
            chargeable_weight: data?.chargeable_weight,
            payment_mode_id: data?.payment_mode_id,
            amount: data?.amount,
            consignee_mobile: data?.consignee_mobile,
            consignee_name: data?.consignee_name,
            consignee_address: data?.consignee_address,
            consignee_city_id: data?.consignee_city_id,
            consignee_state_id: data?.consignee_state_id,
            gst_rate_id: data?.gst_rate_id,
            gst_rate: data?.gst_rate,
            total_amount: data?.total_amount,
            consignment_type_id: data?.consignment_type_id,
            consignment_value: data?.consignment_value,
            invoice_number: data?.invoice_number,
            eway_bill_no: data?.eway_bill_no,
            gst_number: data?.gst_number,
        }
    }
    else {

        sql = 'INSERT INTO client_1001.c_booking SET ?';

        para = {
            awb_id: data?.awb_id,
            booking_office_id: data?.booking_office_id,
            booking_date: new Date(data?.booking_date),
            origin_pincode_id: data?.origin_pincode_id,
            destination_pincode_id: data?.destination_pincode_id,
            destination_locality_id: data?.destination_locality_id,
            destionation_city_id: data?.destionation_city_id,
            service_mode_id: data?.service_mode_id,
            delivery_mode_id: data?.delivery_mode_id,
            no_of_packets: data?.no_of_packets,
            actual_weight: data?.actual_weight,
            length: data?.length,
            width: data?.width,
            height: data?.height,
            chargeable_weight: data?.chargeable_weight,
            payment_mode_id: data?.payment_mode_id,
            amount: data?.amount,
            consignee_mobile: data?.consignee_mobile,
            consignee_name: data?.consignee_name,
            consignee_address: data?.consignee_address,
            consignee_city_id: data?.consignee_city_id,
            consignee_state_id: data?.consignee_state_id,
            gst_rate_id: data?.gst_rate_id,
            gst_rate: data?.gst_rate,
            total_amount: data?.total_amount,
            consignment_type_id: data?.consignment_type_id,
            consignment_value: data?.consignment_value,
            invoice_number: data?.invoice_number,
            eway_bill_no: data?.eway_bill_no,
            gst_number: data?.gst_number,
            // status: data?.status,
            // is_visible: data?.is_visible,
            // created_by: data?.created_by,
            // updated_by: data?.updated_by,
        }
    }
    const con = await pool.getConnection()
    try {


        await con.beginTransaction();
        const result = await con.query(sql, [para]);
        data.booking_id = id || result[0]?.insertId;
        await saveConsignorDetail(data,con);
        con.commit();
        return result[0];
    }
    catch (ex) {
        con.rollback();
        throw ex;
    }
    finally{
        con.release();
    }
};
async function saveConsignorDetail(consignorData, con) {

    if (consignorData?.booking_id) {
        const deleteQuery = ` delete from client_1001.c_booking_consignor_detail where booking_id = ${consignorData?.booking_id}`;
        await con.query(deleteQuery);
    }

    let para = {
        booking_id: consignorData?.booking_id,
        consignor_mobile: consignorData?.consignor_mobile,
        consignor_name: consignorData?.consignor_name,
        consignor_address: consignorData?.consignor_address,
        consignor_city_id: consignorData?.consignor_city_id,
        consignor_state_id: consignorData?.consignor_state_id,
    }

    let sql = 'INSERT INTO client_1001.c_booking_consignor_detail SET ?';
    const result = await con.query(sql, [para]);
    return result[0];
}

exports.GetBookings = async (id) => {

    let sql = ` 

    SELECT booking.*, 
			bcd.consignor_mobile,
			bcd.consignor_name,
			bcd.consignor_address,
			bcd.consignor_city_id,
			bcd.consignor_state_id,
         ROW_NUMBER() OVER( Order By booking.awb_id asc) AS seq ,
         true as 'delete', true as 'edit',
         awb.awb_prefix
    from client_1001.c_booking as booking
    inner join client_1001.c_awb_type as awb on awb.awb_id = booking.awb_id 
    LEFT JOIN client_1001.c_booking_consignor_detail bcd ON bcd.booking_id = booking.booking_id
    Order By booking.awb_id asc
   
    `
    const result = await pool.query(sql);
    return result[0].map(row => ({
        ...row,
        booking_date: format(new Date(row.booking_date), 'dd/MM/yyyy'),
        created_at: format(new Date(row.created_at), 'dd/MM/yyyy'),
        updated_at: format(new Date(row.updated_at), 'dd/MM/yyyy'),
      }));
}

exports.DeleteBooking =async (id) => {

    const con = await pool.getConnection();
    let sqlDetailConsignor = ` 
    delete  from client_1001.c_booking_consignor_detail where booking_id = ${id}
`
    let sqlMainDelete = ` 
        delete  from client_1001.c_booking where booking_id = ${id}
    `
    try{

        await con.beginTransaction();
        await con.query(sqlDetailConsignor);
        await con.query(sqlMainDelete)

        con.commit();
        return true;
    }
    catch(er){
        con.rollback();
        throw er
    }
    finally{
        con.release();
    }
   
    
   
}
//