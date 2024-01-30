const express = require("express");
const { BudgetModel, validateBudget } = require("../models/budgetModel");
const router = express.Router();

// הצגת כל תקציב הוצאות
router.get("/", async (req, res) => {
    try {
        const data = await BudgetModel.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הצגת תקציב הוצאות לפי ה-id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await BudgetModel.findOne({ _id: id });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הוספת תקציב הוצאות
router.post("/", async (req, res) => {
    const validBody = validateBudget(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const budget = new BudgetModel(req.body);
    try {
        const savedBudget = await budget.save();
        res.json(savedBudget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// עדכון תקציב הוצאות לפי ה-id
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const validBody = validateBudget(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        const updatedBudget = await BudgetModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBudget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

//עדכון מודעה של משתמש
router.put("/:idEdit", authToken, async (req, res) => {
    let idAd = req.params.idEdit;
    let validBody = validAd(req.body)
    if (validBody.error) {
        return res.status(404).json(validBody.error.details)
    }
    try {
        let data = await AdModel.updateOne({ _id: idAd }, req.body)
        if (data.matchedCount == 0) {
            return res.status(401).json({ msg: "This ad is not found in your ads" })
        }
        res.json(data)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)

    }
})

// מחיקת תקציב הוצאות לפי ה-id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBudget = await BudgetModel.findByIdAndDelete(id);
        if (!deletedBudget) {
            return res.status(404).json({ msg: "Budget not found" });
        }
        res.json(deletedBudget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

module.exports = router;
