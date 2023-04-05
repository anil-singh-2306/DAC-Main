const service = require('../services/userService');

exports.createRole = async (req, res, next) => {
  try {
    const session = req.session.userSession;
    console.log('Session details information get roles--- starts');
    console.dir(session, { depth: null });
    console.log('Session details information get roles--- ends');

    const result = await service.createRole(req, req.body, session);
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
    const session = req.session.userSession;

    const result = await service.getRoles(req, session);
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