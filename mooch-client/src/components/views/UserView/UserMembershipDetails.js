import { Button, AccordionBody, 
    UncontrolledAccordion, AccordionHeader,AccordionItem } from "reactstrap"

export const UserMembershipDetails = 
({membershipId,membershipDescription,membershipImageUrl,
organizationId,organizationName,orignizationImageUrl,organizationType}) => {
    return <>
     <UncontrolledAccordion defaultOpen="1">
  <AccordionItem>
    <AccordionHeader targetId="1">
      Membership Details
    </AccordionHeader>
    <AccordionBody accordionId="1">
    <img style={{ width: "40px", height:"40px", marginRight: "12px" }} src={membershipImageUrl} />
    <div>{organizationName} <img style={{ width: "40px", height: "40px", marginRight: "12px" }} src={orignizationImageUrl} /></div>
    <div>Type : {organizationType}</div>
    <div>Membership Description : {membershipDescription}</div>  
    <div>Membership Id : {membershipId}</div>
    <div>Organization Id: {organizationId}</div>
    <Button>
      Add New Membership
    </Button>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion>
    </>
    
}

