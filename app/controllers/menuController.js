const service = require('../services/menuService');

exports.getMenus = async (req, res, next) => {
  try {
    const result = await service.getMenus(req);

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
        //role: ['Admin'], // or whichever roles you want to assign
        submenu: []
      };

      // if the item has a parent_id, find the corresponding parent in the modifiedData array
      if (item.parent_id) {
        const parentIndex = modifiedData.data.findIndex(parent => parent.title === result[item.parent_id - 1].name);
        // add the new item to the parent's submenu array
        modifiedData.data[parentIndex].submenu.push(newItem);
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