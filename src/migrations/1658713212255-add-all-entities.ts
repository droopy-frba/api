import {MigrationInterface, QueryRunner} from "typeorm";

export class addAllEntities1658713212255 implements MigrationInterface {
    name = 'addAllEntities1658713212255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`consumer\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`userUuid\` varchar(36) NULL, \`companyUuid\` varchar(36) NULL, UNIQUE INDEX \`REL_6fb7f1551d40dd0103591a932e\` (\`userUuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`filmmaker\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`phone_brand\` varchar(255) NOT NULL, \`phone_model\` varchar(255) NOT NULL, \`review\` int NOT NULL, \`userUuid\` varchar(36) NULL, UNIQUE INDEX \`REL_37b40d589e8b585b5d03353071\` (\`userUuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`verificationCode\` int NOT NULL, \`verificationCodeExpiration\` datetime NOT NULL, \`email_verified\` tinyint NOT NULL DEFAULT 0, \`role\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_search\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`phone_model\` varchar(255) NOT NULL, \`review\` int NOT NULL, \`expirationDate\` timestamp NOT NULL, \`consumerUuid\` varchar(36) NULL, \`locationLatitude\` varchar(255) NOT NULL, \`locationLongitude\` varchar(255) NOT NULL, \`locationDescription\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_postulation\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`status\` int NOT NULL, \`stream\` varchar(255) NOT NULL, \`chat\` varchar(255) NOT NULL, \`filmmakerUuid\` varchar(36) NULL, \`filmSearchUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_message\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`message\` varchar(255) NOT NULL, \`filmPostulationUuid\` varchar(36) NULL, \`userUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`filmmaker_review\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`comment\` varchar(255) NOT NULL, \`review\` int NOT NULL, \`filmmakerUuid\` varchar(36) NULL, \`filmSearchUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`info\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suscription\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`hours\` int NOT NULL, \`available_hours\` int NOT NULL, \`status\` int NOT NULL, \`last_paid\` datetime NOT NULL, \`productUuid\` varchar(36) NULL, \`companyUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`external_payment_id\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`value\` int NOT NULL, \`payer_id\` varchar(255) NOT NULL, \`collector_id\` varchar(255) NOT NULL, \`suscriptionUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_6fb7f1551d40dd0103591a932ee\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`company\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` ADD CONSTRAINT \`FK_37b40d589e8b585b5d033530715\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film_search\` ADD CONSTRAINT \`FK_c25b91149e8137581fc68a7ea98\` FOREIGN KEY (\`consumerUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film_postulation\` ADD CONSTRAINT \`FK_f521bedbc3ba0dc409f52df4bea\` FOREIGN KEY (\`filmmakerUuid\`) REFERENCES \`filmmaker\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film_postulation\` ADD CONSTRAINT \`FK_7c0852c6c39d4938820e8f06406\` FOREIGN KEY (\`filmSearchUuid\`) REFERENCES \`film_search\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_message\` ADD CONSTRAINT \`FK_5b2178f74bfa0389323f35056a7\` FOREIGN KEY (\`filmPostulationUuid\`) REFERENCES \`film_postulation\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat_message\` ADD CONSTRAINT \`FK_fe15ff36af6a03312989d0b9b72\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`filmmaker_review\` ADD CONSTRAINT \`FK_8e9d3c9df3de5f4eb712460c076\` FOREIGN KEY (\`filmmakerUuid\`) REFERENCES \`filmmaker\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`filmmaker_review\` ADD CONSTRAINT \`FK_3f28a5f6cb0785963ed3bae322b\` FOREIGN KEY (\`filmSearchUuid\`) REFERENCES \`film_search\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_41d7d340e123271fa8b873793f7\` FOREIGN KEY (\`productUuid\`) REFERENCES \`product\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suscription\` ADD CONSTRAINT \`FK_cc37eedb50538bfd3a6b4c3c3c5\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`company\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_6cd0adcc782494a7c4ae9c58ddf\` FOREIGN KEY (\`suscriptionUuid\`) REFERENCES \`suscription\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_6cd0adcc782494a7c4ae9c58ddf\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_cc37eedb50538bfd3a6b4c3c3c5\``);
        await queryRunner.query(`ALTER TABLE \`suscription\` DROP FOREIGN KEY \`FK_41d7d340e123271fa8b873793f7\``);
        await queryRunner.query(`ALTER TABLE \`filmmaker_review\` DROP FOREIGN KEY \`FK_3f28a5f6cb0785963ed3bae322b\``);
        await queryRunner.query(`ALTER TABLE \`filmmaker_review\` DROP FOREIGN KEY \`FK_8e9d3c9df3de5f4eb712460c076\``);
        await queryRunner.query(`ALTER TABLE \`chat_message\` DROP FOREIGN KEY \`FK_fe15ff36af6a03312989d0b9b72\``);
        await queryRunner.query(`ALTER TABLE \`chat_message\` DROP FOREIGN KEY \`FK_5b2178f74bfa0389323f35056a7\``);
        await queryRunner.query(`ALTER TABLE \`film_postulation\` DROP FOREIGN KEY \`FK_7c0852c6c39d4938820e8f06406\``);
        await queryRunner.query(`ALTER TABLE \`film_postulation\` DROP FOREIGN KEY \`FK_f521bedbc3ba0dc409f52df4bea\``);
        await queryRunner.query(`ALTER TABLE \`film_search\` DROP FOREIGN KEY \`FK_c25b91149e8137581fc68a7ea98\``);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` DROP FOREIGN KEY \`FK_37b40d589e8b585b5d033530715\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_6fb7f1551d40dd0103591a932ee\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`suscription\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`filmmaker_review\``);
        await queryRunner.query(`DROP TABLE \`chat_message\``);
        await queryRunner.query(`DROP TABLE \`film_postulation\``);
        await queryRunner.query(`DROP TABLE \`film_search\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_37b40d589e8b585b5d03353071\` ON \`filmmaker\``);
        await queryRunner.query(`DROP TABLE \`filmmaker\``);
        await queryRunner.query(`DROP INDEX \`REL_6fb7f1551d40dd0103591a932e\` ON \`consumer\``);
        await queryRunner.query(`DROP TABLE \`consumer\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
