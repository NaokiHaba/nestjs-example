import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1675531583669 implements MigrationInterface {
  name = 'CreateUsers1675531583669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'アカウントID', \`name\` varchar(255) NOT NULL COMMENT 'アカウント名', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
