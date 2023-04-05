const pool = require('../config/db');
const { format } = require('date-fns');

async function getParentData(tableColumns, childTable, parentTable, joinColumn, whereColumn, whereValue) {
  const sql = `SELECT COUNT(*) as count, ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`;
  const result = await pool.query(sql, [
    tableColumns,
    childTable, 
    parentTable, 
    `${childTable}.${joinColumn}`,
    `${parentTable}.${joinColumn}`,
    `${childTable}.${whereColumn}`,
    whereValue
  ]);
  return result[0];
}

exports.savePlaces = async (data, type, id = 0, isEdit = false) => {

  let childTable = '';
  let parentTable = '';
  let joinColumn = '';
  let whereColumn = '';
  let whereValue = '';
  let tableColumns = [];
  let postData = {};
  let sql = '';

  if (type === 'region') {
	  
      childTable = 'da_zone';
      parentTable = 'da_country';
      joinColumn = 'country_id';
      whereColumn = 'zone_id';
      whereValue = data.zone_id;
      tableColumns = ['da_zone.country_id'];
  } else if (type === 'state') {
      childTable = 'da_region';
      parentTable = 'da_zone';
      joinColumn = 'zone_id';
      whereColumn = 'region_id';
      whereValue = data.region_id;
      tableColumns = ['da_region.zone_id',
          'da_region.country_id'
      ];
  } else if (type === 'city') {
      childTable = 'da_state';
      parentTable = 'da_region';
      joinColumn = 'region_id';
      whereColumn = 'state_id';
      whereValue = data.state_id;
      tableColumns = ['da_state.region_id',
          'da_state.zone_id',
          'da_state.country_id'
      ];
  } else if (type === 'post_code') {
      childTable = 'da_city';
      parentTable = 'da_state';
      joinColumn = 'state_id';
      whereColumn = 'city_id';
      whereValue = data.city_id;
      tableColumns = ['da_city.state_id',
          'da_city.region_id',
          'da_city.zone_id',
          'da_city.country_id'
      ];
  } else if (type === 'locality') {
      childTable = 'da_post_code';
      parentTable = 'da_city';
      joinColumn = 'city_id';
      whereColumn = 'post_code_id';
      whereValue = data.post_code_id;
      tableColumns = [`da_post_code.city_id`,
          'da_post_code.state_id',
          'da_post_code.region_id',
          'da_post_code.zone_id',
          'da_post_code.country_id'
      ];
  }

  const parentExists = await getParentData(tableColumns, childTable, parentTable, joinColumn, whereColumn, whereValue);

  if (parentExists[0].count == 0) {
      console.log(`Zone selected to save Region ${data.region_name} does not exist.`);
      return;
  }

  if (type === 'region') {
	  
      const { country_id } = parentExists[0];
      postData = {
          ...data,
          country_id
      };
      
      if (isEdit) {
          const regionId = id;
          sql = `UPDATE da_region SET ? WHERE region_id = ${regionId}`;
      } else {
		  
          sql = `INSERT INTO da_region SET ?`;
      }
  } else if (type === 'state') {
      const { zone_id, country_id } = parentExists[0];
      postData = {
          ...data,
          zone_id,
          country_id
      };

      if (isEdit) {
          const stateId = id;
          sql = `UPDATE da_state SET ? WHERE state_id = ${stateId}`;
      } else {
          sql = `INSERT INTO da_state SET ?`;
      }

  } else if (type === 'city') {
      const { region_id, zone_id, country_id } = parentExists[0];
      postData = {
          ...data,
          region_id,
          zone_id,
          country_id
      };

      if (isEdit) {
          const cityId = id;
          sql = `UPDATE da_city SET ? WHERE city_id = ${cityId}`;
      } else {
          sql = `INSERT INTO da_city SET ?`;
      }
  } else if (type === 'post_code') {
      const { state_id, region_id, zone_id, country_id } = parentExists[0];
      postData = {
          ...data,
          state_id,
          region_id,
          zone_id,
          country_id
      };

      if (isEdit) {
          const postCodeId = id;
          sql = `UPDATE da_post_code SET ? WHERE post_code_id = ${postCodeId}`;
      } else {
          sql = `INSERT INTO da_post_code SET ?`;
      }
  } else if (type === 'locality') {
      const { city_id, state_id, region_id, zone_id, country_id } = parentExists[0];
      postData = {
          ...data,
          city_id,
          state_id,
          region_id,
          zone_id,
          country_id
      };

      if (isEdit) {
          const localityId = id;
          sql = `UPDATE da_locality SET ? WHERE locality_id = ${localityId}`;
      } else {
          sql = `INSERT INTO da_locality SET ?`;
      }
  }

  const result = await pool.query(sql, [postData]);

  return result[0];
};

async function checkIfExists(table_name, col_name, col_value) {
  const sql = 'SELECT COUNT(*) as count FROM ?? WHERE ?? = ?';
  const result = await pool.query(sql, [table_name, col_name, col_value]);
  return result[0][0].count > 0;
}

