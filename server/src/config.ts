import dotenv from "dotenv";

dotenv.config();

export const configLoader = {
  port: process.env.PORT,
  basename: process.env.API_BASE_URL,
  dbConnUri: process.env.DATABASE_URL,
};
