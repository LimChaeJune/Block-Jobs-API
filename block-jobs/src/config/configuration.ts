export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_AUTH_USER,
    password: process.env.EMAIL_AUTH_PASSWORD,
    baseurl: process.env.EMAIL_BASE_URL,
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
