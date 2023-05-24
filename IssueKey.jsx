import React from "react";


export interface Props{
    issueKey: String;
}

export const IssueKey = ({issueKey} : Props) => {
    return (
        <div content = {issueKey}>
            {issueKey}
        </div>
    );
};