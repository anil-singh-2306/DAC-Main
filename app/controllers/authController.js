const service = require('../services/authService');

exports.login = async (req, res, next) => {
    try {
        const { client_id, email, password } = req.body;

        const user = await service.authenticate(client_id, email, password, res);
        const accessToken = await service.generateAccessToken(user);
        const refreshToken = await service.generateRefreshToken(user);

        req.session.userSession = { 
            accessToken: accessToken,
            clientId: user.company_id, 
            email: user.email,
            userId: user.id,
            rollId: user.role_id,
            isLoggedIn: true,
            officeId: user.office_id
        };
        req.session.save();
        //res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json({
            accessToken: accessToken,
            id: user.id,
            firstname:user.first_name,
            lastname:user.last_name,
            email:user.email,
            role: user.role_name,
            img:user.profile_picture,
            brandlogo:user.logo,
            brandname:user.name
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

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const user = await service.refreshToken(refreshToken);
        const accessToken = service.generateAccessToken(user);
        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        const message = err.message || 'Unable to verify';
        res.status(400).json({
            success: false,
            message: message
        });
    }
};

exports.logout = async (req, res, next) => {
    res.clearCookie('refreshToken');
    res.send('Logged out');
};

exports.changePassword = async (req, res, next) => {
    try {
        const result = await service.changePassword(req);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Password updated successfully'
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



