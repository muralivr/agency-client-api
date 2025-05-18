const { default: mongoose } = require("mongoose");

const AgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const AgencyModel = mongoose.model("Agency", AgencySchema);

module.exports = AgencyModel;
