const service = require('../services/manifestService');
exports.GetFillValues = async (req, res, next) => {
  try {
    const session = req.session.userSession;
    const result = await service.GetFillValues(session.userId,session.officeId,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to load data."
    });
  }
};
exports.CreateManifest = async (req, res, next) => {
  try {
    const result = await service.CreateManifest(req.body,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: {
        manifestId: result
      }
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add manifest."
    });
  }
};
exports.CreateManifestDetail = async (req, res, next) => {
  try {
    const result = await service.CreateManifestDetail(req.body, req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add vendor detail."
    });
  }
};
exports.DeleteManifest = async (req, res, next) => {
  try {
    const result = await service.DeleteManifest(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete manifest."
    });
  }
};
exports.GetManifests = async (req, res, next) => {
  try {
    const result = await service.GetManifests(req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete manifest."
    });
  }
};