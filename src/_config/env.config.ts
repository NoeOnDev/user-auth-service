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
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const { PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = envVars;

export const env = {
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
};
