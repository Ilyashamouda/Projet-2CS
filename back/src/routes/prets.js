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
          dettes_prets: {
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
      dettes_prets: {
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
      dettes_prets: true,
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
          dettes_prets: {
            decrement: parseInt(item.montant),
          },
          creances_prets: {
            increment: parseInt(item.montant),
          },
        },
      });

      const pret = await prisma.pret.create({
        data: {
          compteSalarie: parseInt(item.compteId),
          montant: parseInt(item.montant),
        },
      });
    }
  }
});

module.exports = router;
