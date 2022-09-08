import { CONFIG_SOURCE, generateConfigDoc } from '@monkee/turbo-config';
import { AppConfig } from '../src/config';

generateConfigDoc(AppConfig, {
  title: 'Turbo tg jira config reference',
  keysType: CONFIG_SOURCE.YAML,
  writeToFile: 'CONFIG_REFERENCE.MD',
});
