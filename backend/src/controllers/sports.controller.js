const Sports = require("../models/Sports");

exports.createSport = async (req, res, next) => {
  try {
    const sport = await Sports.create(req.body);
    res.status(201).json(sport);
  } catch (err) {
    next(err);
  }
};

exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sports.find();
    res.json(sports);
  } catch (err) {
    next(err);
  }
};

exports.updateSport = async (req, res, next) => {
  try {
    const sport = await Sports.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(sport);
  } catch (err) {
    next(err);
  }
};

exports.deleteSport = async (req, res, next) => {
  try {
    await Sports.findByIdAndDelete(req.params.id);
    res.json({ message: "Sport deleted" });
  } catch (err) {
    next(err);
  }
};