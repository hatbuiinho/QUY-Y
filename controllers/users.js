import { User, UserQuestion, Choice, Question, Step, StepQuestion } from '@/database/models/index';
import { withIronSessionSsr } from "iron-session/next";
import iron_session from 'configs/iron_session';

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const UserControllers = {
	getUserInfo: withIronSessionSsr(
		async function getServerSideProps({ req }) {
			return {
				props: {
					user: req.session.user ? req.session.user : null,
				},
			};
		},
		iron_session,
	),
	async findOne({ phone, id_card }) {
		return User.findOne({
			raw: true,
			where: { phone, id_card }
		});
	},
	async create(user) {
		return User.create(user);
	},
	async initInfo(user_id) {
		const steps = await Step.findAll({
			raw: true,
			where: { type: 0 },
			attributes: ["short_code", "id"],
			include: {
				model: StepQuestion,
				attributes: ["question_id"],
				include: {
					model: Question,
					attributes: ["score"],
				}
			}
		});
		const question_ids = steps.map(q => q['StepQuestions.Question.id']);
		const question_scores = steps.map(q => q['StepQuestions.Question.score']);
		const user_questions = await UserQuestion.findAll({
			raw: true,
			where: { user_id: user_id, question_id: question_ids, is_correct: true },
			attributes: ["question_id", "is_correct"],
			include: {
				model: Question,
				attributes: ["id", "score"],
			}
		});
		const user_scores = user_questions.map(u => u['Question.score']);
		const user_sum = user_scores.reduce((partialSum, a) => partialSum + a, 0);
		const total_score = question_scores.reduce((partialSum, a) => partialSum + a, 0);
		return {
			first_step_code: steps[0].short_code,
			is_pass: user_sum/total_score >= 0.7
		}
	},
	async login(req, res) {
		const { login_phone, login_id_card } = req.body;
		const user = await User.findOne({
			where: { phone: login_phone, id_card: login_id_card }
		});

		if (_.isEmpty(user) || (!_.isEmpty(user) && !_.isEmpty(user.hash) && !bcrypt.compareSync(login_id_card, user.hash))) {
			res.status(401).json({
				status: 'fail',
				message: 'Info is incorrect'
			});
		} else {
			if (_.isEmpty(user.hash)) {
				const hash = bcrypt.hashSync(login_id_card, 10);
				await user.update({hash});
			}
			// create a jwt token that is valid for 7 days
			const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
			const init_info = await this.initInfo(user.id);
			const data = {
				id: user.id,
				full_name: user.full_name,
				phone: user.phone,
				phap_danh: user.buddha_name,
				first_step_code: init_info.first_step_code,
				is_pass: init_info.is_pass
			};
			req.session.user = data;
			req.session.token = token;
			await req.session.save();
			res.status(200).json({
				status: 'success', data
			});
		}
	}
}

export default UserControllers;
