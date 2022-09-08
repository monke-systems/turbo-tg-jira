import * as loglevel from 'loglevel';
import type { Telegraf } from 'telegraf';
import type { Hanlder } from '../config';
import type { JiraWebhook } from '../jira-types';
import { WEBHOOK_EVENT } from '../jira-types';
import type { CompiledTemplate } from '../message-templates';

export type HandleHookArgs = {
  webhook: JiraWebhook;
  handler: Hanlder;
  bot: Telegraf;
  templates: CompiledTemplate[];
};

export const handleHook = async (args: HandleHookArgs) => {
  const { webhook, bot, handler, templates } = args;

  loglevel.info(`Got hook '${webhook.webhookEvent}', handler '${handler.id}'`);

  if (
    [WEBHOOK_EVENT.COMMENT_CREATED, WEBHOOK_EVENT.COMMENT_UPDATED].includes(
      webhook.webhookEvent,
    )
  ) {
    const template = templates.find(
      (t) => t.fileName === handler.commentEventTemplate,
    );

    if (template !== undefined) {
      const text = template.template(webhook);

      loglevel.info(`Sending message to chat ${handler.tgChannelId}}`);
      loglevel.debug('Full message text:\n', text);

      await bot.telegram.sendMessage(handler.tgChannelId, text, {
        parse_mode: 'HTML',
      });
    }
  }

  if (
    [WEBHOOK_EVENT.ISSUE_CREATED, WEBHOOK_EVENT.ISSUE_UPDATED].includes(
      webhook.webhookEvent,
    )
  ) {
    const template = templates.find(
      (t) => t.fileName === handler.issueEventTemplate,
    );

    if (template !== undefined) {
      const text = template.template(webhook);

      loglevel.info(`Sending message to chat ${handler.tgChannelId}}`);
      loglevel.debug('Full message text:\n', text);

      await bot.telegram.sendMessage(handler.tgChannelId, text, {
        parse_mode: 'HTML',
      });
    }
  }
};
