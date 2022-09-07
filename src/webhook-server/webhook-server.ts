import * as traps from '@dnlup/fastify-traps';
import * as fastify from 'fastify';
import type { WebhookServerConfig } from '../config';

export const startWebhookServer = async (config: WebhookServerConfig) => {
  const app = fastify.fastify();

  await app.register(traps.default);

  app.route({
    method: 'GET',
    url: '/healtz',
    handler: () => {
      return 'ok';
    },
  });

  app.route({
    method: 'POST',
    url: config.path,
    handler: async (req) => {
      console.log('webhook body log', req.body);
      return Promise.resolve();
    },
  });

  const host = await app.listen({
    host: '0.0.0.0',
    port: config.port,
  });
  console.log('Webhook server listening on', host);
};
