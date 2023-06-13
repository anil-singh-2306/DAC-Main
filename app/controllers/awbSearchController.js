const service = require('../services/awbSearchService');

exports.getAwbStatus = async (req, res, next) => {
    try {
        const session = req.session.userSession;
        const result = await service.getAwbStatus(req, req.params.id, session);
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