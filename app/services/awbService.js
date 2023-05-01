const pool = require('../config/db');
const common = require('./commonService');
const { format } = require('date-fns');

exports.createAwbType = async (req, data, id) => {

  let sql;
  let para;
  if (id) {
    sql = `
           Update client_1001.c_awb_type 
           set ?
           where awb_id = '${id}'
      `

    para = {
      awb_type: data.awb_type,
      awb_prefix: data.awb_prefix,
      payment_mode_id: data.payment_mode_id,
      updated_at: new Date(),
    }
  }
  else {

    const idColumn = await common.GetId("c_awb_type",'awb_id','AWB','00')
    sql = `INSERT INTO client_1001.c_awb_type SET ?`;

    para = {
      awb_type: data.awb_type,
      awb_prefix: data.awb_prefix,
      payment_mode_id: data.payment_mode_id,
      awb_id:idColumn
    }
  }

  const result = await pool.query(sql, [para]);
  return result[0];
};

exports.getAwbType = async (req, id) => {

  const col = [
    'awb_type as `AwbType`',
    'awb_id as `id`',
    'awb_prefix as `AwbPrefix`',
    'pm.payment_mode_id as `PaymentModeId`',
    'pm.payment_mode_name as `PaymentMode`',
    'awb.status as `Status`',
    'awb.created_at as `CreatedAt`',
  ];
  let sql;
  let para;
  sql = `  select  ROW_NUMBER() over(Order By awb_id )AS seq  , ${col},
           true as 'delete', true as 'edit'
           from client_1001.c_awb_type  awb
           inner join client_1001.c_payment_mode pm on pm.payment_mode_id = awb.payment_mode_id
           where awb.status = 1
           And awb.is_visible =1 
           `
  if (id) {

    sql += ` And awb_id = '${id}'`

  }


  const result = await pool.query(sql);
  return result[0].map(row => ({
    ...row,
    CreatedAt: format(new Date(row.CreatedAt), 'dd/MM/yyyy')
  }));
};

exports.deleteAwbType = async (req, id) => {

  if (!id) {
    throw 'enable to delete'
  }
  sql = `  Delete  
           from client_1001.c_awb_type  
           where awb_id = '${id}'
           `

  const result = await pool.query(sql);
  return result[0];
};

exports.getAWBFillValues = async () => {

  let col = ['payment_mode_id as Id', 'payment_mode_name as PaymentMode'];
  let sql = `
          Select ${col}
          From client_1001.c_payment_mode
          where status = 1 And is_visible = 1
  `
  const result = await pool.query(sql);
  const data ={
    paymentModes :result[0]
  }
  return data;
};


/// Sales ---

exports.getSalesFillValues = async (req) => {

  const officeSql = `
  select * from client_1001.c_office s
  where s.status = 1
  And s.is_visible =1 
  `

  const officesres = await pool.query(officeSql);

  const offices = officesres[0]?.map(x=>{
     let obj ={
      officeId:x.office_id,
      office:x.office_name
     }

     return obj;
  }) 
  // const offices = [
  //   {
  //     officeId: 1,
  //     office: 'Head Office'
  //   }
  // ]
  const awbtypes = await this.getAwbType();

  const filvalues = {
    offices,
    awbtypes
  }

  return filvalues;
};

exports.createAwbSales = async (req, data, id) => {

  let sql;
  let para;
  if (id) {
    sql = `
           Update client_1001.c_awb_sale_rate 
           set ?
           where sale_rate_id = '${id}'
      `

    para = {
      awb_id: data.awbtype,
      office_id: data.office,
      sale_rate: data.rate,
      valid_till: new Date(data.validtill),
      updated_at: new Date()
    }
  }
  else {
    const idColumn = await common.GetId("c_awb_sale_rate",'sale_rate_id','SR','000000')
    sql = `INSERT INTO client_1001.c_awb_sale_rate SET ?`;

    para = {
      awb_id: data.awbtype,
      office_id: data.office,
      sale_rate: data.rate,
      valid_till: new Date(data.validtill),
      sale_rate_id : idColumn
    }
  }

  const result = await pool.query(sql, [para]);
  return result[0];
};

