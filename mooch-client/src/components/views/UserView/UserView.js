import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserView.css";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getCurrentUser } from "../../Utils/Constants";
import { Profile } from "./ProfileInformation";
import { UserMembershipDetails } from "./UserMembershipDetails";
import { UserMoochPostDetails } from "./UserMoochPostDetails";
import { UserMoochRequestDetails } from "./UserMoochRequestDetails";

const url3 = "https://localhost:7082/api/User/";

export const UserView = () => {

const currentUser = getCurrentUser();
const [userMemberships, setUserMembershipsList] = useState([])
const [UserMoochPost, setUserMoochPost] = useState([])
const [UserRequestList, setUserRequestList] = useState([])
const [UserDetails, setUserDetails] = useState([])

const fetchUserDetails = async () => {
  const fetchData = await fetch(`${url3}${currentUser.id}`)
  const fetchJson = await fetchData.json()
  setUserMembershipsList(fetchJson.userMembershipsDetails)
  setUserMoochPost(fetchJson.userMoochPostDetails)
  setUserRequestList(fetchJson.userMoochRequestDetails)
  delete fetchJson.userMembershipsDetails
  delete fetchJson.userMoochPostDetails
  delete fetchJson.userMoochRequestDetails
  setUserDetails(fetchJson)
}

useEffect(
  () => {
    fetchUserDetails()
  }, []
)


return <>
<main>
<header><Profile/></header>
  <div>
    <h3>My Memberships</h3>
    {userMemberships.map((memberships) =>(
      <>
        <UserMembershipDetails
        membershipId = {memberships.membershipId}
        membershipDescription = {memberships.membershipDescription}
        membershipImageUrl = {memberships.membershipImageUrl}
        organizationId = {memberships.organizationId}
        organizationName = {memberships.organizationName}
        orignizationImageUrl = {memberships.orignizationImageUrl}
        organizationType = {memberships.organizationType}
        />
        
      </>
    ))
    }
    <h3>My Mooches</h3>
    {UserMoochPost.map((postedMooches) => (
      <>
      <div>
       <UserMoochPostDetails
       userId = {postedMooches.userId}
       membershipId = {postedMooches.membershipId}
       moochPostId = {postedMooches.moochPostId}
       isMooched = {postedMooches.isMooched}
       availabilityStartDate = {postedMooches.availabilityStartDate}
       availablilityEndDate = {postedMooches.availablilityEndDate}
       />
      </div>
      </>
    ))
    }
    <h3>My Requested Mooches</h3>
    {UserRequestList.map((requestedMooches) => (
      <>
      <div>
        <UserMoochRequestDetails
        userId = {requestedMooches.userId}
        moochRequestId = {requestedMooches.moochRequestId}
        moochPostId = {requestedMooches.moochPostId}
        startDate = {requestedMooches.startDate}
        endDate = {requestedMooches.endDate}
        isApproved = {requestedMooches.isApproved}
        dateCreated = {requestedMooches.dateCreated}
        />
      </div>
      </>
    ))}
</div>
</main>
</>
};