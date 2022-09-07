import { ConfigField } from '@monkee/turbo-config';

export class WebhookServerConfig {
  @ConfigField()
  port: number = 3000;

  @ConfigField()
  path: string = '/webhook';
}

export class AppConfig {
  @ConfigField({ nested: true })
  webhookServer!: WebhookServerConfig;
}
