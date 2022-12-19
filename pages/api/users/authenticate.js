import { withIronSessionApiRoute } from "iron-session/next";
import iron_session from 'configs/iron_session';

import UserControllers from 'controllers/users';
// import { apiHandler } from 'helpers/api';

// export default apiHandler({
//     post: authenticate
// });

export default withIronSessionApiRoute(
	async function authenticate(req, res) {
		const { login_phone, login_id_card } = req.body;
		if (login_phone && login_id_card)
			UserControllers.login(req, res)
		else
			res.status(400).json({status: "fail", message: "Phone and ID can not be null"});
	},
	iron_session
);
