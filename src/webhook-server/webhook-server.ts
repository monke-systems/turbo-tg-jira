import * as fastify from 'fastify';
import type { WebhookServerConfig } from '../config';

export const startWebhookServer = async (config: WebhookServerConfig) => {
  const app = fastify.fastify();

  app.route({
    method: 'POST',
    url: config.path,
    handler: async (req) => {
      console.log('webhook body log', req.body);
      return Promise.resolve();
    },
  });

  const host = await app.listen({ port: config.port });
  console.log('Webhook server listening on', host);
};
