export default {
    cookieName: process.env.COOKIE_APP_NAME,
    password: process.env.COOKIE_PASS,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}