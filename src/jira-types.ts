// Mostly types are auto-generated

export enum WEBHOOK_EVENT {
  ISSUE_CREATED = 'jira:issue_created',
  ISSUE_UPDATED = 'jira:issue_updated',
  COMMENT_CREATED = 'comment_created',
  COMMENT_UPDATED = 'comment_updated',
}

export type JiraWebhook = {
  timestamp: number;
  webhookEvent: WEBHOOK_EVENT;
  issue_event_type_name?: string;
  user?: User;
  comment?: Comment;
  issue: Issue;
  eventType: string;
  changelog?: Changelog;
};

export type Changelog = {
  id: string;
  items: Item[];
};

export type Item = {
  field: string;
  fieldtype: string;
  fieldId: string;
  from: null;
  fromString: null;
  to: null | string;
  toString: string;
  tmpFromAccountId?: null;
  tmpToAccountId?: string;
};

export type Comment = {
  self: string;
  id: string;
  author: User;
  body: string;
  updateAuthor: User;
  created: string;
  updated: string;
  jsdPublic: boolean;
};

export type User = {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
};

export type AvatarUrls = {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
};

export type Issue = {
  id: string;
  self: string;
  key: string;
  fields: Fields;
};

export type Fields = {
  summary: string;
  issuetype: Issuetype;
  project: Project;
  assignee: User;
  priority: Priority;
  status: Status;
  creator?: User;
  reporter?: User;
  subtasks?: unknown[];
  created?: string;
  updated?: string;
  description?: string;
  duedate: string | null;
};

export type Issuetype = {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  hierarchyLevel: number;
};

export type Priority = {
  self: string;
  iconUrl?: string;
  name: string;
  id: string;
  description?: string;
};

export type Project = {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
  projectCategory: Priority;
};

export type Status = {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
};

export type StatusCategory = {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
};
