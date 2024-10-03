import { config } from "dotenv";
import Joi from "joi";

config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = envVars;

interface Env {
  port: {
    PORT: number;
  };
  db: {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
  };
  email: {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
  };
}

export const env: Env = {
  port: {
    PORT: PORT,
  },
  db: {
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    DB_NAME: DB_NAME,
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
  },
  email: {
    EMAIL_HOST: EMAIL_HOST,
    EMAIL_PORT: EMAIL_PORT,
    EMAIL_USER: EMAIL_USER,
    EMAIL_PASSWORD: EMAIL_PASSWORD,
  },
};
