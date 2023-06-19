const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const getCreances = async () => {
  const prisma = new PrismaClient();

  const cos = await prisma.compte.aggregate({
    _sum: { creances_prets: true },
  });

  const fournisseurs = await prisma.compte.aggregate({
    _sum: { creances_em: true },
  });

  const creances =
    (cos._sum.creances_prets || 0) + (fournisseurs._sum.creances_em || 0);

  await prisma.$disconnect();

  return creances;
};

const getDettes = async () => {
  const prisma = new PrismaClient();

  const dettesDon = await prisma.compte.aggregate({
    _sum: { dettes_don: true },
  });

  const dettesPret = await prisma.compte.aggregate({
    _sum: { dettes_prets: true },
  });

  const dettesEm = await prisma.compte.aggregate({
    _sum: { dettes_em: true },
  });

  const dettes =
    (dettesDon._sum.dettes_don || 0) +
    (dettesPret._sum.dettes_prets || 0) +
    (dettesEm._sum.dettes_em || 0);

  await prisma.$disconnect();

  return dettes;
};

// solde = subvensions + rss - dons - prets
const getSolde = async () => {
  const prisma = new PrismaClient();

  const subvensions = await prisma.subvension.aggregate({
    _sum: { montant: true },
  });

  const rss = await prisma.rSS.aggregate({
    _sum: { montant: true },
  });

  const dons = await prisma.don.aggregate({
    _sum: { montant: true },
  });

  const prets = await prisma.don.aggregate({
    _sum: { montant: true },
  });

  const solde =
    (subvensions._sum.montant || 0) +
    (rss._sum.montant || 0) -
    (dons._sum.montant || 0) -
    (prets._sum.montant || 0);

  await prisma.$disconnect();

  return solde;
};

// Define your routes
router.get("/", async (req, res) => {
  const creances = await getCreances();
  const dettes = await getDettes();
  const solde = await getSolde();

  console.log("here");

  res.json({ creances, dettes, solde });
});

module.exports = router;
