const express = require("express");
const {
  createAgencyAndClients,
  updateClient,
  getTopClients,
} = require("../controllers/agencyClientController");
const router = express.Router();

router.post("/create", createAgencyAndClients);
router.put("/client/:id", updateClient);
router.get("/top-client", getTopClients);

module.exports = router;
