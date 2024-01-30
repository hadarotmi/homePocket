const mongoose = require("mongoose")
const Joi = require("joi")

const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    clothingAndFootwear: { type: Number, min: 0 },
    foodAndDrinks: { type: Number, min: 0 },
    maintenanceAndRepairs: { type: Number, min: 0 },
    transportation: { type: Number, min: 0 },
    health: { type: Number, min: 0 },
    entertainmentAndSafety: { type: Number, min: 0 },
    education: { type: Number, min: 0 },
    communication: { type: Number, min: 0 },
    finances: { type: Number, min: 0 },
    vacations: { type: Number, min: 0 },
});

exports.BudgetModel = mongoose.model("budgets", budgetSchema);

exports.validateBudget = (_bodyData) => {
    const joiSchema = Joi.object({
        userId: Joi.string().required(),
        clothingAndFootwear: Joi.number().min(0),
        foodAndDrinks: Joi.number().min(0),
        maintenanceAndRepairs: Joi.number().min(0),
        transportation: Joi.number().min(0),
        health: Joi.number().min(0),
        entertainmentAndSafety: Joi.number().min(0),
        education: Joi.number().min(0),
        communication: Joi.number().min(0),
        finances: Joi.number().min(0),
        vacations: Joi.number().min(0),
    });
    return joiSchema.validate(_bodyData);
};