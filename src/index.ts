import { compileConfig } from '@monkee/turbo-config';
import { AppConfig } from './config';
import { startWebhookServer } from './webhook-server/webhook-server';

const main = async () => {
  const { config } = await compileConfig(AppConfig);

  await startWebhookServer(config.webhookServer);
};

main().catch(console.error);
