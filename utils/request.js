import _ from 'lodash';
const request = {
	saveRequest(url, body, method, option = {}) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(body),
			}).then((response) => response.json()).then((data) => {
				if(_.get(option, 'isNotCheck')) {
					resolve(data);
				}
				if (data && data.status && data.status == "success") {
					resolve(data);
				} else {
					reject(data.message);
				}
			}).catch((error) => {
				console.error(error);
				reject(error.message);
			});
		});
	},
	put(url, data) {
		return this.saveRequest(url, data, "PUT");
	},
	post(url, data, option = {}) {
		return this.saveRequest(url, data, "POST", option);
	},
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}).then((response) => response.json()).then((data) => {
				console.log("data", data);
				if (data && data.status && data.status == "success") {
					resolve(data);
				} else {
					reject(data.message);
				}
			}).catch((error) => {
				console.error(error);
				reject(error.message);
			});
		});
	},
}

export default request;
