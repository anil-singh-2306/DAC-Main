const service = require('../services/tariffService');

exports.getFillValues = async (req, res, next) => {
  try {
    const session = req.session.userSession;
    
      // Retrieve 20 values for all locations
      result = await service.getFillValues(session);

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
        lt_json: JSON.stringify(jsonData), // Convert lt_json to JSON string
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

exports.getLocationTariff = async (req, res, next) => {
    try {
      const session = req.session.userSession;
  
      const result = await service.getLocationTariff(req, req.params.id, session);
  
      // Extracting key-value pairs from "lt_json" column
      const ltJson = result.lt_json;
      delete result.lt_json; // Remove the "lt_json" column from the result
  
      // Adding key-value pairs as separate columns in the result
      for (const key in ltJson) {
        result[key] = ltJson[key];
      }
  
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
  

exports.updateLocationTariff = async (req, res, next) => {
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
    const result = await service.updateLocationTariff(req, req.params.id, newData, session);
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

exports.deleteLocationTariff = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.deleteLocationTariff(req, req.params.id, session);
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

exports.createCustomerTariff = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.createCustomerTariff(req, req.body, session);
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

  exports.updateCustomerTariff = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const data = req.body;
    
        // Retrieve values from data variable and handle null, undefined, or empty values
        const rt_id = data.rt_id || '';
        const ct_customer = data.ct_customer || '';
        const ct_discount = data.ct_discount || '';
        const ct_dsc = data.ct_dsc || '';
        const ct_fsc = data.ct_fsc || '';
        const ct_gst = data.ct_gst || '';
        const ct_insurance = data.ct_insurance || '';
        const ct_others = data.ct_others || '';
    
        // Create JSON with key-value pairs
        const jsonData = {
          rt_id,
          ct_customer,
          ct_discount,
          ct_dsc,
          ct_fsc,
          ct_gst,
          ct_insurance,
          ct_others,
        };
    
        // Create new data variable with ct_json and ct_name keys
        const newData = {
          ct_json: jsonData,
          ct_name: data.ct_name
        };
    
        // Pass the newly created data variable into "updateCustomerTariff" function
      const result = await service.updateCustomerTariff(req, req.params.id, jsonData, session);
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

  exports.getCustomerTariffs = async (req, res, next) => {
    try {
      const session = req.session.userSession;
  
      const result = await service.getCustomerTariffs(req, session);
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
  
  exports.getCustomerTariff = async (req, res, next) => {
      try {
        const session = req.session.userSession;
    
        const result = await service.getCustomerTariff(req, req.params.id, session);
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

  exports.deleteCustomerTariff = async (req, res, next) => {
    try {
      const session = req.session.userSession;
  
      const result = await service.deleteCustomerTariff(req, req.params.id, session);
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

  exports.getCustomers = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.getCustomers(req, req.body, session);
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
  exports.getRateTariffs = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.getRateTariffs(req, req.body, session);
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