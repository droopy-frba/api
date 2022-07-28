import {MigrationInterface, QueryRunner} from "typeorm";

export class paymentSuscriptionRelation1658936821001 implements MigrationInterface {
    name = 'paymentSuscriptionRelation1658936821001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_6cd0adcc782494a7c4ae9c58ddf\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`suscriptionUuid\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`paymentUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD UNIQUE INDEX \`IDX_95c425dd8d8cc3feb0c1dfc14b\` (\`paymentUuid\`)`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` CHANGE \`last_paid\` \`last_paid\` datetime NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_95c425dd8d8cc3feb0c1dfc14b\` ON \`suscription\` (\`paymentUuid\`)`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_95c425dd8d8cc3feb0c1dfc14bb\` FOREIGN KEY (\`paymentUuid\`) REFERENCES \`payment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_95c425dd8d8cc3feb0c1dfc14bb\``);
        await queryRunner.query(`DROP INDEX \`REL_95c425dd8d8cc3feb0c1dfc14b\` ON \`suscription\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` CHANGE \`last_paid\` \`last_paid\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP INDEX \`IDX_95c425dd8d8cc3feb0c1dfc14b\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`paymentUuid\``);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`suscriptionUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_6cd0adcc782494a7c4ae9c58ddf\` FOREIGN KEY (\`suscriptionUuid\`) REFERENCES \`suscription\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
