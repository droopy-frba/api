import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserVerificationTokenExpiration1657495721255 implements MigrationInterface {
    name = 'addUserVerificationTokenExpiration1657495721255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`companyUuid\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`identifier\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verificationTokenExpiration\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`identifier\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`companyUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_7e77e4a29905b0ac429b40b3240\``);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`companyUuid\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`identifier\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verificationTokenExpiration\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`identifier\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`companyUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_7e77e4a29905b0ac429b40b3240\` FOREIGN KEY (\`companyUuid\`) REFERENCES \`consumer\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
