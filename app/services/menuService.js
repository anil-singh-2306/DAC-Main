const pool = require('../config/db');

exports.getMenus = async (req) => {

  const sql = `WITH RECURSIVE menu_tree AS ( 
                    SELECT id, name, link, class, icon_name, icon_type, badge_name, badge_class, group_title, parent_id, 1 AS level 
                      FROM client_1001.c_menu 
                        WHERE parent_id IS NULL 
                    
                    UNION ALL 
                    
                    SELECT child.id, child.name, child.link, child.class, child.icon_name, child.icon_type, child.badge_name, child.badge_class, child.group_title, child.parent_id, parent.level + 1 
                      FROM client_1001.c_menu child 
                        JOIN menu_tree parent ON child.parent_id = parent.id 
                        WHERE is_visible = 1
                ) 
                SELECT id, name, link, class, icon_name, icon_type, badge_name, badge_class, group_title, parent_id, level 
                  FROM menu_tree 
                    ORDER BY parent_id ASC, id ASC`;

  const result = await pool.query(sql);
  return result[0];
};