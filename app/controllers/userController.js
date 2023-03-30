const service = require('../services/userService');

exports.createRole = async (req, res, next) => {
  try {
    const result = await service.createRole(req, req.body);
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

exports.getRoles = async (req, res, next) => {
  try {
    const result = await service.getRoles(req);
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
    const result = await service.getRole(req, req.params.id);
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
    const result = await service.updateRole(req, req.params.id, req.body);
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
    const result = await service.deleteRole(req, req.params.id);
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
    const result = await service.createUser(req, req.body);
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
    const result = await service.getUsers(req);
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
    const result = await service.getUser(req, req.params.id);
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
    const result = await service.updateUser(req, req.params.id, req.body);
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
    const result = await service.deleteUser(req, req.params.id);
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
    const result = await service.updateStatus(req, req.params.id, req.body);
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