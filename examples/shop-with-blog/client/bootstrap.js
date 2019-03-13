const config = require('config');
const { bootstrap } = require('@deity/falcon-client/src/bootstrap');

const redirects = {
  payment: {
    success: '/checkout/confirmation',
    failure: '/checkout/failure',
    cancel: '/cart'
  }
};

export default {
  config: { ...config },
  // onServerCreated: server => { console.log('created'); },
  // onServerInitialized: server => { console.log('initialized'); },
  // onServerStarted: server => { console.log('started'); }
  onRouterCreated: async router => bootstrap(router, config.apolloClient.httpLink.uri, redirects)
};
