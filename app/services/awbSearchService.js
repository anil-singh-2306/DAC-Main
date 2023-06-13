const pool = require('../config/db');

exports.getAwbStatus = async (req, id, session) => {
  try {

    const clientId = session?.clientId;

    const bookingQuery = `SELECT 
                            CB.awb_number,
                            CO.office_name, 
                            CB.booking_date, 
                            AI.issue_date, 
                            PC.post_code, 
                            CB.consignee_mobile, 
                            CB.actual_weight, 
                            CB.chargeable_weight,
                            CB.invoice_number, 
                            CT.city_name, 
                            CB.no_of_packets, 
                            SM.service_mode_name, 
                            CB.consignment_value, 
                            CBD.consignor_name, 
                            DM.delivery_mode_name, 
                            CB.consignee_name
                          FROM 
                            client_${clientId}.c_booking CB 
                            LEFT JOIN client_${clientId}.c_office CO ON CB.booking_office_id = CO.office_id
                            LEFT JOIN client_${clientId}.c_awb_issue AI ON CB.awb_issue_id = AI.awb_issue_id
                            LEFT JOIN da_post_code PC ON CB.destination_pincode_id = PC.post_code_id
                            LEFT JOIN da_city CT ON CB.destionation_city_id = CT.city_id
                            LEFT JOIN client_${clientId}.c_service_mode SM ON CB.service_mode_id = SM.id
                            LEFT JOIN client_${clientId}.c_booking_consignor_detail CBD ON CB.id = CBD.booking_id
                            LEFT JOIN client_${clientId}.c_delivery_mode DM ON CB.delivery_mode_id = DM.id
                          WHERE 
                          CB.awb_number = ?`;
    const bookingResult = await pool.query(bookingQuery, [id]);

    if (bookingResult.length === 0) {
      return { error: `No Record found for AWB number ${id}.` };
    }

    const bookingDetails = bookingResult[0];
    const awbStatus = {
      bookingDetails: bookingDetails,
      bookingStatus: []
    };

    const bookingStatusQuery = `SELECT 'Booking' AS activity,booking_date,created_at,created_by FROM client_${clientId}.c_booking WHERE awb_number = ?`;
    const bookingStatusResult = await pool.query(bookingStatusQuery, [id]);
    awbStatus.bookingStatus = bookingStatusResult[0];

    return awbStatus;

  } catch (error) {
    console.log(error);
    return { error: `Error occurred while fetching booking status.` };
  }
};
