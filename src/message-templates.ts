import { readFileSync } from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

export enum DEFAULT_TEMPLATES {
  COMMENT_EVENT_TEMPLATE = 'default-templates/comment-event.hbs',
  ISSUE_EVENT_TEMPLATE = 'default-templates/issue-event.hbs',
}

export type TemplateToCompile = {
  filePath: string;
};

export type CompiledTemplate = {
  fileName: string;
  template: HandlebarsTemplateDelegate<any>;
};

export const compileMessageTemplates = (
  toCompile: TemplateToCompile[],
): CompiledTemplate[] => {
  const res = toCompile.reduce<CompiledTemplate[]>((accum, definition) => {
    const fullPath = path.resolve(definition.filePath);

    try {
      const content = readFileSync(fullPath, 'utf-8');
      const template = handlebars.compile(content);

      accum.push({
        fileName: definition.filePath,
        template,
      });
      return accum;
    } catch (e) {
      console.error(`Template compilation error ${definition.filePath}`);
      console.error(e);
      return accum;
    }
  }, []);

  return res;
};
