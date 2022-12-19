import { Step, StepQuestion, Question, UserChoice } from '@/database/models/index';
import { withIronSessionSsr } from "iron-session/next";
import iron_session from 'configs/iron_session';

const StepControllers = {
	getByShortCode: withIronSessionSsr(
		async function getServerSideProps({ req, params }) {
			const step_code = params.step;
			const steps = await Step.findAll({
				where: {
					"short_code": step_code
				},
				attributes: ["id", "name", "short_code", "content", "image_url", "audio_url", "video_url", "next_step", "type"],
				raw: true,
				include: {
					model: StepQuestion,
					attributes: ["question_id", "step_id"]
				}
			});
			const stepObject = {};
			steps.forEach((s) => {
				if (!stepObject[s.id]) {
					stepObject[s.id] = {
						id: s.id,
						name: s.name,
						short_code: s.short_code,
						content: s.content,
						image_url: s.image_url,
						video_url: s.video_url,
						audio_url: s.audio_url,
						next_step: s.next_step,
						type: s.type
					};
					stepObject[s.id].questions = [];
				}

				if (s['StepQuestions.step_id']) {
					stepObject[s['StepQuestions.step_id']].questions.push(s['StepQuestions.question_id'])
				}
			});
			const new_steps = Object.values(stepObject);
			let step = null;
			if (new_steps[0]) step = {...new_steps[0]};

			if (!step || (step && step.type > 0 && !req.session.user.is_pass)) {
				return {
					redirect: {
						destination: '/ceremony/'+req.session.user.first_step_code,
						permanent: false,
					},
				}
			}

			return {
				props: { step, first_step_code: req.session.user.first_step_code }
			};
		},
		iron_session,
	),
}

export default StepControllers;
