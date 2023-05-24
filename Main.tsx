import React, { useEffect, useState } from 'react';
import { fetchHighPriorityIssue } from './FetchIssue';
import { IssueTable } from './IssueTable';

const ParentFile = () => {
  const [highPriorityIssues, setHighPriorityIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async (): Promise<void> => {
    try {
      const issues = await fetchHighPriorityIssue();
      setHighPriorityIssues(issues);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
        <IssueTable issues={highPriorityIssues} />
    </div>
  );
};

export default ParentFile;
