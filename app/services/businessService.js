const pool = require('../config/db');
const { format } = require('date-fns');

async function checkIfExists(table_name, col_name, col_value) {
  const sql = 'SELECT COUNT(*) as count FROM ?? WHERE ?? = ?';
  const result = await pool.query(sql, [table_name, col_name, col_value]);
  return result[0][0].count > 0;
}

exports.createBusiness = async (req, data, session) => {
  
  const clientId = session?.clientId;

  if (clientId) {
    const isExists = await checkIfExists(`client_${clientId}.c_business`, 'business_type', data.business_type);

    if (isExists) {
      console.log(`Business ${data.business_type} already exists.`);
      return;
    }

    const maxIdSql = `SELECT MAX(CAST(SUBSTR(business_type_id, 2) AS UNSIGNED)) AS max_id FROM client_${clientId}.c_business WHERE business_type_id LIKE "A%"`;
    const maxIdResult = await pool.query(maxIdSql);

    const nextNumericId = (maxIdResult[0][0].max_id || 0) + 1;
    const nextId = 'A' + String(nextNumericId).padStart(2, '0');

    data.business_type_id = nextId;

    const sql = `INSERT INTO client_${clientId}.c_business SET ?`;
    const result = await pool.query(sql, [data]);
    return result[0];
  }
};

exports.getBusinesses = async (req) => {
  const sql = `SELECT * FROM client_1001.c_business`;
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
        }else if (columns[i - 1] === 'created_at') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['created_at'] = date;
      } else if (columns[i - 1] === 'updated_at') {
        const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
        obj['updated_at'] = date;
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

exports.getBusiness = async (req, id) => {
  const sql = `SELECT * FROM client_1001.c_business WHERE business_type_id = ?`;
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateBusiness = async (req, id, data) => {
  const sql = `UPDATE client_1001.c_business SET ? WHERE business_type_id = ?`;
  const result = await pool.query(sql, [data, id]);
  return result;
};

exports.deleteBusiness = async (req, id) => {
  const sql = `DELETE FROM client_1001.c_business WHERE business_type_id = ?`;
  const result = await pool.query(sql, [id]);
  return result;
};

exports.createBranch = async (req, data, session) => {

  const clientId = session?.clientId;

  if (clientId) {
    const isExists = await checkIfExists(`client_${clientId}.c_branch`, 'branch_type', data.branch_type);

    if (isExists) {
      console.log(`Branch ${data.branch_type} already exists.`);
      return;
    }

    const maxIdSql = `SELECT MAX(CAST(SUBSTR(branch_type_id, 2) AS UNSIGNED)) AS max_id FROM client_${clientId}.c_branch WHERE branch_type_id LIKE "B%"`;
    const maxIdResult = await pool.query(maxIdSql);

    const nextNumericId = (maxIdResult[0][0].max_id || 0) + 1;
    const nextId = 'B' + String(nextNumericId).padStart(2, '0');

    data.branch_type_id = nextId;

    const sql = `INSERT INTO client_${clientId}.c_branch SET ?`;
    const result = await pool.query(sql, [data]);
    return result[0];
  }
};
  
  exports.getBranches = async (req) => {
    const sql = `SELECT * FROM client_1001.c_branch`;
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
        }else if (columns[i - 1] === 'created_at') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['created_at'] = date;
      } else if (columns[i - 1] === 'updated_at') {
        const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
        obj['updated_at'] = date;
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
  
  exports.getBranch = async (req, id) => {
    const sql = `SELECT * FROM client_1001.c_branch WHERE branch_type_id = ?`;
    const result = await pool.query(sql, [id]);
    return result[0];
  };
  
  exports.updateBranch = async (req, id, data) => {
    const sql = `UPDATE client_1001.c_branch SET ? WHERE branch_type_id = ?`;
    const result = await pool.query(sql, [data, id]);
    return result;
  };
  
  exports.deleteBranch = async (req, id) => {
    const sql = `DELETE FROM client_1001.c_branch WHERE branch_type_id = ?`;
    const result = await pool.query(sql, [id]);
    return result;
  };

  exports.createOffice = async (req, data, session) => {

    const clientId = session?.clientId;
  
    if (clientId) {
      const isExists = await checkIfExists(`client_${clientId}.c_office`, 'office_name', data.office_name);
  
      if (isExists) {
        console.log(`Office ${data.office_name} already exists.`);
        return;
      }
  
      const maxIdSql = `SELECT MAX(CAST(SUBSTR(office_id, 2) AS UNSIGNED)) AS max_id FROM client_${clientId}.c_office WHERE office_id LIKE "O%"`;
      const maxIdResult = await pool.query(maxIdSql);
  
      const nextNumericId = (maxIdResult[0][0].max_id || 0) + 1;
      const nextId = 'O' + String(nextNumericId).padStart(4, '0');
  
      data.office_id = nextId;
  
      const sql = `INSERT INTO client_${clientId}.c_office SET ?`;
      const result = await pool.query(sql, [data]);
      return result[0];
    }
  };
  
  exports.getOffices = async (req, session) => {
  let result;
  const clientId = session?.clientId;
  const userId = session?.userId;

  if (clientId && userId) {
    const sql = `SELECT * FROM client_${clientId}.c_office 
                WHERE parent_office_id = (SELECT office_id FROM client_${clientId}.c_user WHERE id = ?)`;
    result = await pool.query(sql, [userId]);
  } else {
    const sql = `SELECT * FROM client_1001.c_office`;
    result = await pool.query(sql);
  }

  const rows = result?.[0] || [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const values = rows.map((row, index) => [index + 1, ...Object.values(row)]);

  const formattedRows =
    columns.length > 0 && values.length > 0
      ? {
          columns: ['seq', ...columns, 'Actions'],
          values: values.map((val) => {
            const obj = {};
            const actions = ['View', 'Edit', 'Delete'];
            const actionsIcons = ['remove_red_eye', 'edit', 'delete'];
            val.forEach((value, i) => {
              if (i === 0) {
                obj['seq'] = value;
              } else if (columns[i - 1] === 'status') {
                obj['status'] = value === 0 ? false : true;
              }else if (columns[i - 1] === 'created_at') {
                const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
                obj['created_at'] = date;
              } else if (columns[i - 1] === 'updated_at') {
                const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
                obj['updated_at'] = date;
              } else {
                obj[columns[i - 1]] = value;
              }
            });
            obj['actions'] = actions;
            obj['actionIcons'] = actionsIcons;
            return obj;
          }),
        }
      : [];

  return formattedRows;
};

  
  exports.getOffice = async (req, id) => {
    const sql = `SELECT * FROM client_1001.c_office WHERE office_id = ?`;
    const result = await pool.query(sql, [id]);
    return result[0];
  };
  
  exports.updateOffice = async (req, id, data) => {
    const sql = `UPDATE client_1001.c_office SET ? WHERE office_id = ?`;
    const result = await pool.query(sql, [data, id]);
    return result;
  };
  
  exports.deleteOffice = async (req, id) => {
    const sql = `DELETE FROM client_1001.c_office WHERE office_id = ?`;
    const result = await pool.query(sql, [id]);
    return result;
  };