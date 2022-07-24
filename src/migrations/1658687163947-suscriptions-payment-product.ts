import {MigrationInterface, QueryRunner} from "typeorm";

export class suscriptionsPaymentProduct1658687163947 implements MigrationInterface {
    name = 'suscriptionsPaymentProduct1658687163947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`info\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`last_paid\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`productUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`payer_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`collector_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_41d7d340e123271fa8b873793f7\` FOREIGN KEY (\`productUuid\`) REFERENCES \`product\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_41d7d340e123271fa8b873793f7\``);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`collector_id\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`payer_id\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`productUuid\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`last_paid\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
