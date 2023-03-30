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

exports.savePlaces = async (data, type, isEdit = false) => {

    let childTable = '';
    let parentTable = '';
    let joinColumn = '';
    let whereColumn = '';
    let whereValue = '';
    let tableColumns = [];
    let postData = {};

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
        let sql = '';
        if (isEdit) {
            const regionId = data.region_id;
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
        let sql = '';
        if (isEdit) {
            const stateId = data.state_id;
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
        let sql = '';
        if (isEdit) {
            const cityId = data.city_id;
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
        let sql = '';
        if (isEdit) {
            const postCodeId = data.post_code_id;
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
        let sql = '';
        if (isEdit) {
            const localityId = data.locality_id;
            sql = `UPDATE da_locality SET ? WHERE locality_id = ${localityId}`;
        } else {
            sql = `INSERT INTO da_locality SET ?`;
        }
    }

    const result = await pool.query(sql, [postData]);

    return result[0];
};