exports.getAwbSales = async (req, id) => {

  const col = [
    'sale_rate_id as `id`',
    's.awb_id as `AwbId`',
    'office.office_id as `OfficeId`',
    'sale_rate as `SalesRate`',
    'valid_till as `ValidTill`',
    'valid_till as `ValidTillDate`',
    's.status as `Status`',
    's.created_at as `CreatedAt`',
  ];
  let sql;
  sql = `  select  ROW_NUMBER() over(Order By s.id )AS seq ,t.awb_type as AwbType , office.office_name as office,
            ${col},
           true as 'delete', true as 'edit'
           from client_1001.c_awb_sale_rate s
           inner join client_1001.c_awb_type t on s.awb_id = t.awb_id
           inner join client_1001.c_office office on office.office_id = s.office_id
           where s.status = 1
           And s.is_visible =1 
           `
  if (id) {

    sql += ` And id = '${id}'`

  }


  const result = await pool.query(sql);
  return result[0].map(row => ({
    ...row,
    ValidTill: format(new Date(row.ValidTill), 'dd/MM/yyyy'),
    CreatedAt: format(new Date(row.CreatedAt), 'dd/MM/yyyy')
  }));
};

exports.deleteAwbSales = async (req, id) => {

  if (!id) {
    throw 'enable to delete'
  }
  sql = `  Delete  
           from client_1001.c_awb_sale_rate 
           where sale_rate_id = '${id}'
           `

  const result = await pool.query(sql);
  return result[0];
};


/// Purchase ---

exports.getPurchaseFillValues = async (officeId) => {


  const officeSql = `
  select * from client_1001.c_office s
  where s.status = 1
  And s.is_visible =1 
  `

  const officesres = await pool.query(officeSql);

  const offices = officesres[0]?.map(x=>{
     let obj ={
      officeId:x.office_id,
      office:x.office_name
     }

     return obj;
  }) 

  const vendorSql = `
  SELECT * FROM client_1001.c_office
WHERE branch_type_id ='B12'
  `

  const vendorsres = await pool.query(vendorSql);

  const vendors = vendorsres[0]?.map(x=>{
     let obj ={
      officeId:x.office_id,
      office:x.office_name
     }

     return obj;
  }) 
  // const vendors = [
  //   {
  //     vendorId: 1,
  //     vendor: 'Sample vendor 1'
  //   }
  // ]

  
  const awbtypes = await this.getAwbType();

  const defaultvalues = {
    office: officeId
  }

  const filvalues = {
    offices,
    awbtypes,
    vendors,
    defaultvalues
  }

  return filvalues;
};

exports.createAwbPurchase = async (req, data, id) => {

  let sql;
  let para;
  if (id) {
    sql = `
           Update client_1001.c_awb_purchase 
           set ?
           where awb_purchase_id = '${id}'
      `

    para = {
      awb_id: data.awbtype,
      office_id: data.office,
      vendor_id: data.vendor,
      vendor_rate: data.vendorrate,
      starting_no: data.startingno,
      quantity: data.quantity,
      end_no: data.endno,
      updated_at: new Date()
    }
  }
  else {

    const idColumn = await common.GetId("c_awb_purchase",'awb_purchase_id','PU','0000000')
    sql = `INSERT INTO client_1001.c_awb_purchase SET ?`;

    para = {
      awb_id: data.awbtype,
      office_id: data.office,
      vendor_id: data.vendor,
      vendor_rate: data.vendorrate,
      starting_no: data.startingno,
      quantity: data.quantity,
      end_no: data.endno,
      purchase_at: new Date(data.purchasedate),
      awb_purchase_id:idColumn
    }
  }

  const result = await pool.query(sql, [para]);
  return result[0];
};

