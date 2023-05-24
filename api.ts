export type ID = string;

export interface IssueOption {
    id: ID;
    name: String;
}

export interface Issue {
    id: ID;
    summary: string;
    issueKey: string;
}

export interface IssueField{
    id: ID;
    name: string;
    jiraId: ID;
    secondaryJiraId?: ID;
}

export interface IssueWithLinkedIssues extends Issue{
    linkedissue: Issue[];
}

export interface IssueLinkType {
    id: ID;
    name: string;
}
