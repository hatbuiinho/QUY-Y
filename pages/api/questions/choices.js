import QuestionControllers from "@/controllers/questions";
import { withIronSessionApiRoute } from "iron-session/next";
import iron_session from "configs/iron_session";

export default withIronSessionApiRoute(
    function choicesRoute(req, res) {
        if (req.method === 'POST') {
            if (req.body && req.body.question_id && req.body.step_id && req.body.choice_ids) {
                QuestionControllers.createUserChoices(req, res);
            } else {
                res.status(400).json({status: "fail", message: "Answers can not be null"});
            }
        } else {
            res.status(404).json({status: "fail"});
        }
    },
    iron_session
);