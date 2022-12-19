const bcrypt = require('bcryptjs');
const _ = require('lodash');

import UserControllers from 'controllers/users';

export default register;

async function register(req, res) {
    const { phone, id_card } = req.body;
    // console.log({body: req.body})
    const user = await UserControllers.findOne({ phone, id_card });
    if (!_.isEmpty(user)) {
        throw `${user.phone} already exists`;
    }
    // hash CCCD
    const hash = bcrypt.hashSync(id_card, 10);
    const newUser = {hash, ...req.body};
    return UserControllers.create(newUser).then((_user)=>{
        console.log(_user);
        return res.status(200).json({status: "success", data: _user});
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({status: "error"});
    });
}
