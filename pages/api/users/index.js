import { apiHandler, omit } from 'helpers/api';

export default apiHandler({
    get: getUsers
});

function getUsers(req, res) {
    // check pass authen
    const data = {
        status: 'success', data: [{
            name: 'Hữa Minh Đạt',
            age: 45,
        },
        {
            name: 'Trần Thanh Tâm',
            age: 45,
        }
        ]
    }
    return res.status(200).json(data);
}
