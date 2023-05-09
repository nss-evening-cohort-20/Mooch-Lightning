export const UserMoochPostDetails = ({userId,membershipId,moochPostId,isMooched,availabilityStartDate,availablilityEndDate}) => 
{
    return <>
    <div>User Id : {userId}</div>
    <div>Membership Id : {membershipId}</div>
    <div>Mooch Post Id : {moochPostId}</div>
    <div>Mooched : {isMooched ? "True" : "False"}</div>
    <div>Availability Start : {availabilityStartDate}</div>        
    <div>End Date : {availablilityEndDate}</div>
    </>
}




// "userId": 1,
// "membershipId": 1,
// "moochPostId": 1,
// "isMooched": false,
// "availabilityStartDate": "1900-01-01T00:00:00",
// "availabilityEndDate": "1900-01-01T00:00:00"