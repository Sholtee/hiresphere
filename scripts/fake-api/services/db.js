/*
 * File: db.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

import Database from 'better-sqlite3';
import {readFileSync, statSync} from "node:fs";

export const db = new Database('./fakeapi.db');

if (!statSync(db.name).size) {
  db.exec(readFileSync('./test-data.sql', {
    encoding: 'utf8',
    flag: 'r'
  }));

  console.log(`${db.prepare('SELECT COUNT(*) AS count FROM job').get().count} job(s) created`);
}