exports.createCountry = async (data) => {
  const isExists = await checkIfExists('da_country', 'country_name', data.country_name);

  if (isExists) {
    throw new Error(`Country ${data.country_name} is already exists.`);
  }

  const sql = 'INSERT INTO da_country SET ?';
  const result = await pool.query(sql, [data]);
  return result[0];
};

exports.getCountries = async () => {
  const col = ['country_id as `Id`',
                'country_name as `Name`', 
                'status as `Status`', 
                'created_at as `Created At`'
              ];

  const sql = `SELECT ${col} FROM da_country ORDER BY created_at DESC`;
  const result = await pool.query(sql);

  const rows = result?.[0] || [];
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const values = rows.map((row, index) => [index + 1, ...Object.values(row)]);
  
  const formattedRows = columns.length > 0 && values.length > 0 ? {
    columns: ['seq', ...columns, 'Actions'],
    values: values.map(val => {
      const obj = {};
      const actions = ['Edit', 'Delete'];
      const actionsIcons = ['edit', 'delete'];
      val.forEach((value, i) => {
        if (i === 0) {
          obj['seq'] = value;
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getCountry = async (id) => {
  const sql = 'SELECT * FROM da_country WHERE country_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateCountry = async (id, data) => {
  const sql = 'UPDATE da_country SET ? WHERE country_id = ?';
  const result = await pool.query(sql, [data, id]);
  return result[0];
};

exports.deleteCountry = async (id) => {
  const sql = 'DELETE FROM da_country WHERE country_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createZone = async (data) => {
  const isExists = await checkIfExists('da_zone', 'zone_name', data.zone_name);
  if (isExists) {
    throw new Error(`Zone ${data.zone_name} is already exists.`);
  }

  const sql = 'INSERT INTO da_zone SET ?';
  const result = await pool.query(sql, [data]);
  return result[0];
};

exports.getZones = async () => {
  const col = ['da_zone.zone_id as `Id`', 
                'da_zone.zone_name as `Name`',
                'da_zone.country_id as `CountryId`',
                'da_country.country_name as `Country`', 
                'da_zone.status as `Status`', 
                'da_zone.created_at as `Created At`'
              ];

  const sql = `SELECT ${col}
                FROM
                  da_zone
                  JOIN da_country ON da_zone.country_id = da_country.country_id
                ORDER BY da_zone.created_at DESC`;

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getZone = async (id) => {
  const sql = 'SELECT * FROM da_zone WHERE zone_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateZone = async (id, data) => {
  const sql = 'UPDATE da_zone SET ? WHERE zone_id = ?';
  const result = await pool.query(sql, [data, id]);
  return result[0];
};

exports.deleteZone = async (id) => {
  const sql = 'DELETE FROM da_zone WHERE zone_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createRegion = async (data) => {
	
  const isExists = await checkIfExists('da_region', 'region_name', data.region_name);
  
  if (isExists) {
    throw new Error(`Region ${data.region_name} is already exists.`);
  }

  await exports.savePlaces(data, 'region');
  
};

exports.getRegions = async () => {
  const col = ['da_region.region_id as `Id`',
                'da_region.region_name as `Name`',
                'da_region.zone_id as `ZoneId`',
                'da_zone.zone_name as `Zone`',
                'da_country.country_name as `Country`',
                'da_region.status as `Status`', 
                'da_region.created_at as `Created At`'
              ];

  const sql = `SELECT ${col}
                FROM 
                  da_region 
                  JOIN da_zone ON da_region.zone_id = da_zone.zone_id
                  JOIN da_country ON da_zone.country_id = da_country.country_id 
                ORDER BY da_region.created_at DESC`;

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getRegion = async (id) => {
  const sql = 'SELECT * FROM da_region WHERE region_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateRegion = async (id, data) => {
  await exports.savePlaces(data, 'region', id, true);
};

exports.deleteRegion = async (id) => {
  const sql = 'DELETE FROM da_region WHERE region_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createState = async (data) => {
  const isExists = await checkIfExists('da_state', 'state_name', data.state_name);
  if (isExists) {
    throw new Error(`State ${data.state_name} is already exists.`);
  }

  await exports.savePlaces(data, 'state');
};

exports.getStates = async (session) => {
  const {clientId, userId} = session;
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
                    JOIN client_${clientId}.c_user ON client_${clientId}.c_user.state_id = da_state.state_id
                  WHERE client_${clientId}.c_user.id = ?
                ORDER BY da_state.created_at DESC`;

  const result = await pool.query(sql, [userId]);

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getState = async (id) => {
  const sql = 'SELECT * FROM da_state WHERE state_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateState = async (id, data) => {
  await exports.savePlaces(data, 'state', id, true);
};

exports.deleteState = async (id) => {
  const sql = 'DELETE FROM da_state WHERE state_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createCity = async (data) => {
  const isExists = await checkIfExists('da_city', 'city_name', data.city_name);
  if (isExists) {
    throw new Error(`City ${data.city_name} is already exists.`);
  }

  await exports.savePlaces(data, 'city');
};

exports.getCities = async () => {
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
                ORDER BY da_city.created_at DESC`;

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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


exports.getCity = async (id) => {
  const sql = 'SELECT * FROM da_city WHERE city_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateCity = async (id, data) => {
  await exports.savePlaces(data, 'city', id, true);
};

exports.deleteCity = async (id) => {
  const sql = 'DELETE FROM da_city WHERE city_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createPostCode = async (data) => {
  const isExists = await checkIfExists('da_post_code', 'post_code', data.post_code);
  if (isExists) {
    throw new Error(`Postal Code ${data.post_code} is already exists.`);
  }

  await exports.savePlaces(data, 'post_code');
};

exports.getPostCodes = async () => {
  const col = ['da_post_code.post_code_id as `Id`',
                'da_post_code.post_code as `Name`',
                'da_city.city_id as `CityId`',
                'da_city.city_name as `City`', 
                'da_state.state_name as `State`',
                'da_region.region_name as `Region`',
                'da_zone.zone_name as `Zone`',
                'da_country.country_name as `Country`',
                'da_post_code.status as `Status`', 
                'da_post_code.created_at as `Created At`'
              ];
  const sql = `SELECT ${col}
                FROM 
                  da_post_code 
                  JOIN da_city ON da_post_code.city_id = da_city.city_id 
                  JOIN da_state ON da_city.state_id = da_state.state_id 
                  JOIN da_region ON da_state.region_id = da_region.region_id 
                  JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
                  JOIN da_country ON da_zone.country_id = da_country.country_id 
                ORDER BY da_post_code.created_at DESC`;

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getPostCode = async (id) => {
  const sql = 'SELECT * FROM da_post_code WHERE post_code_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updatePostCode = async (id, data) => {
  await exports.savePlaces(data, 'post_code', id, true);
};

exports.deletePostCode = async (id) => {
  const sql = 'DELETE FROM da_post_code WHERE post_code_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.getAllPlacesByPostCode = async (id) => {
  
  const sql = `SELECT
                da_city.city_name,
                da_city.city_id,
                da_state.state_name,
                da_state.state_id,
                da_region.region_name,
                da_region.region_id,
                da_zone.zone_name,
                da_zone.zone_id,
                da_country.country_name,
                da_country.country_id,
                GROUP_CONCAT(DISTINCT da_locality.locality_name SEPARATOR ', ') as locality_names,
                GROUP_CONCAT(DISTINCT da_locality.locality_id SEPARATOR ', ') as locality_ids
              FROM
                da_post_code
                JOIN da_city ON da_post_code.city_id = da_city.city_id
                JOIN da_state ON da_post_code.state_id = da_state.state_id
                JOIN da_region ON da_post_code.region_id = da_region.region_id
                JOIN da_zone ON da_post_code.zone_id = da_zone.zone_id
                JOIN da_country ON da_post_code.country_id = da_country.country_id
                JOIN da_locality ON da_post_code.post_code_id = da_locality.post_code_id
              WHERE
                da_post_code.post_code_id = ?
              GROUP BY
                da_post_code.city_id,
                da_post_code.state_id,
                da_post_code.region_id,
                da_post_code.zone_id,
                da_post_code.country_id,
                da_city.city_name,
                da_state.state_name,
                da_region.region_name,
                da_zone.zone_name,
                da_country.country_name
                `;

  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.createLocality = async (data) => {
  const isExists = await checkIfExists('da_locality', 'locality_name', data.locality_name);
  if (isExists) {
    throw new Error(`Locality ${data.locality_name} is already exists.`);
  }

  await exports.savePlaces(data, 'locality');
};

exports.getLocalities = async () => {
  const col = ['da_locality.locality_id as `Id`',
                'da_locality.locality_name as `Name`',
                'da_post_code.post_code_id as `PostCodeId`',
                'da_post_code.post_code as `PostCode`',
                'da_city.city_name as `City`', 
                'da_state.state_name as `State`',
                'da_region.region_name as `Region`',
                'da_zone.zone_name as `Zone`',
                'da_country.country_name as `Country`',
                'da_locality.status as `Status`', 
                'da_locality.created_at as `Created At`'
              ];

  const sql = `SELECT ${col}
                FROM 
                  da_locality 
                  JOIN da_post_code ON da_locality.post_code_id = da_post_code.post_code_id 
                  JOIN da_city ON da_post_code.city_id = da_city.city_id 
                  JOIN da_state ON da_city.state_id = da_state.state_id 
                  JOIN da_region ON da_state.region_id = da_region.region_id 
                  JOIN da_zone ON da_region.zone_id = da_zone.zone_id 
                  JOIN da_country ON da_zone.country_id = da_country.country_id 
                ORDER BY da_locality.created_at DESC`;

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
        } else if (columns[i - 1] === 'Created At') {
            const date = value ? format(new Date(value), 'dd/MM/yyyy') : '';
            obj['Created At'] = date;
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

exports.getLocality = async (id) => {
  const sql = 'SELECT * FROM da_locality WHERE locality_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};

exports.updateLocality = async (id, data) => {
  await exports.savePlaces(data, 'locality', id, true);
};

exports.deleteLocality = async (id) => {
  const sql = 'DELETE FROM da_locality WHERE locality_id = ?';
  const result = await pool.query(sql, [id]);
  return result[0];
};