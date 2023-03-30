const service = require('../services/companyService');

exports.createCompany = async (req, res, next) => {
  try {
    const result = await service.createCompany(req, req.body);
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

exports.getCompanies = async (req, res, next) => {
  try {
    const result = await service.getCompanies(req);
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

exports.getCompany = async (req, res, next) => {
  try {
    const result = await service.getCompany(req, req.params.id);
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

exports.updateCompany = async (req, res, next) => {
  try {
    const result = await service.updateCompany(req, req.params.id, req.body);
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

exports.deleteCompany = async (req, res, next) => {
  try {
    const result = await service.deleteCompany(req, req.params.id);
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