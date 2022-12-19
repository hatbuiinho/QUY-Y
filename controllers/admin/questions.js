import { Question, Choice, Answer } from '@/database/models/index';
import { v4 as uuidv4 } from 'uuid';

const QuestionControllers = {
	async getAll() {
		const questions = await Question.findAll({
			raw: true,
			include: {
				model: Choice,
				attributes: ["question_id", "answer_id", "is_correct"],
				include: {
					model: Answer,
					attributes: ["id", "content", "image_url"],
				}
			 }
		});
		const questionsObject = {};
		questions.forEach((q) => {
			if (!questionsObject[q.id]) {
				questionsObject[q.id] = {
					id: q.id,
					content: q.content,
					image_url: q.image_url,
					video_url: q.video_url,
					audio_url: q.audio_url,
					media_type: q.media_type,
					time: q.time,
					score: q.score,
					multiple: q.multiple,
					created_at: q.created_at.toDateString(),
					updated_at: q.updated_at.toDateString(),
				};
				questionsObject[q.id].answers = [];
			}

			if (q['Choices.question_id']) {
				questionsObject[q['Choices.question_id']].answers.push({
					is_correct: q['Choices.is_correct'],
					id: q['Choices.Answer.id'],
					content: q['Choices.Answer.content'],
					image_url: q['Choices.Answer.image_url'],
				})
			}
		});

		const new_questions = Object.values(questionsObject);
		return {
			props: { questions: new_questions }
		};
	},

	create(req, res) {
		Question.create(req.body).then((question)=>{
			console.log(question);
			res.status(200).json({status: "success", data: question});
		}).catch((err) => {
			console.log(err);
			res.status(500).json({status: "error"});
		});
	},

	update(req, res, {id}) {
		Question.update({...req.body}, {
			where: {id},
		}).then((question)=>{
			console.log(question);
			res.status(200).json({status: "success", data: question});
		}).catch((err) => {
			console.log(err);
			res.status(500).json({status: "error"});
		});
	},

	createAnswers(req, res) {
		const answers = [];
		const choices = [];
		req.body.answers.forEach((answer) => {
			if (!answer.id) {
				const answer_id = uuidv4();
				choices.push({
					question_id: req.query.questionId,
					answer_id: answer_id,
					is_correct: answer.is_correct
				})
				const answer_data = {
					id: answer_id,
					content: answer.content
				}
				if (answer.image_url && answer.image_url !== "")
					answer_data.image_url = answer.image_url;
				answers.push(answer_data);
			}
		});
		Answer.bulkCreate(answers).then((results) => {
			Choice.bulkCreate(choices).then((results) => {
				res.status(200).json({status: "success", data: results});
			}).catch((error) => {
				res.status(500).json({status: "error"});
				console.log(error);
			});
		}).catch((error) => {
			res.status(500).json({status: "error"});
			console.log(error);
		});
	}
}

export default QuestionControllers;
