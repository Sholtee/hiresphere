/*
 * File: vite.config.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {readFileSync, statSync} from 'node:fs';
import {createServer} from 'https';

import Database from 'better-sqlite3';
import express from 'express';

const
  db = new Database('./fakeapi.db'),
  app = express();

if (!statSync(db.name).size) {
  db.exec(readFileSync('./test-data.sql', {
    encoding: 'utf8',
    flag: 'r'
  }));
}

app.get('/api/v1/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify('Hello world!'));
});

createServer({}, app).listen(1986);