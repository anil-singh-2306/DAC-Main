exports.setCommonHeaders = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    await next();
  } catch (err) {
    next(err);
  }
};