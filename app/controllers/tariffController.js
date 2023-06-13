const service = require('../services/tariffService');

exports.createLocationTariff = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const data = req.body;
  
      // Retrieve values from data variable and handle null, undefined, or empty values
      const from_country = data.from_country || '';
      const from_zone = data.from_zone || '';
      const from_region = data.from_region || '';
      const from_state = data.from_state || '';
      const from_city = data.from_city || '';
      const from_post_code = data.from_post_code || '';
      const from_locality = data.from_locality || '';
      const to_country = data.to_country || '';
      const to_zone = data.to_zone || '';
      const to_region = data.to_region || '';
      const to_state = data.to_state || '';
      const to_city = data.to_city || '';
      const to_post_code = data.to_post_code || '';
      const to_locality = data.to_locality || '';
  
      // Create JSON with key-value pairs
      const jsonData = {
        from_country,
        from_zone,
        from_region,
        from_state,
        from_city,
        from_post_code,
        from_locality,
        to_country,
        to_zone,
        to_region,
        to_state,
        to_city,
        to_post_code,
        to_locality
      };
  
      // Create new data variable with lt_json and lt_name keys
      const newData = {
        lt_json: jsonData,
        lt_name: data.lt_name
      };
  
      // Pass the newly created data variable into "createLocationTariff" function
      const result = await service.createLocationTariff(req, newData, session);
      res.status(201).json({
        success: true,
        data: result
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
  

exports.getLocationTariffs = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.getLocationTariffs(req, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.getRole = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.getRole(req, req.params.id, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.updateRole = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.updateRole(req, req.params.id, req.body, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.deleteRole = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.deleteRole(req, req.params.id, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.createUser = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.createUser(req, req.body, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.getUsers = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.getUsers(req, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.getUser = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.getUser(req, req.params.id, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.updateUser = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.updateUser(req, req.params.id, req.body, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.deleteUser = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.deleteUser(req, req.params.id, session);
    res.status(200).json({
      success: true,
      data: result
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

exports.updateStatus = async (req, res, next) => {
  try {
    const session = req.session.userSession;
    
    const result = await service.updateStatus(req, req.params.id, req.body, session);
    res.status(200).json({
      success: true,
      data: result,
      message: 'Status updated successfully.'
    });
  } catch (err) {
    console.error(err);
    const message = err.message || 'An unknown error occurred.';
    res.status(400).json({
      success: false,
      message: message
    });
  }
};