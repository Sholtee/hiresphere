/*
 * File: login-controller.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import express from 'express';

import {db} from '../services/db.js';

export const loginController = express.Router();

loginController.get('/logout', (req, res) => {
  res.setSession();
});

loginController.post('/login', (req, res) => {
  const
    {email} = req.body,
    status = {},
    users = db.prepare('SELECT * FROM user WHERE name = @email').all({
      email
    });

  if (users.length) {
    // allow any password to be used
    res.setSession({
      email,
      id: users[0].id,
      roles: ['employer']
    });
    status.status = 'ok';
  } else {
    status.status = 'failed';
    status.reason = 'Invalid email or password';
  }

  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(status));
});