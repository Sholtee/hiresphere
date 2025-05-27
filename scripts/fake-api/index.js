/*
 * File: index.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {readFileSync, statSync} from 'node:fs';
import {createServer} from 'http';

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

  console.log(`${db.prepare('SELECT COUNT(*) AS count FROM job').get().count} job(s) created`);
}

app
  // parse json body
  .use(express.json())
  .use((req, res, next) => {
    // TODO: define "user" on "req"
    next();
  });

app.get('/api/v1/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify('Hello world!'));
});

app.get('/api/v1/job/:jobId', (req, res) => {
  const {user: {id: userId} = {}, params: {jobId}} = req;

  let
    params = {
      jobId
    },
    queryExtension = 'WHERE j.id = @jobId';

  // when an employer is logged in, return its own jobs only
  if (typeof userId === 'number') {
    queryExtension += ' AND j.user_id = @userId';
    params = {
      ...params,
      userId
    };
  }

  const result = queryJobs(queryExtension, 'long', params);
  if (!result.length) {
    res.status(404);
    res.send('Not found');
    return;
  }

  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(result[0]));
});

app.post('/api/v1/jobs', (req, res) => {
  const {user: {id: userId} = {}} = req;

  let
    {page = 0, jobOrCompany = '', location = ''} = req.body,
    params = {},
    queryExtension = 'WHERE 1 = 1';

  // when an employer is logged in, return its own jobs only
  if (typeof userId === 'number') {
    queryExtension += ' AND j.user_id = @userId';
    params = {
      ...params,
      userId
    };
  }

  if (jobOrCompany?.length) {
    queryExtension += ' AND (j.company LIKE @jobOrCompany OR j.name LIKE @jobOrCompany)';
    params = {
      ...params,
      jobOrCompany: `%${jobOrCompany}%`
    };
  }

  if (location?.length) {
    queryExtension += ' AND j.location LIKE @location';
    params = {
      ...params,
      location: `%${location}%`
    };
  }

  if (typeof page !== 'number')
    page = 0;

  const pageSize = 5;

  queryExtension += ' LIMIT @pageSize OFFSET @offset';
  params = {
    ...params,
    pageSize,
    offset: page * pageSize
  };

  const result = queryJobs(queryExtension, 'short', params);

  res.setHeader('content-type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(result));
});

createServer({}, app).listen(1986);

function queryJobs(queryExtension, description, params) {
  const query = `
    WITH job_tmp as (
      SELECT
         j.id, j.name, j.location, j.company, j.${description}_description AS description,
         j.image_base64 AS logo, j.created
      FROM job j 
      ${queryExtension}
    )
      SELECT j.*, t.value, t.color FROM job_tmp j
      JOIN tag t ON t.job_id = j.id`;

  return Object.values(db.prepare(query).all(params).reduce((acc, item) => {
    const {
      id, name, location, company,
      description, logo, created,
      value, color
    } = item;

    if (!acc[id])
      acc[id] = {
        id,
        name,
        location,
        company,
        description,
        logo,
        created,
        tags: []
      };
    acc[id].tags.push({
      value,
      color
    });

    return acc;
  }, {}));
}