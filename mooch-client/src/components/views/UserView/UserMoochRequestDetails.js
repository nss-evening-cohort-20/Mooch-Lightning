import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Button, Card } from "reactstrap"
import { BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE } from "../../Utils/Constants";
import { useState } from "react";

export const UserMoochRequestDetails =
  ({ userId, moochRequestId, moochPostId, startDate, endDate, isApproved, dateCreated }) => {
    let start = new Date(startDate)
    let end = new Date(endDate)
    let created = new Date(dateCreated)

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
        <div>User Id : {userId}</div>
        <div>Mooch Request Id: {moochRequestId}</div>
        <div>Mooch Post Id: {moochPostId}</div>
        <div>Start Date : {start.toLocaleDateString()}</div>
        <div>End Date : {end.toLocaleDateString()}</div>
        <div>Approved : {isApproved ? "true" : "false"}</div>
        <div>Date Created : {created.toLocaleDateString()}</div>
        {isApproved ? <></> : <Button>
          Approve
        </Button>}
      </Card>
    </>
  }


