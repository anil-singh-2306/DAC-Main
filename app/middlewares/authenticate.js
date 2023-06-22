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
exports.isAllowed = (action, menu) => {
  return async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const clientId = session?.clientId;

      //console.dir(req.headers);
      //console.log(req.headers.authorization, token, process.env.ACCESS_SECRET);

      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
      const userRole = decodedToken.role_id;

      const queryMenu = `SELECT id FROM client_${clientId}.c_menu WHERE LOWER(name) = LOWER(?)`;
      const [menuRows] = await pool.query(queryMenu, [menu]);
      if (menuRows.length === 0) {
        throw new Error('Invalid resource');
      }
      const menuId = menuRows[0].id;

      const query = `
        SELECT per_create, per_read, per_update, per_delete, per_export
        FROM client_${clientId}.c_role_permissions
        WHERE role_id = ? AND submenu_id = ? AND status = 1 AND is_visible = 1
      `;
      const [rows] = await pool.query(query, [userRole, menuId]);

      if (rows.length === 0) {
        throw new Error('Invalid resource or action');
      }

      const allowedPermissionObj = rows[0];
      const allowedPermissionArr = Object.keys(allowedPermissionObj)
        .filter(permission => allowedPermissionObj[permission] === 1)
        .map(permission => permission.replace('per_', '')); // remove "per_" prefix

      //console.log(allowedPermissionArr);
      const isAllowed = action.every(permission => allowedPermissionArr.includes(permission));

      //console.log(isAllowed);
      if (!isAllowed) {
        //console.log('Unauthorized');
        //throw new Error('Unauthorized');
        next();
      } else {
        //console.log('authorized');
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: err.message });
    }
  };
};