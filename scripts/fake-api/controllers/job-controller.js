/*
 * File: job-controller.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import express from 'express';
import {db} from '../services/db.js';

export const jobController = express.Router();

jobController.get('/job/:jobId', (req, res) => {
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

jobController.post('/jobs', (req, res) => {
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

function queryJobs(queryExtension, description, params) {
  const query = `
    WITH job_tmp as (
      SELECT
         j.id, j.name, j.location, j.company, j.${description}_description AS description,
         j.image_base64 AS logo, j.created
      FROM job j 
      ${queryExtension}
    )
      SELECT j.*, t.value FROM job_tmp j
      JOIN tag t ON t.job_id = j.id`;

  return Object.values(db.prepare(query).all(params).reduce((acc, item) => {
    const {
      id, name, location, company,
      description, logo, created,
      value
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
    acc[id].tags.push(value);

    return acc;
  }, {}));
}