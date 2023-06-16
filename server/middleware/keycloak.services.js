import Keycloak from 'keycloak-connect';

export const keycloak = new Keycloak(
  {},
  {
    clientId: 'react_auth',
    bearerOnly: true,
    realm: 'hangman-key-cloak',
    'auth-server-url': 'http://localhost:8080',
    'ssl-required': 'external',
    resource: 'react_auth',
    'public-client': true,
    'confidental-port': 0,
  }
);
