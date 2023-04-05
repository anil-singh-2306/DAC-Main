const service = require('../services/placeService');

exports.createCountry = async (req, res, next) => {
  try {
    const result = await service.createCountry(req.body);
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

exports.getCountries = async (req, res, next) => {
  try {
    const result = await service.getCountries();
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

exports.getCountry = async (req, res, next) => {
  try {
    const result = await service.getCountry(req.params.id);
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

exports.updateCountry = async (req, res, next) => {
  try {
    const result = await service.updateCountry(req.params.id, req.body);
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

exports.deleteCountry = async (req, res, next) => {
  try {
    const result = await service.deleteCountry(req.params.id);
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

exports.createZone = async (req, res, next) => {
  try {
    const result = await service.createZone(req.body);
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

exports.getZones = async (req, res, next) => {
  try {
    const result = await service.getZones();
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

exports.getZone = async (req, res, next) => {
  try {
    const result = await service.getZone(req.params.id);
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

exports.updateZone = async (req, res, next) => {
  try {
    const result = await service.updateZone(req.params.id, req.body);
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

exports.deleteZone = async (req, res, next) => {
  try {
    const result = await service.deleteZone(req.params.id);
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

exports.createRegion = async (req, res, next) => {
  try {
    const result = await service.createRegion(req.body);
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

exports.getRegions = async (req, res, next) => {
  try {
    const result = await service.getRegions();
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

exports.getRegion = async (req, res, next) => {
  try {
    const result = await service.getRegion(req.params.id);
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

exports.updateRegion = async (req, res, next) => {
  try {
    const result = await service.updateRegion(req.params.id, req.body);
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

exports.deleteRegion = async (req, res, next) => {
  try {
    const result = await service.deleteRegion(req.params.id);
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

exports.createState = async (req, res, next) => {
  try {
    const result = await service.createState(req.body);
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

exports.getStates = async (req, res, next) => {
  try {
    const session = req.session.userSession;

    const result = await service.getStates(session);
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

exports.getState = async (req, res, next) => {
  try {
    const result = await service.getState(req.params.id);
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

exports.updateState = async (req, res, next) => {
  try {
    const result = await service.updateState(req.params.id, req.body);
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

exports.deleteState = async (req, res, next) => {
  try {
    const result = await service.deleteState(req.params.id);
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

exports.createCity = async (req, res, next) => {
  try {
    const result = await service.createCity(req.body);
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

exports.getCities = async (req, res, next) => {
  try {
    const result = await service.getCities();
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

exports.getCity = async (req, res, next) => {
  try {
    const result = await service.getCity(req.params.id);
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

exports.updateCity = async (req, res, next) => {
  try {
    const result = await service.updateCity(req.params.id, req.body);
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

exports.deleteCity = async (req, res, next) => {
  try {
    const result = await service.deleteCity(req.params.id);
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

exports.createPostCode = async (req, res, next) => {
  try {
    const result = await service.createPostCode(req.body);
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

exports.getPostCodes = async (req, res, next) => {
  try {
    const result = await service.getPostCodes();
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

exports.getPostCode = async (req, res, next) => {
  try {
    const result = await service.getPostCode(req.params.id);
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

exports.updatePostCode = async (req, res, next) => {
  try {
    const result = await service.updatePostCode(req.params.id, req.body);
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

exports.deletePostCode = async (req, res, next) => {
  try {
    const result = await service.deletePostCode(req.params.id);
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

exports.getAllPlacesByPostCode = async (req, res, next) => {
  try {
    const result = await service.getAllPlacesByPostCode(req.params.id);

    const data = [];

    result.forEach((row) => {
      const localityArray = [];
      const localityIds = row.locality_ids.split(', ');
      const localityNames = row.locality_names.split(', ');

      localityIds.forEach((localityId, index) => {
        localityArray.push({
          locality_id: parseInt(localityId),
          locality_name: localityNames[index],
        });
      });

      data.push({
        City: row.city_name,
        city_id: row.city_id,
        State: row.state_name,
        state_id: row.state_id,
        Region: row.region_name,
        region_id: row.region_id,
        Zone: row.zone_name,
        zone_id: row.zone_id,
        Country: row.country_name,
        country_id: row.country_id,
        Localities: localityArray,
      });
    });

    const response = {
      success: true,
      data: data,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    const message = err.message || 'An unknown error occurred';
    res.status(400).json({
      success: false,
      message: message
    });
  }
};

exports.createLocality = async (req, res, next) => {
  try {
    const result = await service.createLocality(req.body);
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

exports.getLocalities = async (req, res, next) => {
  try {
    const result = await service.getLocalities();
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

exports.getLocality = async (req, res, next) => {
  try {
    const result = await service.getLocality(req.params.id);
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

exports.updateLocality = async (req, res, next) => {
  try {
    const result = await service.updateLocality(req.params.id, req.body);
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

exports.deleteLocality = async (req, res, next) => {
  try {
    const result = await service.deleteLocality(req.params.id);
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