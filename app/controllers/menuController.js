const service = require('../services/menuService');

exports.getMenus = async (req, res, next) => {
  try {
    const results = await service.getMenus(req);
    
      const jsonData = {};
  
      for (const row of results) {
        const id =  row.id;
          const parent_id = row.parent_id || '';
  
          if (!jsonData[id]) {
              jsonData[id] = { 
                id: id,
                path: row.link || '',
                title: row.name,
                iconType: row.icon_type || '',
                icon: row.icon_name || '',
                class: row.class || '',
                groupTitle: row.group_title || false,
                badge: row.badge_name || '',
                badgeClass: row.badge_class || '',
                //role: ['Admin'], // or whichever roles you want to assign
                submenu: []
              };
          }
  
          if (!jsonData[parent_id]) {
              jsonData[parent_id] = {
                  id: parent_id,
                  submenu: [],
              };
          }
  
          jsonData[parent_id].submenu.push(jsonData[id]);
      }
      //return jsonData;
      res.status(200).json({
        success: false,
        data: jsonData[''].submenu
      });
  } catch (err) {
    console.error(err);
    const message = err.message || 'An unknown error occurred';
    res.status(400).json({
      success: false,
      message: message
    });
  }
};