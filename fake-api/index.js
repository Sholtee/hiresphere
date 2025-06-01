/*
 * File: index.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import cookieParser from 'cookie-parser';
import {createServer} from 'http';
import express from 'express';

import {healthcheckController} from "./controllers/healthcheck-controller.js";
import {jobController} from "./controllers/job-controller.js";
import {loginController} from "./controllers/login-controller.js";

import sessionMiddleware from "./middlewares/session.js";

const
  API_V1 = '/api/v1',
  app = express();

app
  .use(cookieParser())
  .use(express.json())
  .use(sessionMiddleware)

  .use(API_V1, healthcheckController)
  .use(API_V1, loginController)
  .use(API_V1, jobController);

createServer({}, app).listen(1986);