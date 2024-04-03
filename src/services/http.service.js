const axios = require("axios");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Accept-Encoding": "identity",
};

const doGet = async (url, headers = {}, modify = false) => {
  headers = modifyHeaders(headers, modify);
  return axios.get(url, {headers});
};

const doPost = async (url, data, headers = {}, modify = false) => {
  headers = modifyHeaders(headers, modify);
  return axios.post(url, data, {headers});
};

function modifyHeaders(headers, modifyheaders) {
  if (!headers) {
    headers = {};
  }
  if (modifyheaders) {
    return { ...defaultHeaders, ...headers };
  }
  return { ...defaultHeaders };
}

module.exports = { doGet, doPost };
