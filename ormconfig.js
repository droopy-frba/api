// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process');

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  dropSchema: false,
  logging: false,
  multipleStatements: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
  },
};
