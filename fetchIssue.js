

export async function fetchHighPriorityIssue() {
    try {
      const response = await fetch(
        'https://monikavalecha.atlassian.net/rest/api/3/search?jql=project=P2 AND priority=High'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch high priority issues');
      }
      
      const data = await response.json();
      return data.issues;
    } catch (error) {
      console.error('Error fetching high priority issues:', error);
      throw error;
    }
  }