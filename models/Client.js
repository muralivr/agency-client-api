const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  totalBill: { type: Number, required: true },
});

const ClientModel = mongoose.model("Client", ClientSchema);

module.exports = ClientModel;
