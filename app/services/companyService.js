const pool = require('../config/db');
const { format } = require('date-fns');

async function checkIfExists(table_name, col_name, col_value) {
  const sql = 'SELECT COUNT(*) as count FROM ?? WHERE ?? = ?';
  const result = await pool.query(sql, [table_name, col_name, col_value]);
  return result[0][0].count > 0;
}

exports.createCompany = async (data) => {
  const isExists = await checkIfExists('da_company', 'name', data.name);

  if (isExists) {
    console.log(`Company ${data.name} already exists.`);
    return;
  }

  const sql = 'INSERT INTO da_company SET ?';
  const result = await pool.query(sql, [data]);
  return result[0];
};

exports.getCompanies = async () => {
  const sql = 'SELECT * FROM da_company';
  const result = await pool.query(sql);

  const rows = result?.[0] || [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const values = rows.map((row, index) => [index + 1, ...Object.values(row)]);
  
  const formattedRows = columns.length > 0 && values.length > 0 ? {
    columns: ['seq', ...columns, 'Actions'],
    values: values.map(val => {
      const obj = {};
      const actions = ['View','Edit','Delete'];
      const actionsIcons = ['remove_red_eye','edit','delete'];
      val.forEach((value, i) => {
        obj[i === 0 ? 'seq' : columns[i-1]] = value;
      });
      obj['actions'] = actions;
      obj['actionIcons'] = actionsIcons;
      return obj;
    })
  } : [];
  
  return formattedRows;
};

exports.getCompany = async (id) => {
  const sql = 'SELECT * FROM da_company WHERE company_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateCompany = async (id, data) => {
  const sql = 'UPDATE da_company SET ? WHERE company_id = ?';
  const result = await pool.query(sql, [data, id]);
  return result;
};

exports.deleteCompany = async (id) => {
  const sql = 'DELETE FROM da_company WHERE company_id = ?';
  const result = await pool.query(sql, [id]);
  return result;
};