exports.getAwbPurchase = async (req, id) => {

  const col = [
    'awb_purchase_id as `id`',
    's.awb_id as `AwbId`',
    'office.office_id as `OfficeId`',
    'vendor_id as `VendorId`',
    'vendor_rate as `VendorRate`',
    'purchase_at as `PurchaseDate`',
    'purchase_at as `PurchaseDateTime`',
    'quantity as `Quantity`',
    'starting_no as `StartingNo`',
    'end_no as `EndNo`',
    's.status as `Status`',
    's.created_at as `CreatedAt`',
  ];
  let sql;
  sql = `  select  ROW_NUMBER() over(Order By s.id )AS seq ,t.awb_type as AwbType , 
           office.office_name as office,
           vendor.office_name as vendor,
            ${col},
           true as 'delete', true as 'edit'
           from client_1001.c_awb_purchase s
           inner join client_1001.c_awb_type t on s.awb_id = t.awb_id
           inner join client_1001.c_office office on office.office_id = s.office_id
           inner join client_1001.c_office vendor on vendor.office_id = s.vendor_id
           where s.status = 1
           And s.is_visible =1 
           `
  if (id) {

    sql += ` And awb_purchase_id = '${id}'`

  }


  const result = await pool.query(sql);
  return result[0].map(row => ({
    ...row,
    PurchaseDate: format(new Date(row.PurchaseDate), 'dd/MM/yyyy'),
    CreatedAt: format(new Date(row.CreatedAt), 'dd/MM/yyyy')
  }));
};

exports.deleteAwbPurchase = async (req, id) => {

  if (!id) {
    throw 'enable to delete'
  }
  sql = `  Delete  
           from client_1001.c_awb_purchase
           where awb_purchase_id = '${id}'
           `

  const result = await pool.query(sql);
  return result[0];
};

/// Issue ---

exports.getIssueFillValues = async (officeId) => {

  let isHeadOfficeSql = `
     select 1
     From client_1001.c_office 
     where office_id = '${officeId}'
     And parent_office_id is null
  `
  let headOfficeResult = await pool.query(isHeadOfficeSql);
  let isHeadOffice = (headOfficeResult[0].length > 0)


  let officesSql = `
  
      select *
      from client_1001.c_office 
      where status = 1
      And is_visible =1
  `

  let officeResult = await pool.query(officesSql);
  let offices = officeResult[0].map(x=>{
    return {
      officeId: x.office_id,
      office: x.office_name
    }
  })


  // const offices = [
  //   {
  //     officeId: 1,
  //     office: 'Head Office'
  //   }
  // ]
  //const awbtypes = await this.getAwbType();

  const defaultvalues = {
    office: officeId,
    isHeadOffice
  }

  const sqlStartingNo = `
    Select p.awb_id as AwbId, p.awb_purchase_id as PurchaseId, p.starting_no as StartingNo,p.end_no as EndNo,p.vendor_rate as VendorRate 
    from client_1001.c_awb_purchase p
    inner join client_1001.c_awb_type t on t.awb_id = p.awb_id
    left join client_1001.c_awb_issue as iss on iss.starting_no = p.starting_no 
    where iss.id is null;
    

  
  `

  const startingNos = await pool.query(sqlStartingNo);

  const col = [
    't.awb_type as `AwbType`',
    't.awb_id as `id`',
    't.awb_prefix as `AwbPrefix`',
  ];
  const applivableAwbTypesSql = `

  Select ${col}
  From client_1001.c_awb_type t
  where exists (select 1 from client_1001.c_awb_purchase p where p.awb_id = t.awb_id)
  And t.status = 1
  And t.is_visible =1
  `

  const applivableAwbTypes = await pool.query(applivableAwbTypesSql)

  const filvalues = {
    offices,
    awbtypes: applivableAwbTypes[0],
    startingNos: startingNos[0],
    defaultvalues
  }

  return filvalues;
};

