const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const subventions = await prisma.subvension.findMany();

  res.json(subventions);
});

router.post("/", async (req, res) => {
  const { montant } = req.body;

  const subvention = await prisma.subvension.create({
    data: { montant: montant },
  });

  res.json(subvention);
});

module.exports = router;
