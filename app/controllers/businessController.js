const service = require('../services/businessService');

exports.createBusiness = async (req, res, next) => {
  try {
    const session = req.session.userSession;
    const result = await service.createBusiness(req, req.body, session);
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

exports.getBusinesses = async (req, res, next) => {
  try {
    const result = await service.getBusinesses(req);
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

exports.getBusiness = async (req, res, next) => {
  try {
    const result = await service.getBusiness(req, req.params.id);
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

exports.updateBusiness = async (req, res, next) => {
  try {
    const result = await service.updateBusiness(req, req.params.id, req.body);
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

exports.deleteBusiness = async (req, res, next) => {
  try {
    const result = await service.deleteBusiness(req, req.params.id);
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

exports.createBranch = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.createBranch(req, req.body, session);
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
  
  exports.getBranches = async (req, res, next) => {
    try {
      const result = await service.getBranches(req);
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
  
  exports.getBranch = async (req, res, next) => {
    try {
      const result = await service.getBranch(req, req.params.id);
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
  
  exports.updateBranch = async (req, res, next) => {
    try {
      const result = await service.updateBranch(req, req.params.id, req.body);
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
  
  exports.deleteBranch = async (req, res, next) => {
    try {
      const result = await service.deleteBranch(req, req.params.id);
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

  exports.createOffice = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.createOffice(req, req.body, session);
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
  
  exports.getOffices = async (req, res, next) => {
    try {
      const session = req.session.userSession;
      const result = await service.getOffices(req, session);
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
  
  exports.getOffice = async (req, res, next) => {
    try {
      const result = await service.getOffice(req, req.params.id);
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
  
  exports.updateOffice = async (req, res, next) => {
    try {
      const result = await service.updateOffice(req, req.params.id, req.body);
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
  
  exports.deleteOffice = async (req, res, next) => {
    try {
      const result = await service.deleteOffice(req, req.params.id);
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