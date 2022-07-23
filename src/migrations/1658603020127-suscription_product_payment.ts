import {MigrationInterface, QueryRunner} from "typeorm";

export class suscriptionProductPayment1658603020127 implements MigrationInterface {
    name = 'suscriptionProductPayment1658603020127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_cc37eedb50538bfd3a6b4c3c3c5\``);
        await queryRunner.query(`CREATE TABLE \`company\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`info\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`companyUuid\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`identifier\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationToken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`activation_status\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`identifier\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationToken\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationTokenExpiration\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activation_status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`companyUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationCode\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationCodeExpiration\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email_verified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`last_paid\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD \`productUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`card_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`payer_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`collector_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`payment_method_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_cc37eedb50538bfd3a6b4c3c3c5\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`company\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_41d7d340e123271fa8b873793f7\` FOREIGN KEY (\`productUuid\`) REFERENCES \`product\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_cc37eedb50538bfd3a6b4c3c3c5\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`company\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_cc37eedb50538bfd3a6b4c3c3c5\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_41d7d340e123271fa8b873793f7\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_cc37eedb50538bfd3a6b4c3c3c5\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`payment_method_id\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`collector_id\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`payer_id\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`card_id\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`productUuid\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP COLUMN \`last_paid\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email_verified\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationCodeExpiration\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationCode\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`companyUuid\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`activation_status\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationTokenExpiration\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationToken\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`identifier\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`activation_status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationToken\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`identifier\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`companyUuid\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_cc37eedb50538bfd3a6b4c3c3c5\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
