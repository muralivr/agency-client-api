const Agency = require("../models/Agency");
const Client = require("../models/Client");
const { createAgencyAndClientsValidation, updateClientValidation } = require("../validator/agencyClientValidator");

// Create Agency and Clients
exports.createAgencyAndClients = async (req, res) => {
  const { error } = createAgencyAndClientsValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { agency, clients } = req.body;

  try {
    const newAgency = await Agency.create(agency);
    const clientPromises = clients.map((client) => ({
      ...client,
      agencyId: newAgency._id,
    }));
    await Client.insertMany(clientPromises);

    res
      .status(201)
      .json({ message: "Agency and Clients created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Client
exports.updateClient = async (req, res) => {
  const { error } = updateClientValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const { name, email, phoneNumber, totalBill } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, totalBill },
      { new: true }
    );

    if (!updatedClient)
      return res.status(404).json({ message: "Client not found" });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Top Clients
exports.getTopClients = async (req, res) => {
  try {
    const topClient = await Client.find()
      .sort({ totalBill: -1 })
      .limit(1)
      .populate("agencyId", "name");

    const response = topClient.map((client) => ({
      agencyName: client.agencyId.name,
      clientName: client.name,
      totalBill: client.totalBill,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
