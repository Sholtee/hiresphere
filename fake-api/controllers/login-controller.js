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
  res.status(204);
  res.send();
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

loginController.get('/getuser', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200);

  if (req.user) {
    // we are not interested in "iat", etc
    const {email, id, roles} = req.user;

    return res.send(JSON.stringify({
      email,
      id,
      roles
    }));
  }

  res.send(JSON.stringify(req.user || {
    roles: ['guest'],
    isAnonymous: true
  }));
});