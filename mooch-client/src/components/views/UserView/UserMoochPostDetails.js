import { UncontrolledAccordion, AccordionItem,AccordionHeader,AccordionBody, Button, Card } from "reactstrap"

export const UserMoochPostDetails = ({userId,membershipId,moochPostId,isMooched,availabilityStartDate,availabilityEndDate}) => 
{
    return <>
     {/* <UncontrolledAccordion defaultOpen="1">
  <AccordionItem>
    <AccordionHeader targetId="1">
      Mooch Requests
    </AccordionHeader>
    <AccordionBody accordionId="1"> */}
    <Card>
    <div>User Id : {userId}</div>
    <div>Membership Id : {membershipId}</div>
    <div>Mooch Post Id : {moochPostId}</div>
    <div>Mooched : {isMooched ? "True" : "False"}</div>
    <div>Availability Start : {availabilityStartDate}</div>        
    <div>End Date : {availabilityEndDate}</div>
    </Card>
    {/* <Button>
      Add New Mooch
    </Button>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion> */}
    </>
   
}


