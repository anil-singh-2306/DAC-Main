const pool = require('../config/db');
const { format } = require('date-fns');

async function checkIfExists(table_name, col_name, col_value) {
  const sql = 'SELECT COUNT(*) as count FROM ?? WHERE ?? = ?';
  const result = await pool.query(sql, [table_name, col_name, col_value]);
  return result[0][0].count > 0;
}

exports.getFillValues = async (session) => {

  const result = [];

  const sqlCountry = `SELECT country_id,country_name from da_country LIMIT 20`;
  const resultCountry = await pool.query(sqlCountry);

  result.push(resultCountry[0]);

  const sqlZone = `SELECT zone_id,zone_name from da_zone LIMIT 20`;
  const resultZone = await pool.query(sqlZone);

  result.push(resultZone[0]);

  const sqlRegion = `SELECT region_id,region_name from da_region LIMIT 20`;
  const resultRegion = await pool.query(sqlRegion);

  result.push(resultRegion[0]);

  const sqlState = `SELECT state_id,state_name from da_state LIMIT 20`;
  const resultState = await pool.query(sqlState);

  result.push(resultState[0]);

  const sqlCity = `SELECT city_id,city_name from da_city LIMIT 20`;
  const resultCity = await pool.query(sqlCity);

  result.push(resultCity[0]);

  const sqlPostCode = `SELECT post_code_id,post_code from da_post_code LIMIT 20`;
  const resultPostCode = await pool.query(sqlPostCode);

  result.push(resultPostCode[0]);

  const sqlLocality = `SELECT locality_id,locality_name from da_locality LIMIT 20`;
  const resultLocality = await pool.query(sqlLocality);

  result.push(resultLocality[0]);

  return result;
};

exports.createLocationTariff = async (req, data, session) => {
  
  const clientId = session?.clientId;
  const userId = session?.userId;

  if (clientId) {
    const isExists = await checkIfExists(`client_${clientId}.c_location_tariff`, 'lt_name', data.lt_name);

    if (isExists) {
      console.log(`Location tariff ${data.lt_name} already exists.`);
      return;
    }

    const maxIdSql = `SELECT MAX(CAST(SUBSTR(lt_id, 3) AS UNSIGNED)) AS max_id FROM client_${clientId}.c_location_tariff WHERE lt_id LIKE "LT%"`;
    const maxIdResult = await pool.query(maxIdSql);

    const nextNumericId = (maxIdResult[0][0].max_id || 0) + 1;
    const nextId = 'LT' + nextNumericId;

    data.lt_id = nextId;

    data.created_by = userId;

    const sql = `INSERT INTO client_${clientId}.c_location_tariff SET ?`;
    const result = await pool.query(sql, [data]);
    return result[0];
  }
};

exports.getLocationTariffs = async (req, session) => {
  const clientId = session?.clientId;
  const userId = session?.userId;
  
  const sql = `SELECT 
                    lt_id AS Id,
                    lt_name AS Name,
                    lt_json AS Route,
                    status,
                    created_at AS CreatedAt,
                    created_by AS CreatedBy 
                FROM 
                client_${clientId}.c_location_tariff`;

  const result = await pool.query(sql);
  

  const rows = result?.[0] || [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const values = rows.map((row, index) => [index + 1, ...Object.values(row)]);
  
  const formattedRows = columns.length > 0 && values.length > 0 ? {
    columns: ['seq', ...columns, 'Actions'],
    values: values.map(val => {
      const obj = {};
      const actions = ['Edit','Delete'];
      const actionsIcons = ['edit','delete'];
      val.forEach((value, i) => {
        if (i === 0) {
          obj['seq'] = value;
        } else if (columns[i - 1] === 'status') {
          obj['status'] = value === 0 ? false : true;
        }else if (columns[i - 1] === 'CreatedAt') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['CreatedAt'] = date;
      } else {
          obj[columns[i - 1]] = value;
        }
      });
      obj['actions'] = actions;
      obj['actionIcons'] = actionsIcons;
      return obj;
    })
  } : [];
  
  return formattedRows;
};

exports.getLocationTariff = async (req, id, session) => {
  const clientId = session?.clientId;
  const userId = session?.userId;

  const sql = `SELECT * FROM client_${clientId}.c_location_tariff WHERE lt_id = ?`;
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateLocationTariff = async (req, id, data, session) => {

  const clientId = session?.clientId;
  const userId = session?.userId;

  data.updated_by = userId;

  const sql = `UPDATE client_${clientId}.c_location_tariff SET ? WHERE lt_id = ?`;
  const result = await pool.query(sql, [data, id]);
  return result;
};

exports.deleteLocationTariff = async (req, id, session) => {
  const clientId = session?.clientId;
  const userId = session?.userId;

  const sql = `DELETE FROM client_${clientId}.c_location_tariff WHERE lt_id = ?`;
  const result = await pool.query(sql, [id]);
  return result;
};

exports.createCustomerTariff = async (req, data, session) => {
  
    const clientId = session?.clientId;
    const userId = session?.userId;
  
    if (clientId) {
      const isExists = await checkIfExists(`client_${clientId}.c_customer_tariff`, 'ct_name', data.ct_name);
  
      if (isExists) {
        console.log(`Customer tariff ${data.ct_name} already exists.`);
        return;
      }
  
      const maxIdSql = `SELECT MAX(CAST(SUBSTR(ct_id, 2) AS UNSIGNED)) AS max_id FROM client_${clientId}.c_customer_tariff WHERE ct_id LIKE "CT%"`;
      const maxIdResult = await pool.query(maxIdSql);
  
      const nextNumericId = (maxIdResult[0][0].max_id || 0) + 1;
      const nextId = 'CT' + String(nextNumericId).padStart(2, '0');
  
      data.ct_id = nextId;
      data.created_by = userId;
  
      const sql = `INSERT INTO client_${clientId}.c_customer_tariff SET ?`;
      const result = await pool.query(sql, [data]);
      return result[0];
    }
  };