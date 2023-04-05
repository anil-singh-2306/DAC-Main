const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.authenticate = async (clientId, email, password, res) => {

    const sql = `SELECT u.id,u.password,u.first_name,u.last_name,u.email,u.profile_picture,u.company_id,u.role_id, 
                c.logo, c.name, r.role_name,office.office_id
                    FROM client_${clientId}.c_user u
                        INNER JOIN da_company c ON u.company_id = c.company_id
                        INNER JOIN da_role r ON u.role_id = r.role_id
                        LEFT JOIN client_${clientId}.c_office  office on u.office_id = office.office_id
                    WHERE u.email = ?
                `;
    
    const result = await pool.query(sql, [email]);
    
    if (result[0].length === 0) {
        throw new Error('Email or password is incorrect');
    }
    const user = result[0][0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email or password is incorrect');
    }

    delete user.password;
    return user;
};


exports.generateAccessToken = async (user) => {
    return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = async (user) => {
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

exports.refreshToken = async (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            throw new Error('Invalid refresh token');
        }

        delete user.iat;
        delete user.exp;
        return user;
    });
};

exports.changePassword = async (req) => {
    const { id } = req.params;
    const { old_password, new_password } = req.body;

    const sqlUser = 'SELECT * FROM client_1001.c_user WHERE id = ?';
    const user = await pool.query(sqlUser, [id]);

    if (!user[0]) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(old_password, user[0][0].password);
      if (!passwordMatch) {
        throw new Error('Incorrect old password');
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      const sql = 'UPDATE client_1001.c_user SET password = ?, temp_password = ? WHERE id = ?';
    const result = await pool.query(sql, [hashedPassword, new_password, id]);
      return result;
  };
