const pool = require('../config/db');

exports.updateProfile = async (id, filename) => {
    
    const sql = 'UPDATE client_1001.c_user SET profile_picture = ? WHERE id = ?';

    const result = await pool.query(sql, [filename, id]);

    if (result.affectedRows === 0) {
        throw new Error(`User with id ${id} not found`);
    }

    return result;
};
