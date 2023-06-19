const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCreances = async () => {
  const cos = await prisma.compte.aggregate({
    _sum: { creances_prets: true },
  });

  const fournisseurs = await prisma.compte.aggregate({
    _sum: { creances_em: true },
  });

  const creances =
    (cos._sum.creances_prets || 0) + (fournisseurs._sum.creances_em || 0);

  return creances;
};

const getDettes = async () => {
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

  return dettes;
};

// solde = subvensions + rss - dons - prets
const getSolde = async () => {
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

  return solde;
};

module.exports = { getCreances, getDettes, getSolde };
