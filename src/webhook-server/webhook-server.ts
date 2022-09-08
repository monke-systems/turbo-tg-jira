import * as traps from '@dnlup/fastify-traps';
import * as fastify from 'fastify';
import * as loglevel from 'loglevel';
import type { Telegraf } from 'telegraf';
import type { AppConfig, Hanlder } from '../config';
import type { JiraWebhook } from '../jira-types';
import type { CompiledTemplate } from '../message-templates';
import { handleHook } from './handle-hook';

type WebhookParams = {
  handlerId: string;
};

export const startWebhookServer = async (
  config: AppConfig,
  bots: Record<string, Telegraf>,
  handlers: Hanlder[],
  templates: CompiledTemplate[],
) => {
  const { webhookServer } = config;

  const app = fastify.fastify({
    logger: {
      enabled: true,
      level: config.webhookServer.loglevel,
    },
  });

  await app.register(traps.default);

  app.route({
    method: 'GET',
    url: '/healtz',
    handler: () => {
      return 'ok';
    },
  });

  app.route<{ Params: WebhookParams }>({
    method: 'POST',
    url: `${webhookServer.path}/:handlerId`,
    schema: {
      params: {
        type: 'object',
        properties: {
          handlerId: {
            type: 'string',
          },
        },
      },
    },
    handler: async (req, res) => {
      const { handlerId } = req.params;

      const handler = handlers.find((h) => h.id === handlerId);

      if (handler === undefined) {
        await res
          .code(400)
          .send(new Error(`Handler with id ${handlerId} not exist`));
        return;
      }

      const bot = bots[handler.botName];

      if (bot === undefined) {
        await res
          .code(400)
          .send(new Error(`Bot for handler ${handlerId} not found`));
        return;
      }

      await handleHook({
        webhook: req.body as JiraWebhook,
        handler,
        bot,
        templates,
      });
    },
  });

  const host = await app.listen({
    host: '0.0.0.0',
    port: webhookServer.port,
  });
  loglevel.info('Webhook server listening on', host);
};
