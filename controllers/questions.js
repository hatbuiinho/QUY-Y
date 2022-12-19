import { Step, StepQuestion, Question, Choice, Answer, UserChoice, UserQuestion } from '@/database/models/index';
import { withIronSessionSsr } from "iron-session/next";
import iron_session from 'configs/iron_session';
import UserControllers from '@/controllers/users';

const StepControllers = {
	getByStep: withIronSessionSsr(
		async function getServerSideProps({ req, params }) {
			const step_code = params.step;
			const steps = await Step.findAll({
				where: {
					"short_code": step_code
				},
				attributes: ["id", "next_step", "type"],
				raw: true,
				include: {
					model: StepQuestion,
					attributes: ["question_id", "step_id"],
					include: {
						model: Question,
						attributes: ["id", "content", "image_url", "audio_url", "video_url", "time", "score", "multiple", "media_type"],
						include: {
							model: Choice,
							attributes: ["id", "question_id", "answer_id", "is_correct"],
							include: {
								model: Answer,
								attributes: ["content", "image_url"],
							}
						}
					}
				}
			});
			const questions = {};
			const step = steps[0];

			if (!step || (step && step.type > 0 && !req.session.user.is_pass)) {
				return {
					redirect: {
						destination: '/ceremony/' + req.session.user.first_step_code,
						permanent: false,
					},
				}
			}

			console.log("step", step)
			console.log("req.session.user", req.session.user)

			steps.forEach(s => {
				if (s['StepQuestions.question_id']) {
					if (!questions[s['StepQuestions.question_id']]) {
						questions[s['StepQuestions.question_id']] = {
							id: s['StepQuestions.question_id'],
							content: s['StepQuestions.Question.content'],
							image_url: s['StepQuestions.Question.image_url'],
							audio_url: s['StepQuestions.Question.audio_url'],
							video_url: s['StepQuestions.Question.video_url'],
							time: s['StepQuestions.Question.time'],
							score: s['StepQuestions.Question.score'],
							multiple: s['StepQuestions.Question.multiple'],
							media_type: s['StepQuestions.Question.media_type'],
							step_id: s['StepQuestions.step_id'],
							answers: [],
							corrects: []
						};
					}
					questions[s['StepQuestions.question_id']].answers.push({
						id: s['StepQuestions.Question.Choices.id'],
						content: s['StepQuestions.Question.Choices.Answer.content'],
						image_url: s['StepQuestions.Question.Choices.Answer.image_url']
					});
					if (s['StepQuestions.Question.Choices.is_correct'] == true)
						questions[s['StepQuestions.question_id']].corrects.push(s['StepQuestions.Question.Choices.id'])
				}
			})

			const new_questions = Object.values(questions);

			if (new_questions.length == 0) {
				return {
					redirect: {
						destination: '/',
						permanent: false,
					},
				}
			}

			return {
				props: {
					questions: new_questions,
					step,
					first_step_code: req.session.user.first_step_code
				},
			};
		},
		iron_session,
	),

	createUserQuestions(user_id, question_id, is_correct, callback) {
		UserQuestion.findOrCreate({
			where: { user_id, question_id },
			defaults: {
				user_id, question_id, is_correct
			}
		}).then(([user, created]) => {
			if (created) {
				callback();
			} else {
				user.update({
					is_correct
				}).then(() => {
					callback();
				}).catch(err => {
					callback(err);
				});
			}
		}).catch(err => {
			callback(err);
		});
	},

	createUserChoices(req, res) {
		const choice_ids = req.body.choice_ids;
		const user_id = req.session.user.id;
		const step_id = req.body.step_id;
		const question_id = req.body.question_id;
		const p1 = new Promise((resolve, reject) => {
			Choice.findAll({
				raw: true,
				attributes: ["id"],
				where: { question_id, is_correct: true }
			}).then(choices => {
				let is_correct = true;
				if (choices && choices.length && choices.length == choice_ids.length) {
					const new_choices = choices.map(c => c.id);
					new_choices.forEach(c => {
						if (choice_ids.indexOf(c) < 0) {
							is_correct = false;
						}
					});
				} else {
					is_correct = false;
				}
				this.createUserQuestions(user_id, question_id, is_correct, (err) => {
					if (err) reject(err);
					else resolve();
				})
			}).catch(err => {
				console.log(err);
				reject(err);
			});
		});
		const p2 = new Promise((resolve, reject) => {
			const data = choice_ids.map(c => {
				return {
					user_id: user_id,
					choice_id: c,
					step_id: step_id
				}
			});
			UserChoice.bulkCreate(data).then(result => {
				resolve();
			}).catch(err => {
				console.log(err);
				reject(err);
			});
		});
		Promise.all([p1, p2]).then(async (values) => {
			const init_info = await UserControllers.initInfo(req.session.user.id);
			req.session.user.first_step_code = init_info.first_step_code;
			req.session.user.is_pass = init_info.is_pass;
			await req.session.save();
			res.status(200).json({ status: "success" });
		}).catch(err => {
			console.log(err);
			res.status(500).json({ status: "error" });
		});
	}
}

export default StepControllers;
