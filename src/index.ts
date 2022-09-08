import { compileConfig } from '@monkee/turbo-config';
import * as handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';
import * as loglevel from 'loglevel';
import { Telegraf } from 'telegraf';
import { AppConfig } from './config';
import {
  compileMessageTemplates,
  DEFAULT_TEMPLATES,
} from './message-templates';
import { startWebhookServer } from './webhook-server/webhook-server';

helpers({
  handlebars,
});

const main = async () => {
  const { config } = await compileConfig(AppConfig, {
    ymlFiles: ['config.yaml'],
    envFiles: ['.env.development', '.env.development.local'],
    loadEnvFiles: process.env.NODE_ENV === 'development',
  });

  loglevel.setLevel(config.loglevel);

  loglevel.info('Creating bots');
  const bots = config.bots.reduce<Record<string, Telegraf>>((accum, value) => {
    accum[value.name] = new Telegraf(value.token);
    return accum;
  }, {});

  loglevel.info('Compiling templates');
  const templates = compileMessageTemplates([
    { filePath: DEFAULT_TEMPLATES.COMMENT_EVENT_TEMPLATE },
    { filePath: DEFAULT_TEMPLATES.ISSUE_EVENT_TEMPLATE },
  ]);
  loglevel.info(
    'Templates list: \n',
    templates.map((t) => t.fileName).join('\n'),
  );

  await startWebhookServer(config, bots, config.handlers, templates);
  loglevel.info('Service is ready');
  loglevel.info(
    'Handlers list:\n',
    config.handlers
      .map((h) => `${config.webhookServer.path}/${h.id}`)
      .join('\n'),
  );
};

main().catch(console.error);
