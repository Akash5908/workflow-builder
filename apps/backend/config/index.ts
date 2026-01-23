interface Config {
  jwtSecret: string;
  databaseUrl: string;
  port: string;
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET!,
  databaseUrl: process.env.DATABASE_URL!,
  port: process.env.PORT!,
};

export default config;
