const service = require('../services/permissionService');

exports.getPermissions = async (req, res, next) => {
    try {
      const result = await service.getPermissions(req);
  
      // create an object to store the modified data
      const modifiedData = {
        success: true,
        data: []
      };
  
      result.forEach(item => { // loop through the original data array and modify each object
  
        const newItem = { // create a new object with the desired properties
          path: item.link || '',
          title: item.name,
          iconType: item.icon_type || '',
          icon: item.icon_name || '',
          class: item.class || '',
          groupTitle: item.group_title || false,
          badge: item.badge_name || '',
          badgeClass: item.badge_class || '',
          create: item.per_create === 1 ? true : false,
          read: item.per_read === 1 ? true : false,
          update: item.per_update === 1 ? true : false,
          delete: item.per_delete === 1 ? true : false,
          export: item.per_export === 1 ? true : false,
          //role: ['Admin'], // or whichever roles you want to assign
          submenu: []
        };
  
        // if the item has a parent_id, find the corresponding parent in the modifiedData array
        if (item.parent_id) {
          const parent = result[item.parent_id - 1];
          const parentName = parent && parent.name;
          const parentIndex = modifiedData.data.findIndex(parent => parent.title === parentName);
          // add the new item to the parent's submenu array, if the parent is found
          if (parentIndex >= 0) {
            modifiedData.data[parentIndex].submenu.push(newItem);
          }
        } else {
          // add the new item to the top-level data array
          modifiedData.data.push(newItem);
        }
      });
  
      res.json(modifiedData);
    } catch (err) {
      console.error(err);
      const message = err.message || 'An unknown error occurred';
      res.status(400).json({
        success: false,
        message: message
      });
    }
  };
  