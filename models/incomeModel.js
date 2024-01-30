const mongoose = require("mongoose")
const Joi = require("joi")

const incomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    salary: { type: Number, min: 0 },
    additionalIncome: { type: Number, min: 0 },
});

exports.IncomeModel = mongoose.model("incomes", incomeSchema);

exports.validateIncome = (_bodyData) => {
    const joiSchema = Joi.object({
        userId: Joi.string().required(),
        salary: Joi.number().min(0),
        additionalIncome: Joi.number().min(0),
    });
    return joiSchema.validate(_bodyData);
};