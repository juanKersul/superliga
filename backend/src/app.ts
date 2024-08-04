import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import cors from 'cors';

const app: Application = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

export default app;