
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
	async function loginRoute(req, res) {
		// get user from database then:
		if (req.body.username && req.body.password && req.body.username == process.env.TMP_ADMIN_USER && req.body.password == process.env.TMP_ADMIN_PASS) {
			req.session.user = {
				id: 230,
				admin: true,
			};
			await req.session.save();
			res.status(200);
			res.json({ status: "success" });
		} else {
			res.status(401);
			res.json({ status: "fail" });
		}
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