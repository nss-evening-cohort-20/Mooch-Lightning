export const UserMoochRequestDetails =
 ({userId,moochRequestId,moochPostId,startDate,endDate,isApproved,dateCreated}) => {
    return <>
    <div>User Id : {userId}</div>
    <div>Mooch Request Id: {moochRequestId}</div>
    <div>Mooch Post Id: {moochPostId}</div>
    <div>Start Date : {startDate}</div>
    <div>End Date : {endDate}</div>
    <div>Approved : {isApproved ? "true" : "false" }</div>
    <div>Date Created : {dateCreated}</div>
    </>
 }


