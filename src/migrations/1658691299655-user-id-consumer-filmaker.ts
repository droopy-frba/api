import {MigrationInterface, QueryRunner} from "typeorm";

export class userIdConsumerFilmaker1658691299655 implements MigrationInterface {
    name = 'userIdConsumerFilmaker1658691299655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`userUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD UNIQUE INDEX \`IDX_6fb7f1551d40dd0103591a932e\` (\`userUuid\`)`);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` ADD \`userUuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` ADD UNIQUE INDEX \`IDX_37b40d589e8b585b5d03353071\` (\`userUuid\`)`);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6fb7f1551d40dd0103591a932e\` ON \`consumer\` (\`userUuid\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_37b40d589e8b585b5d03353071\` ON \`filmmaker\` (\`userUuid\`)`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD CONSTRAINT \`FK_6fb7f1551d40dd0103591a932ee\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` ADD CONSTRAINT \`FK_37b40d589e8b585b5d033530715\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`filmmaker\` DROP FOREIGN KEY \`FK_37b40d589e8b585b5d033530715\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP FOREIGN KEY \`FK_6fb7f1551d40dd0103591a932ee\``);
        await queryRunner.query(`DROP INDEX \`REL_37b40d589e8b585b5d03353071\` ON \`filmmaker\``);
        await queryRunner.query(`DROP INDEX \`REL_6fb7f1551d40dd0103591a932e\` ON \`consumer\``);
        await queryRunner.query(`ALTER TABLE \`film_search\` CHANGE \`expirationDate\` \`expirationDate\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` DROP INDEX \`IDX_37b40d589e8b585b5d03353071\``);
        await queryRunner.query(`ALTER TABLE \`filmmaker\` DROP COLUMN \`userUuid\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP INDEX \`IDX_6fb7f1551d40dd0103591a932e\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`userUuid\``);
    }

}
