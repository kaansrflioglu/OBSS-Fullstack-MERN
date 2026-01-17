const Parent = require("../models/Parent");

exports.createParent = async (req, res, next) => {
  try {
    const parent = await Parent.create(req.body);
    res.status(201).json(parent);
  } catch (err) {
    next(err);
  }
};

exports.getParents = async (req, res, next) => {
  try {
    const parents = await Parent.find().populate("sportsBackground");
    res.json(parents);
  } catch (err) {
    next(err);
  }
};

exports.updateParent = async (req, res, next) => {
  try {
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(parent);
  } catch (err) {
    next(err);
  }
};

exports.deleteParent = async (req, res, next) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent deleted" });
  } catch (err) {
    next(err);
  }
};