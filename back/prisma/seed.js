const { PrismaClient } = require("@prisma/client");
const { salaries } = require("./seeds/salaires");
const { comptes } = require("./seeds/comptes");
const { prets } = require("./seeds/prets");
const { dons } = require("./seeds/dons");
const { rss } = require("./seeds/rss");
const { fournisseurs } = require("./seeds/fournisseurs");
const { comptesFournisseurs } = require("./seeds/comptes_fournisseurs");
const { achats } = require("./seeds/achats");
const { recuperations } = require("./seeds/recuperations");
const { subvensions } = require("./seeds/subvensions");

const prisma = new PrismaClient();

async function main() {
  for (const salarie of salaries) {
    await prisma.salarie.create({ data: salarie });
  }

  for (const compte of comptes) {
    await prisma.compte.create({ data: compte });
  }

  for (const pret of prets) {
    await prisma.pret.create({ data: pret });
  }

  for (const don of dons) {
    await prisma.don.create({ data: don });
  }

  for (const rs of rss) {
    await prisma.rSS.create({ data: rs });
  }

  for (const fournisseur of fournisseurs) {
    await prisma.fournisseur.create({ data: fournisseur });
  }

  for (const compte of comptesFournisseurs) {
    await prisma.compteFournisseur.create({ data: compte });
  }

  for (const achat of achats) {
    await prisma.achat.create({ data: achat });
  }

  for (const recuperation of recuperations) {
    await prisma.recuperation.create({ data: recuperation });
  }

  for (const subvension of subvensions) {
    await prisma.subvension.create({ data: subvension });
  }
}

main()
  .catch(async (e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
