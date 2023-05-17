import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";

function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) { 
  return <li>
      <div>
         { status === 'done' ? (
          <GoIssueOpened style={{color: 'green'}} />
         ) : (<GoIssueClosed style={{color: 'red'}} />) }
      </div>
    </li>; 
}

export default function IssuesList() {
  const issuesQuery = useQuery(
    ["issues"],
    () => fetch('/api/issues/').then(res => res.json())
  )

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? <p>Loading...</p> : 
        <ul>
          {issuesQuery.data.map((issue) => 
            <IssueItem 
              key={issue.id} 
              title={issue.title} 
              number={issue.number} 
              assignee={issue.assignee} 
              commentCount={issue.comments.length} 
              createdBy={issue.createdBy} 
              createdDate={issue.createdDate} 
              labels={issue.labels} 
              status={issue.status} 
            />
          )}
        </ul>
      }
    </div>
  );
}
