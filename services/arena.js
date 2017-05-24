const fetch = require('isomorphic-fetch');
const qs = require('qs');

const API_URL = 'https://api.are.na/v2';

module.exports.get = (path, params = {}, headers) =>
  fetch(`${API_URL}/${path}?${qs.stringify(params)}`, {
    headers: Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, headers),
  })
    .then(res => res.json());

module.exports.post = (path, body = {}) =>
  fetch(`${API_URL}/${path}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json());
