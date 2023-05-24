import React from "react";


export interface Props{
    content: String;
}

export const IssueSummary = ({content}: Props) =>{
    <div content = {content} position = "bottom">
        {content}
    </div>
}