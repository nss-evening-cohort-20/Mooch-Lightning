import { Button, AccordionBody, 
    UncontrolledAccordion, AccordionHeader,AccordionItem, Card } from "reactstrap"
    import {BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE} from "../../Utils/Constants";

export const UserMembershipDetails = 
({membershipId,membershipDescription,membershipImageUrl,
organizationId,organizationName,orignizationImageUrl,organizationType}) => {
    return <>
  <Card style={{color: `${WHITE}`,
        backgroundColor: `${SLATE}`,
        border: `2px solid ${LIGHT_GRAY}`,
        padding: '15px',
        margin: '5px'
      }}
        >
    <img style={{ width: "40px", height:"40px", marginRight: "12px" }} src={membershipImageUrl} />
    <div>{organizationName} <img style={{ width: "40px", height: "40px", marginRight: "12px" }} src={orignizationImageUrl} /></div>
    <div>Type : {organizationType}</div>
    <div>Membership Description : {membershipDescription}</div>  
    <div>Membership Id : {membershipId}</div>
    <div>Organization Id: {organizationId}</div>
    </Card>
    </>
    
}

