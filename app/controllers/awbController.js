
const service = require('../services/awbService');
exports.createAwbType = async (req, res, next) => {
  try {
    const result = await service.createAwbType(req, req.body, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add/update AWB Type."
    });
  }
};

exports.getAwbType = async (req, res, next) => {
  try {
    const result = await service.getAwbType(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Types."
    });
  }
};
exports.getAWBFillValues = async (req, res, next) => {
  try {
    const result = await service.getAWBFillValues();
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Types."
    });
  }
};

exports.deleteAwbType = async (req, res, next) => {
  try {
    const result = await service.deleteAwbType(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete."
    });
  }
};
exports.getAWBFillValues = async (req, res, next) => {
  try {
    const result = await service.getAWBFillValues();
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Types."
    });
  }
};

exports.awbSalesFillValues = async (req, res, next) => {
  try {
    const result = await service.getSalesFillValues(req);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get sales data."
    });
  }
};

exports.createAwbSales = async (req, res, next) => {
  try {
    const result = await service.createAwbSales(req, req.body, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add/update AWB Sale."
    });
  }
};

exports.getAwbSales = async (req, res, next) => {
  try {
    const result = await service.getAwbSales(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Sales."
    });
  }
};

exports.deleteAwbSales = async (req, res, next) => {
  try {
    const result = await service.deleteAwbSales(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete."
    });
  }
};


// Purchase

exports.awbPurchaseFillValues = async (req, res, next) => {
  try {
    const result = await service.getPurchaseFillValues(req);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get purchase data."
    });
  }
};

exports.createAwbPurchase = async (req, res, next) => {
  try {
    const result = await service.createAwbPurchase(req, req.body, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add/update AWB Purchase."
    });
  }
};

exports.getAwbPurchase = async (req, res, next) => {
  try {
    const result = await service.getAwbPurchase(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Purchase."
    });
  }
};

exports.deleteAwbPurchase = async (req, res, next) => {
  try {
    const result = await service.deleteAwbPurchase(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete."
    });
  }
};


// Issue

exports.awbIssueFillValues = async (req, res, next) => {
  try {
    console.log(req.session)
    const result = await service.getIssueFillValues(req.session.userSession.officeId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get issue data."
    });
  }
};

exports.createAwbIssue = async (req, res, next) => {
  try {
    const result = await service.createAwbIssue(req, req.body, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add/update/update AWB Issue."
    });
  }
};

exports.getAwbIssue = async (req, res, next) => {
  try {
    const result = await service.getAwbIssue(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get AWB Issues."
    });
  }
};

exports.deleteAwbIssue = async (req, res, next) => {
  try {
    const result = await service.deleteAwbIssue(req, req.params.id);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete."
    });
  }
}; 