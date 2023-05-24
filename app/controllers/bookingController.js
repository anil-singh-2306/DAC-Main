const service = require('../services/bookingService');

exports.SearchAWBNumber = async (req, res, next) => {
    try {
      const result = await service.SearchAWBNumber(req.params.str,req.session.userSession.clientId);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
     console.error(err)
      res.status(400).json({
        success: false,
        message: "Unable to get Awb Numbers."
      });
    }
  };

  exports.SearchPinCode = async (req, res, next) => {
    try {
      const result = await service.SearchPinCode(req.params.str,req.session.userSession.clientId);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
     console.error(err)
      res.status(400).json({
        success: false,
        message: "Unable to getpincodes."
      });
    }
  }; 

  exports.SearchCities = async (req, res, next) => {
    try {
      const result = await service.SearchCities(req.params.str,req.session.userSession.clientId);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
     console.error(err)
      res.status(400).json({
        success: false,
        message: "Unable to get cities."
      });
    }
  }; 

  exports.SearchStates = async (req, res, next) => {
    try {
      const result = await service.SearchStates(req.params.str,req.session.userSession.clientId);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
     console.error(err)
      res.status(400).json({
        success: false,
        message: "Unable to get states."
      });
    }
  }; 
  
  exports.GetLocalitiesOnPostCode =async (req, res, next) => {

    try {
      const result = await service.GetLocalitiesOnPostCode(req.params.id,req.session.userSession.clientId);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
     console.error(err)
      res.status(400).json({
        success: false,
        message: "Unable to get localities."
      });
    }
  };
exports.GetOfficeById =async (req, res, next) => {

  try {
    const result = await service.GetOfficeById(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get office."
    });
  }
};

exports.GetPincodeById =async (req, res, next) => {

  try {
    const result = await service.GetPincodeById(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get pincodes."
    });
  }
};
exports.GetStateById =async (req, res, next) => {

  try {
    const result = await service.GetStateById(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get pincodes."
    });
  }
};

exports.FillValues =async (req, res, next) => {

  try {
    const deliveryModes = await service.GetDeliveryModes(req.session.userSession.clientId);
    const serviceMode = await service.GetServiceModes(req.session.userSession.clientId);
    const paymentModes = await service.GetPaymentModes(req.session.userSession.clientId);
    const consingmentTypes = await service.GetConsingmentTypes(req.session.userSession.clientId);
    const gstRates = await service.GetGstRates(req.session.userSession.clientId);
    const isHeadOffice = await service.IsHeadOffice(req.session.userSession.officeId,req.session.userSession.clientId);

    const result={
      deliveryModes,
      serviceMode,
      paymentModes,
      consingmentTypes,
      gstRates,
      isHeadOffice
    }
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
exports.GetFillValuesByBookingId =async (req, res, next) => {

  try {
    const result = await service.GetFillValuesByBookingId( req.params.id,req.session.userSession.officeId,req.session.userSession.clientId);
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


exports.CreatBooking = async (req, res, next) => {
  try {
    const result = await service.CreatBooking(req.body, req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to add/update Booking."
    });
  }
};

exports.GetBookings = async (req, res, next) => {
  try {
    const result = await service.GetBookings(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get Bookings."
    });
  }
};
exports.DeleteBooking = async (req, res, next) => {
  try {
    const result = await service.DeleteBooking(req.params.id,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to delete Booking."
    });
  }
};

exports.GetConsignorDetail = async (req, res, next) => {
  try {
    const result = await service.getConsignorDetail(req.params.mobile,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get consignor detail."
    });
  }
};

exports.GetConsigneeDetail = async (req, res, next) => {
  try {
    const result = await service.getConsigneeDetail(req.params.mobile,req.session.userSession.clientId);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
   console.error(err)
    res.status(400).json({
      success: false,
      message: "Unable to get consignee detail."
    });
  }
};