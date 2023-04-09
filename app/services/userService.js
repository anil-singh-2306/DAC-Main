const pool = require('../config/db');
const { format, parse } = require('date-fns');
const bcrypt = require('bcrypt');
const { generate } = require('generate-password');

async function checkIfExists(table_name, col_name, col_value) {
  const sql = 'SELECT COUNT(*) as count FROM ?? WHERE ?? = ?';
  const result = await pool.query(sql, [table_name, col_name, col_value]);
  return result[0][0].count > 0;
}

exports.createRole = async (req, data, session) => {
  const isExists = await checkIfExists('da_role', 'role_name', data.role_name);

  if (isExists) {
    throw new Error(`Role ${data.role_name} already exists.`);
  }

  const sql = 'INSERT INTO da_role SET ?';
  const result = await pool.query(sql, [data]);
  return result[0];
};

exports.getRoles = async (req, session) => {
  const sql = 'SELECT * FROM da_role';
  const result = await pool.query(sql);
  return result[0];
};

exports.getRole = async (req, id, session) => {
  const sql = 'SELECT * FROM da_role WHERE role_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateRole = async (req, id, data, session) => {
  const sql = 'UPDATE da_role SET ? WHERE role_id = ?';
  const result = await pool.query(sql, [data, id]);
  return result;
};

exports.deleteRole = async (req, id, session) => {
  const sql = 'DELETE FROM da_role WHERE role_id = ?';
  const result = await pool.query(sql, [id]);
  return result;
};

exports.createUser = async (req, data, session) => {
  const { company_id, email, office_id, dob } = data;
  //const { clientId } = session;

  const userExists = await checkIfExists(`client_${company_id}.c_user`, 'email', email);
  if (userExists) {
    throw new Error(`User with ${email} already exists.`);
  }

  const sqlLocation = `
    SELECT 
      locality_id, post_code_id, city_id, state_id, region_id, zone_id, country_id
      FROM client_${company_id}.c_office
      WHERE office_id = ?
  `;

  const [[location]] = await pool.query(sqlLocation, [office_id]);

  const { post_code_id, city_id, state_id, country_id } = location;

  const formattedDob = dob
    ? format(parse(dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
    : null;

  const user = {
    ...data,
    dob: formattedDob,
    post_code_id,
    city_id,
    state_id,
    country_id,
  };

  const sql = `INSERT INTO client_${company_id}.c_user SET ?`;
  const [result] = await pool.query(sql, [user]);

  return result;
};

exports.getUsers = async (req, session) => {
  //console.log('client Id in get users service method', session.clientId);
  const { clientId } = session;
  const sql = `
  SELECT u.first_name, u.last_name, u.email, u.temp_password, r.role_name, u.mobile, o.office_name, u.office_id, u.id
  FROM client_${clientId}.c_user u
  LEFT JOIN da_role r ON u.role_id = r.role_id
  JOIN client_${clientId}.c_office o ON u.office_id = o.office_id
  `;
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
        } else if (columns[i - 1] === 'dob') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['dob'] = date;
        } else if (columns[i - 1] === 'status') {
          obj['status'] = value === 0 ? false : true;
        } else if (columns[i - 1] === 'created_at') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['created_at'] = date;
        } else if (columns[i - 1] === 'updated_at') {
          const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
          obj['updated_at'] = date;
        } else if (columns[i - 1] === 'role_name') {
          obj['role_name'] = value;
        } else if (columns[i - 1] === 'office_name') {
          obj['office_name'] = value;
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

exports.getUser = async (req, id, session) => {
  const { clientId } = session;

  const sql = `SELECT * FROM client_${clientId}.c_user WHERE id = ?`;
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateUser = async (req, id, data, session) => {
  const { office_id, dob } = data;
  const { clientId } = session;
  
  const sqlLocation = `
    SELECT 
      locality_id, post_code_id, city_id, state_id, region_id, zone_id, country_id
      FROM client_${clientId}.c_office
      WHERE office_id = ?
  `;

  const [[location]] = await pool.query(sqlLocation, [office_id]);

  const { post_code_id, city_id, state_id, country_id } = location;

  const formattedDob = dob
    ? format(parse(dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
    : null;

  const user = {
    ...data,
    dob: formattedDob,
    post_code_id,
    city_id,
    state_id,
    country_id,
  };

  const sql = `UPDATE client_${clientId}.c_user SET ? WHERE id = ?`;
  const [result] = await pool.query(sql, [user, id]);

  return result;
  };

exports.deleteUser = async (req, id, session) => {
  const { clientId } = session;

  const sql = `DELETE FROM client_${clientId}.c_user WHERE id = ?`;
  const result = await pool.query(sql, [id]);
  return result;
};

exports.updateStatus = async (req, id, data, session) => {
  const { role_id, status } = data;
  const { clientId } = session;

  console.log(role_id, status, id);
  
  let password, hashedPassword;

  if (status) {
    // Generate a new password
    password = generate({
      length: 6,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });
    
    // Hash the password
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Update user object with new or null password and role_id based on status
  const user = {
    ...data,
    password: status ? hashedPassword : null,
    temp_password: status ? password : null,
    role_id: status ? role_id : null,
  };

  const sql = `UPDATE client_${clientId}.c_user SET ? WHERE id = ?`;
  const [result] = await pool.query(sql, [user, id]);

  return result;
};



