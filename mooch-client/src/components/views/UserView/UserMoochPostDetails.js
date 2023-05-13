import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Button, Card } from "reactstrap"
import { BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE } from "../../Utils/Constants";
import { useState } from "react";

export const UserMoochPostDetails = ({ userId, membershipId, moochPostId, isMooched, availabilityStartDate, availabilityEndDate, username, membershipDescription, orgName }) => {
  let startDate = new Date(availabilityStartDate)
  let endDate = new Date(availabilityEndDate)

  const [isCardHovered, setIsCardHovered] = useState(false)
  return <>
    <Card style={{
      transform: isCardHovered ? 'scale(1.05)' : '',
      transition: 'transform .2s',
      boxShadow: isCardHovered
        ? `0px 0px 5px 3px ${LIGHT_GRAY}`
        : '2px 2px 5px 2px black',
      border: isCardHovered
        ? `2px solid ${LIGHT_GRAY}`
        : '2px solid #2A2B37',
      color: `${WHITE}`,
      backgroundColor: `${SLATE}`,
      border: `2px solid ${LIGHT_GRAY}`,
      padding: '15px',
      margin: '5px'

    }}
      onMouseEnter={
        () => {
          setIsCardHovered(true)
        }}
      onMouseLeave={
        () => {
          setIsCardHovered(false)
        }}>

      {/* <div>User Id : {userId}</div> */}
      <div>{orgName}</div>
      <div>{membershipDescription}</div>
      {/* <div>User Id : {username}</div> */}
      {/* <div>Membership Id : {membershipId}</div> */}

      {/* <div>Mooch Post Id : {moochPostId}</div> */}
      <div>Mooched : {isMooched ? "True" : "False"}</div>
      <div>Availability Start : {startDate.toLocaleDateString()}</div>
      <div>End Date : {endDate.toLocaleDateString()}</div>
      {/* <div>
        <Form>

        </Form>

      </div> */}
      <Button style={{
        width: "fit-content",
        margin: "auto"
      }}>
        Set Availability
      </Button>
    </Card>

  </>

}


