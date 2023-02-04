export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'test',
    password: process.env.password || 'password',
    name: process.env.database || 'test',
  },
});
