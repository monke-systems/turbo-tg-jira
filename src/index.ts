import { compileConfig } from '@monkee/turbo-config';
import * as handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';
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

  console.log('Creating bots');
  const bots = config.bots.reduce<Record<string, Telegraf>>((accum, value) => {
    accum[value.name] = new Telegraf(value.token);
    return accum;
  }, {});

  console.log('Compiling templates');
  const templates = compileMessageTemplates([
    { filePath: DEFAULT_TEMPLATES.COMMENT_EVENT_TEMPLATE },
    { filePath: DEFAULT_TEMPLATES.ISSUE_EVENT_TEMPLATE },
  ]);

  await startWebhookServer(config, bots, config.handlers, templates);
};

main().catch(console.error);
