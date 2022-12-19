const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mssql'
});

const User = require('./user')(Sequelize, sequelize);
const Answer = require('./answer')(Sequelize, sequelize);
const Choice = require('./choice')(Sequelize, sequelize);
const Question = require('./question')(Sequelize, sequelize);
const StepQuestion = require('./step_question')(Sequelize, sequelize);
const Step = require('./step')(Sequelize, sequelize);
const UserChoice = require('./user_choice')(Sequelize, sequelize);
const UserQuestion = require('./user_question')(Sequelize, sequelize);

// const Province = require('./province')(Sequelize, sequelize);
// const District = require('./district')(Sequelize, sequelize);
// const Ward = require('./ward')(Sequelize, sequelize);

User.hasMany(UserChoice, { foreignKey: 'user_id' });
UserChoice.belongsTo(User, { foreignKey: 'user_id' });

Choice.hasMany(UserChoice, { foreignKey: 'choice_id' });
UserChoice.belongsTo(Choice, { foreignKey: 'choice_id' });

Step.hasMany(UserChoice, { foreignKey: 'step_id' });
UserChoice.belongsTo(Step, { foreignKey: 'step_id' });

Question.hasMany(Choice, { foreignKey: 'question_id' });
Choice.belongsTo(Question, { foreignKey: 'question_id' });

Answer.hasMany(Choice, { foreignKey: 'answer_id' });
Choice.belongsTo(Answer, { foreignKey: 'answer_id' });

Question.hasMany(StepQuestion, { foreignKey: 'question_id' });
StepQuestion.belongsTo(Question, { foreignKey: 'question_id' });

Step.hasMany(StepQuestion, { foreignKey: 'step_id' });
StepQuestion.belongsTo(Step, { foreignKey: 'step_id' });

User.hasMany(UserQuestion, { foreignKey: 'user_id' });
UserQuestion.belongsTo(User, { foreignKey: 'user_id' });
Question.hasMany(UserQuestion, { foreignKey: 'question_id' });
UserQuestion.belongsTo(Question, { foreignKey: 'question_id' });

// Province.hasMany(District, { foreignKey: 'IDTinh' });
// District.belongsTo(Province, { foreignKey: 'IDTinh' });

// District.hasMany(Ward, { foreignKey: 'IDHuyen' });
// Ward.belongsTo(District, { foreignKey: 'IDHuyen' });

module.exports = {
	sequelize,
	User,
	Answer,
	Choice,
	Question,
	StepQuestion,
	Step,
	UserChoice,
	UserQuestion
	// Province,
	// District,
	// Ward
};
