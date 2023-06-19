const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/cos", async (req, res) => {
  const salaries = await prisma.compte.findMany({
    select: {
      auxiliaire: true,
      salarie: {
        select: {
          nom: true,
          prenom: true,
        },
      },
      //   dettes_don: true,
    },
  });

  res.json(salaries);
});

module.exports = router;
