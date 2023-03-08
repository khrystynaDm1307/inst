export function authMiddleware(req, res, next) {
    const access_token = req.headers.authorization?.split("Bearer ")[1];

    if (!access_token) return res.status(403).end()
    req.access_token = access_token;
    return next()
}