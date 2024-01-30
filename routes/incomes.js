const express = require("express");
const { IncomeModel, validateIncome } = require("../models/incomeModel");
const router = express.Router();

// הצגת כל ההכנסות החודשיות
router.get("/", async (req, res) => {
    try {
        const data = await IncomeModel.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הצגת הכנסה חודשית לפי ה-id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await IncomeModel.findOne({ _id: id });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// הוספת הכנסה חודשית
router.post("/", async (req, res) => {
    const validBody = validateIncome(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    
    const income = new IncomeModel(req.body);
    try {
        const savedIncome = await income.save();
        res.json(savedIncome);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// עדכון הכנסה חודשית לפי ה-id
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const validBody = validateIncome(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        const updatedIncome = await IncomeModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedIncome);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

// מחיקת הכנסה חודשית לפי ה-id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedIncome = await IncomeModel.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ msg: "Income not found" });
        }
        res.json(deletedIncome);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred", err });
    }
});

module.exports = router;
