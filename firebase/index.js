var admin = require('firebase-admin');

var serviceAccount = require('../config/serviceAccountKey.json');

const dotenv = require('dotenv');
dotenv.config();

serviceAccount.type = process.env.EXPRESS_APP_TYPE;
serviceAccount.project_id = process.env.EXPRESS_APP_PROJECT_ID;
serviceAccount.private_key_id = process.env.EXPRESS_APP_PRIVATE_KEY_ID;
serviceAccount.private_key = process.env.EXPRESS_APP_PRIVATE_KEY
  .replace(/^"/, '')
  .replace(/"$/, '')
  .replace(/\\n/g, '\n');
serviceAccount.client_email = process.env.EXPRESS_APP_CLIENT_EMAIL;
serviceAccount.client_id = process.env.EXPRESS_APP_CLIENT_ID;
serviceAccount.auth_uri = process.env.EXPRESS_APP_AUTH_URI;
serviceAccount.token_uri = process.env.EXPRESS_APP_TOKEN_URI;
serviceAccount.auth_provider_x509_cert_url = process.env.EXPRESS_APP_AUTH_PROVIDER_URL;
serviceAccount.client_x509_cert_url = process.env.EXPRESS_APP_CLIENT_URL;
serviceAccount.universe_domain = process.env.EXPRESS_APP_UNIVERSE_DOMAIN;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
