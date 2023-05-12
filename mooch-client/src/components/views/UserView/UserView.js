import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserView.css";
import { AccordionItem, AccordionHeader, AccordionBody, Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Container, UncontrolledAccordion } from "reactstrap";
import { getCurrentUser } from "../../Utils/Constants";
import { Profile } from "./ProfileInformation";
import { UserMembershipDetails } from "./UserMembershipDetails";
import { UserMoochPostDetails } from "./UserMoochPostDetails";
import { UserMoochRequestDetails } from "./UserMoochRequestDetails";
import {AddMembershipModal} from "../AddMembershipView/AddMembershipModal";
import {BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE} from "../../Utils/Constants";

const url3 = "https://localhost:7082/api/User/";

export const UserView = () => {
const [membershipModalIsOpen, setMembershipModalOpen] = useState(false)

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
  <Container>
  <div className="d-flex justify-content-center" 
  style={{margin:`20px 0`}}>
    <UncontrolledAccordion defaultOpen="1">
  <AccordionItem style={{
        backgroundColor: `${LIGHT_GRAY}`}}>
    <AccordionHeader targetId="1">
     <div style={{ backgroundColor:`${BLACK}`, width:`100%`, height:`100%`}} > Memberships </div>
    </AccordionHeader>
    <AccordionBody accordionId="1">
      <div style={{
        display: "flex",
        flexDirection: "row",
      }}>
    <Button onClick={() => setMembershipModalOpen(true)} style={{
      backgroundColor:`${BLACK}`
    }}>Add Membership</Button>
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
     </div>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion>
    </div>
    <div className="d-flex justify-content-center"
    style={{margin:`20px 0`}}>
    <UncontrolledAccordion defaultOpen="1">
  <AccordionItem style={{
        backgroundColor: `${LIGHT_GRAY}`}}>
    <AccordionHeader targetId="1">
      Mooch Requests
    </AccordionHeader>
    <AccordionBody accordionId="1">
      <div style={{
        display: "flex",
        flexDirection: "row"
      }}>
    {UserMoochPost.map((postedMooches) => (
      <>
       <UserMoochPostDetails
       userId = {postedMooches.userId}
       membershipId = {postedMooches.membershipId}
       moochPostId = {postedMooches.moochPostId}
       isMooched = {postedMooches.isMooched}
       availabilityStartDate = {postedMooches.availabilityStartDate}
       availabilityEndDate = {postedMooches.availabilityEndDate}
       />
      </>
    ))
    }
    </div>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion>
   </div>
   <div className="d-flex justify-content-center" 
   style={{margin:`20px 0`}}>
    <UncontrolledAccordion defaultOpen="1">
  <AccordionItem style={{
        backgroundColor: `${LIGHT_GRAY}`}}>
    <AccordionHeader targetId="1">
      Mooch Details
    </AccordionHeader>
    <AccordionBody accordionId="1">
      <div style={{
        display: "flex",
        flexDirection: "row"
      }}>
    {UserRequestList.map((requestedMooches) => (
      <>
        <UserMoochRequestDetails
        userId = {requestedMooches.userId}
        moochRequestId = {requestedMooches.moochRequestId}
        moochPostId = {requestedMooches.moochPostId}
        startDate = {requestedMooches.startDate}
        endDate = {requestedMooches.endDate}
        isApproved = {requestedMooches.isApproved}
        dateCreated = {requestedMooches.dateCreated}
        />
      </>
    ))}
    </div>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion>
   </div>
</Container>
</main>
<AddMembershipModal modalIsOpen={membershipModalIsOpen} setModalIsOpen={setMembershipModalOpen} reloadData={fetchUserDetails}/>
</>
};