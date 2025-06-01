/*
 * File: healthcheck-controller.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import express from 'express';

export const healthcheckController = express.Router();

healthcheckController.get('/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify('Hello world!'));
});