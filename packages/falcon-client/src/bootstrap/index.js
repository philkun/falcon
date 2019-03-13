import Logger from '@deity/falcon-logger';
import fetch from 'node-fetch';
import url from 'url';
import { ProxyRequest } from '../service/ProxyRequest';

/**
 * @typedef {object} PaymentRedirectMap
 * @param {string} success Success page
 * @param {string} failure Failure page
 * @param {string} cancel Cancel page
 */

const handleRemoteEndpoints = async (router, serverUrl, endpoints, redirs) => {
  if (!endpoints || !endpoints.length) {
    return;
  }

  try {
    Logger.debug('Adding endpoints for proxying:', endpoints);

    endpoints.forEach(endpoint => {
      // using "endpoint" value as a proxied route name
      router.all(endpoint, async ctx => {
        const proxyResult = await ProxyRequest(url.resolve(serverUrl, ctx.originalUrl), ctx);
        const { status } = proxyResult;

        if (status === 404) {
          // Hiding "not found" page output from the backend
          ctx.message = proxyResult.statusText;
          ctx.status = status;
          return;
        }

        const { type, result } = await proxyResult.json();
        const { [type]: redirectMap = {} } = redirs;
        const { [result]: redirectLocation = '/' } = redirectMap;

        // Result redirection
        ctx.status = 302;
        ctx.set('location', redirectLocation);
      });
    });
  } catch (error) {
    Logger.error(`Failed to handle remote endpoints: ${error.message}`);
  }
};

/**
 * Bootstrap hook to fetch list of endpoints from Falcon-Server
 * and set up a "proxy" handler
 * @param {koa-router} router KoaRouter object
 * @param {string} serverUrl Falcon-Server URL
 * @param {object} redirs Map of redirections
 * @param {PaymentRedirectMap} redirs.payment Payment redirects
 */
export const bootstrap = async (router, serverUrl, redirs) => {
  if (!router) {
    Logger.error('"router" must be passed in your "bootstrap.js" file');
    return;
  }

  if (!serverUrl) {
    Logger.warn('"serverUrl" must be passed in your "bootstrap.js" file.');
    return;
  }

  const endpointsConfigUrl = url.resolve(serverUrl, '/config');

  try {
    const remoteConfigResult = await fetch(endpointsConfigUrl);
    if (!remoteConfigResult.ok) {
      throw new Error(`${remoteConfigResult.url} - ${remoteConfigResult.status} ${remoteConfigResult.statusText}`);
    }
    const remoteConfig = await remoteConfigResult.json();
    if (remoteConfig.endpoints) {
      handleRemoteEndpoints(router, serverUrl, remoteConfig.endpoints, redirs);
    }
  } catch (error) {
    Logger.warn(`Failed to process remote config from Falcon-Server: ${error.message}`);
  }
};
