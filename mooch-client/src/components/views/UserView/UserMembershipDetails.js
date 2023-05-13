import {
  Button, AccordionBody,
  UncontrolledAccordion, AccordionHeader, AccordionItem, Card
} from "reactstrap"
import { BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE } from "../../Utils/Constants";
import { useState } from "react";

export const UserMembershipDetails =
  ({ membershipId, membershipDescription, membershipImageUrl,
    organizationId, organizationName, orignizationImageUrl, organizationType }) => {
    const [isCardHovered, setIsCardHovered] = useState(false)

    return <>
      <Card className="shadow" style={{
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
          }}
      >
        <img style={{ width: "40px", height: "40px", marginRight: "12px" }} src={membershipImageUrl} />
        <div>{organizationName} <img style={{ width: "40px", height: "40px", marginRight: "12px" }} src={orignizationImageUrl} /></div>
        <div>Type : {organizationType}</div>
        <div>Membership Description : {membershipDescription}</div>
        {/* <div>Membership Id : {membershipId}</div> */}
        {/* <div>Organization Id: {organizationId}</div> */}
      </Card>
    </>

  }

