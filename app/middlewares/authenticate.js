const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const pool = require('../config/db');

exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
    const userId = decodedToken.userId;
    if (req.params.id && req.params.id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware
exports.isAllowed = (action) => {
  return async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const clientId = session?.clientId;

      const token = req.headers.authorization;
      console.dir(req.headers);
      console.log(req.headers.authorization, token, process.env.ACCESS_SECRET);
      const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
      const userRole = decodedToken.role_id;

      const query = `
        SELECT permission_set
        FROM client_${clientId}.c_role_permissions
        WHERE role_id = ? AND submenu_id = ? AND status = 1 AND is_visible = 1
      `;
      //const [rows] = await db.query(query, [userRole, req.body.submenu_id]);
      const [rows] = await pool.query(query, [userRole, 9]);

      if (rows.length === 0) {
        throw new Error('Invalid resource or action');
      }

      const allowedPermissionArr = rows[0].permission_set.split(',');
      if (!allowedPermissionArr.includes(action)) {
        throw new Error('Unauthorized');
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: err.message });
    }
  };
};

