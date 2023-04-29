const pool = require('../config/db');

exports.getPermissions = async (req, session) => {
  const roleId = req.params.id;
  //const clientId = session?.clientId;rollId

    const sql = `WITH RECURSIVE menu_tree AS ( 
      SELECT m.id, m.name, m.link, m.class, m.icon_name, m.icon_type, m.badge_name, m.badge_class, m.group_title, m.parent_id, 1 AS level,
        p.per_create, p.per_read, p.per_update, p.per_delete, p.per_export
      FROM client_1001.c_menu m
      LEFT JOIN client_1001.c_role_permissions p ON m.id = p.submenu_id AND p.role_id = ?
      WHERE m.parent_id IS NULL 
      UNION ALL 
      SELECT m.id, m.name, m.link, m.class, m.icon_name, m.icon_type, m.badge_name, m.badge_class, m.group_title, m.parent_id, parent.level + 1,
        p.per_create, p.per_read, p.per_update, p.per_delete, p.per_export
      FROM client_1001.c_menu m 
      LEFT JOIN client_1001.c_role_permissions p ON m.id = p.submenu_id AND p.role_id = ?
      JOIN menu_tree parent ON m.parent_id = parent.id 
      WHERE m.is_visible = 1
    ) 
    SELECT id, name, link, class, icon_name, icon_type, badge_name, badge_class, group_title, parent_id, level,
      per_create, per_read, per_update, per_delete, per_export
    FROM menu_tree 
    ORDER BY parent_id ASC, id ASC;
    ;
    `;
  console.log(sql);
    const result = await pool.query(sql, [roleId, roleId]);
    return result[0];
  };
  