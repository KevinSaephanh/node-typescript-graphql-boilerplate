declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      TOKEN_EXPIRES_IN: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DEV_DB_HOST: string;
      DEV_DB_NAME: string;
      DEV_DB_PORT: string;
      DEV_DB_USERNAME: string;
      DEV_DB_PASSWORD: string;
    }
  }
}

export {};
