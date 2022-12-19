import QuestionControllers from "@/controllers/admin/questions";
import _ from "lodash";

export default function handler(req, res) {
	if (req.method === 'POST') {
		if (req.body.content == "") {
			res.status(400).json({status: "error", message: "Content can not be null"});
		} else if (req.body.time == 0) {
			res.status(400).json({status: "error", message: "Time must be greater than 0"});
		} else if (req.body.score == 0) {
			res.status(400).json({status: "error", message: "Score must be greater than 0"});
		} else {
			const id = _.get(req, 'body.id', null)
			if (id) {
				return QuestionControllers.update(req, res, {id});
			}
			return QuestionControllers.create(req, res);
		}
	} else {
		res.status(404).json({status: "success"});
	}
}