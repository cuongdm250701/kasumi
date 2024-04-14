export const config = {
  environment: process.env.NODE_ENV || 'development',
  timezone: process.env.TZ || 'Asia/Tokyo',
  jwt_secret:
    process.env.JWT_SECRET ||
    '36165c3c2b2917a8f65d386922a507f183df4aaf045d69f90bf245363fcb9ec6',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://kasumi:1234@10.1.47.23:5432/workschedule?schema=dev',
  hasLog: process.env.HAS_LOG == 'true',
  api_prefix: '/workschedule',
  app: {
    jsonLimit: '1mb',
    api_prefix: '/api',
  },
};
