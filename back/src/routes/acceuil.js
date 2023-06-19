const router = require("express").Router();
const { getCreances, getDettes, getSolde } = require("../utils/acceuil");

// Define your routes
router.get("/", async (req, res) => {
  const creances = await getCreances();
  const dettes = await getDettes();
  const solde = await getSolde();

  res.json({ creances, dettes, solde });
});

module.exports = router;
