/*
 * File: session.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

import jwt from 'jsonwebtoken';

const
  PRIVATE_KEY = 'VERY SECURE KEY',
  SESSION_COOKIE_NAME = 'fake-session';

export default function sessionMiddleware(req, res, next) {
  req.user = null;

  const sessionCookie = req.cookies[SESSION_COOKIE_NAME];
  if (sessionCookie) {
    try {
      req.user = jwt.verify(sessionCookie, PRIVATE_KEY);
    } catch {
      // eat the exception
    }
  }

  res.setSession = function(session) {
    if (session)
      this.cookie(SESSION_COOKIE_NAME, jwt.sign(session, PRIVATE_KEY), {
        httpOnly: true,
        secure: true
      });
    else
      this.clearCookie(SESSION_COOKIE_NAME);
  };

  next();
}