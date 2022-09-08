import { ConfigField } from '@monkee/turbo-config';
import { IsEnum } from 'class-validator';
import { DEFAULT_TEMPLATES } from './message-templates';

export enum LOG_LEVEL {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent',
}
export class WebhookServerConfig {
  @ConfigField()
  port: number = 3000;

  @ConfigField()
  path: string = '/webhook';
}

export class Hanlder {
  @ConfigField()
  id!: string;

  @ConfigField()
  botName!: string;

  @ConfigField()
  tgChannelId!: string;

  @ConfigField()
  issueEventTemplate: string = DEFAULT_TEMPLATES.ISSUE_EVENT_TEMPLATE;

  @ConfigField()
  commentEventTemplate: string = DEFAULT_TEMPLATES.COMMENT_EVENT_TEMPLATE;
}

export class TgBot {
  @ConfigField()
  name!: string;

  @ConfigField()
  token!: string;
}

export class AppConfig {
  @ConfigField()
  @IsEnum(LOG_LEVEL)
  loglevel: LOG_LEVEL = LOG_LEVEL.INFO;

  @ConfigField({ nested: true })
  webhookServer!: WebhookServerConfig;

  @ConfigField({ arrayOf: TgBot })
  bots!: TgBot[];

  @ConfigField({ arrayOf: Hanlder })
  handlers!: Hanlder[];
}
