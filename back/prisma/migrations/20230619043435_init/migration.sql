-- CreateTable
CREATE TABLE `Fournisseur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompteFournisseur` (
    `auxiliaire` INTEGER NOT NULL AUTO_INCREMENT,
    `fournisseurId` INTEGER NOT NULL,
    `dettes` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `CompteFournisseur_fournisseurId_key`(`fournisseurId`),
    PRIMARY KEY (`auxiliaire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,
    `compteSalarie` INTEGER NOT NULL,
    `compteFournisseur` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recuperation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,
    `achatId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salarie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compte` (
    `auxiliaire` INTEGER NOT NULL AUTO_INCREMENT,
    `salarieId` INTEGER NOT NULL,
    `creances_prets` DOUBLE NOT NULL DEFAULT 0,
    `creances_em` DOUBLE NOT NULL DEFAULT 0,
    `dettes_prets` DOUBLE NOT NULL DEFAULT 0,
    `dettes_don` DOUBLE NOT NULL DEFAULT 0,
    `dettes_em` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `Compte_salarieId_key`(`salarieId`),
    PRIMARY KEY (`auxiliaire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subvension` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pret` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,
    `compteSalarie` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Don` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,
    `compteSalarie` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RSS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL DEFAULT 0,
    `compteSalarie` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CompteFournisseur` ADD CONSTRAINT `CompteFournisseur_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `Fournisseur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Achat` ADD CONSTRAINT `Achat_compteSalarie_fkey` FOREIGN KEY (`compteSalarie`) REFERENCES `Compte`(`auxiliaire`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Achat` ADD CONSTRAINT `Achat_compteFournisseur_fkey` FOREIGN KEY (`compteFournisseur`) REFERENCES `CompteFournisseur`(`auxiliaire`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recuperation` ADD CONSTRAINT `Recuperation_achatId_fkey` FOREIGN KEY (`achatId`) REFERENCES `Achat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compte` ADD CONSTRAINT `Compte_salarieId_fkey` FOREIGN KEY (`salarieId`) REFERENCES `Salarie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pret` ADD CONSTRAINT `Pret_compteSalarie_fkey` FOREIGN KEY (`compteSalarie`) REFERENCES `Compte`(`auxiliaire`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Don` ADD CONSTRAINT `Don_compteSalarie_fkey` FOREIGN KEY (`compteSalarie`) REFERENCES `Compte`(`auxiliaire`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RSS` ADD CONSTRAINT `RSS_compteSalarie_fkey` FOREIGN KEY (`compteSalarie`) REFERENCES `Compte`(`auxiliaire`) ON DELETE RESTRICT ON UPDATE CASCADE;
