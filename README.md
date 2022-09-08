# turbo-tg-jira

## Description

Jira webhook listener with TG notifications feature.

## Configuration

Application looking for **config.yaml** file in the working directory.

Example config:

```yaml
webhookServer:
  port: 80
  path: /webhook
bots:
  - name: test-bot
    token: '0=0=0=0=0=0=0=0'
  - name: another-bot
    token: '1-1-1-1-1-1-1-1'
handlers:
  - id: adminka
    tgChannelId: '-694897555'
    botName: test-bot
  - id: office
    tgChannelId: '-694986868'
    botName: another-bot
    issueEventTemplate: office-templates/issue.hbs
    commentEventTemplate: office-templates/comment.hbs
```

[Config reference](CONFIG_REFERENCE.MD)

## Message templates

Templates powered with [handlebars](https://handlebarsjs.com/). All [handlebars-helpers](https://github.com/helpers/handlebars-helpers) are also available.

[Examples](default-templates) (default templates in the same time)

## Endpoints

### Healthcheck

**GET** /healtz
