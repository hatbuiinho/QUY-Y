import QuestionControllers from "@/controllers/admin/questions";

export default function handler(req, res) {
	if (req.method === 'PUT') {
		if (req.body && req.body.answers) {
			QuestionControllers.createAnswers(req, res);
		} else {
			res.status(400).json({status: "error", message: "Answers can not be null"});
		}
	} else {
		res.status(404).json({status: "success"});
	}
}