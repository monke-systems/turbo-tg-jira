import { ConfigField } from '@monkee/turbo-config';
import { DEFAULT_TEMPLATES } from './message-templates';

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
  @ConfigField({ nested: true })
  webhookServer!: WebhookServerConfig;

  @ConfigField({ arrayOf: TgBot })
  bots!: TgBot[];

  @ConfigField({ arrayOf: Hanlder })
  handlers!: Hanlder[];
}
