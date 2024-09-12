import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
    const { userToken } = req.cookies;
    console.log(req.cookies)

    console.log("UserToken : ",userToken)

    if (!userToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access: No token provided"
        });
    }

    try {
        const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({
            success: false,
            message: "Unauthorized access: Token expired or invalid"
        });
    }
};
