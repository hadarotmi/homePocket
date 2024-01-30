const express = require("express");
const { ExpenseModel, validateExpense } = require("../models/expenseModel");
const router = express.Router();

// הצגת כל ההוצאות החודשיות
router.get("/", async (req, res) => {
    try {
        const data = await ExpenseModel.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הצגת הוצאה חודשית לפי ה-id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ExpenseModel.findOne({ _id: id });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הוספת הוצאה חודשית
router.post("/", async (req, res) => {
    const validBody = validateExpense(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const expense = new ExpenseModel(req.body);
    try {
        const savedExpense = await expense.save();
        res.json(savedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// עדכון הוצאה חודשית לפי ה-id
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const validBody = validateExpense(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// מחיקת הוצאה חודשית לפי ה-id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedExpense = await ExpenseModel.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ msg: "Expense not found" });
        }
        res.json(deletedExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

module.exports = router;