exports.createAwbIssue = async (req, data, id) => {

  let sql;
  let para;

  let existAWBIssue = `
  
      select 1 
      from client_1001.c_awb_issue
      where awb_id = '${data.awbtype}'
      And awb_purchase_id ='${data.purchaseid}'
      and starting_no = ${data.startingno}
      And end_no = ${data.endno}
  `

  if (id) {
    sql = `
           Update client_1001.c_awb_issue 
           set ?
           where awb_issue_id = '${id}'
      `

      existAWBIssue += ` And awb_issue_id <> '${id}'`

      para = {
        awb_id: data.awbtype,
        office_id: data.office,
        receiver_office_id: data.receiveroffice,
        rate: data.rate,
        starting_no: data.startingno,
        quantity: data.quantity,
        end_no: data.endno,
        amount_received:data.amountreceived,
        awb_purchase_id:data.purchaseid,
        issue_date: new Date(data.issuedate),
        updated_at: new Date()
      }
  }
  else {

    const idColumn = await common.GetId("c_awb_issue",'awb_issue_id','AI','0000000')
    sql = `INSERT INTO client_1001.c_awb_issue SET ?`;

    para = {
      awb_id: data.awbtype,
      office_id: data.office,
      receiver_office_id: data.receiveroffice,
      rate: data.rate,
      starting_no: data.startingno,
      quantity: data.quantity,
      end_no: data.endno,
      amount_received:data.amountreceived,
      awb_purchase_id:data.purchaseid,
      issue_date: new Date(data.issuedate),
      awb_issue_id:idColumn
    }
  }

  const isExist = await pool.query(existAWBIssue);
  if(isExist[0].length>0){
    throw 'AWB Already Issued';
  }
  const result = await pool.query(sql, [para]);
  return result[0];
};

exports.getAwbIssue = async (req, id) => {

  const col = [
    's.awb_issue_id as `id`',
    's.awb_id as `AwbId`',
    's.office_id as `OfficeId`',
    's.receiver_office_id as `ReceiverOfficeId`',
    's.rate as `Rate`',
    's.issue_date as `IssueDate`',
    's.quantity as `Quantity`',
    's.starting_no as `StartingNo`',
    's.end_no as `EndNo`',
    's.amount_received as `AmountReceived`',
    's.status as `Status`',
    's.created_at as `CreatedAt`',
  ];
  let sql;
  sql = `  select  ROW_NUMBER() over(Order By s.id )AS seq ,t.awb_type as AwbType , 
            office.office_name as Office,
           roffice.office_name as ReceiverOffice,
            IFNULL(p.vendor_rate,0) as MinRate,
            p.id as PurchaseId,
            ${col},
           true as 'delete', true as 'edit'
           from client_1001.c_awb_issue s
           inner join client_1001.c_awb_type t on s.awb_id = t.awb_id
           left join client_1001.c_awb_purchase p on p.awb_purchase_id = s.awb_purchase_id
           inner join client_1001.c_office roffice on roffice.office_id = s.receiver_office_id
           inner join client_1001.c_office office on office.office_id = s.office_id
           where s.status = 1
           And s.is_visible =1 
           `
  if (id) {

    sql += ` And awb_issue_id = '${id}'`

  }


  const result = await pool.query(sql);
  return result[0].map(row => ({
    ...row,
    IssueDate: format(new Date(row.IssueDate), 'dd/MM/yyyy'),
    CreatedAt: format(new Date(row.CreatedAt), 'dd/MM/yyyy')
  }));
};

exports.deleteAwbIssue = async (req, id) => {

  if (!id) {
    throw 'enable to delete'
  }
  sql = `  Delete  
           from client_1001.c_awb_issue 
           where awb_issue_id = '${id}'
           `

  const result = await pool.query(sql);
  return result[0];
};