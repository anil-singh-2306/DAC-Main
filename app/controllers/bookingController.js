const service = require('../services/bookingService');

exports.SearchAWBNumber = async (req, res, next) => {
    try {
      const result = await service.SearchAWBNumber(req.params.str);
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
      const result = await service.SearchPinCode(req.params.str);
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
      const result = await service.SearchCities(req.params.str);
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
      const result = await service.SearchStates(req.params.str);
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
      const result = await service.GetLocalitiesOnPostCode(req.params.id);
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
    const result = await service.GetOfficeById(req.params.id);
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
    const result = await service.GetPincodeById(req.params.id);
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
    const result = await service.GetStateById(req.params.id);
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
    const deliveryModes = await service.GetDeliveryModes();
    const serviceMode = await service.GetServiceModes();
    const paymentModes = await service.GetPaymentModes();
    const consingmentTypes = await service.GetConsingmentTypes();
    const gstRates = await service.GetGstRates();

    const result={
      deliveryModes,
      serviceMode,
      paymentModes,
      consingmentTypes,
      gstRates
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
    const result = await service.GetFillValuesByBookingId( req.params.id);
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
    const result = await service.CreatBooking(req.body, req.params.id);
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
    const result = await service.GetBookings(req.params.id);
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
    const result = await service.DeleteBooking(req.params.id);
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
    const result = await service.getConsignorDetail(req.params.mobile);
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
    const result = await service.getConsigneeDetail(req.params.mobile);
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