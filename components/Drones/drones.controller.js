// controllers/dronesController.js
const { GenerateData } = require("../../utils/socketUtils");

exports.getDrones = (req, res) => {
  const data = GenerateData();
  res.json(data);
};
