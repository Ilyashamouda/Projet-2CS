const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const salaries = await prisma.compte.findMany({
    select: {
      auxiliaire: true,
      salarie: {
        select: {
          nom: true,
          prenom: true,
        },
      },
      creances_prets: true,
    },
    where: {
      creances_prets: {
        gt: 0,
      },
    },
  });

  res.json(salaries);
});

router.post("/", async (req, res) => {
  const list = req.body;

  for (const item of list) {
    if (item.checkValue) {
      const updateDettes = await prisma.compte.update({
        where: {
          auxiliaire: parseInt(item.compteId),
        },
        data: {
          creances_prets: {
            decrement: parseInt(item.montant),
          },
        },
      });

      const rss = await prisma.rSS.create({
        data: {
          compteSalarie: parseInt(item.compteId),
          montant: parseInt(item.montant),
        },
      });
    }
  }
});

module.exports = router;
