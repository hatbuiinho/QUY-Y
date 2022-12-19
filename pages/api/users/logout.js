import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function logoutRoute(req, res, session) {
        req.session.destroy();
        res.send({ status: "success" });
    },
    {
        cookieName: process.env.COOKIE_APP_NAME,
        password: process.env.COOKIE_PASS,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);