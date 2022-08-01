import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentSuscriptionStatus1659384128639 implements MigrationInterface {
    name = 'paymentSuscriptionStatus1659384128639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`status\` int NOT NULL`);
    }

}
