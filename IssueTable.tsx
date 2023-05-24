import React from 'react';

interface Issue {
  key: string;
  fields: {
    summary: string;
    issuelinks: {
      type: {
        outward: string;
      };
      outwardIssue: {
        key: string;
      };
    }[];
  };
}

interface Props {
  issues: Issue[];
}

export const IssueTable = ({ issues }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Issue</th>
            <th>is blocked by</th>
            <th>blocks</th>
            <th>subTask</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr key={issue.key}>
              <td>{index + 1}</td>
              <td>{issue.key}: {issue.fields.summary}</td>
              <td>
                {issue.fields.issuelinks.map(link => (
                  <span key={link.outwardIssue.key}>
                    {link.outwardIssue.key} ({link.type.outward}){' '}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


