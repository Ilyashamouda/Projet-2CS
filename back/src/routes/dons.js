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
      dettes_don: true,
    },
  });

  res.json(salaries);
});

router.post("/cos", async (req, res) => {
  const list = req.body;

  for (const item of list) {
    if (item.checkValue) {
      const updateDettes = await prisma.compte.update({
        where: {
          auxiliaire: parseInt(item.compteId),
        },
        data: {
          dettes_don: {
            increment: parseInt(item.montant),
          },
        },
      });
    }
  }
});

router.get("/esi", async (req, res) => {
  const salaries = await prisma.compte.findMany({
    where: {
      dettes_don: {
        gt: 0,
      },
    },
    select: {
      auxiliaire: true,
      salarie: {
        select: {
          nom: true,
          prenom: true,
        },
      },
      dettes_don: true,
    },
  });

  res.json(salaries);
});

router.post("/esi", async (req, res) => {
  const list = req.body;

  for (const item of list) {
    if (item.checkValue) {
      const updateDettes = await prisma.compte.update({
        where: {
          auxiliaire: parseInt(item.compteId),
        },
        data: {
          dettes_don: {
            decrement: parseInt(item.montant),
          },
        },
      });

      const don = await prisma.don.create({
        data: {
          compteSalarie: parseInt(item.compteId),
          montant: parseInt(item.montant),
        },
      });
    }
  }
});

module.exports = router;
