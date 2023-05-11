import { UncontrolledAccordion, AccordionItem,AccordionHeader,AccordionBody, Button } from "reactstrap"

export const UserMoochRequestDetails =
 ({userId,moochRequestId,moochPostId,startDate,endDate,isApproved,dateCreated}) => {
    return <>
    <UncontrolledAccordion defaultOpen="1">
  <AccordionItem>
    <AccordionHeader targetId="1">
      Mooch Requests
    </AccordionHeader>
    <AccordionBody accordionId="1">
    <div>User Id : {userId}</div>
    <div>Mooch Request Id: {moochRequestId}</div>
    <div>Mooch Post Id: {moochPostId}</div>
    <div>Start Date : {startDate}</div>
    <div>End Date : {endDate}</div>
    <div>Approved : {isApproved ? "true" : "false" }</div>
    <div>Date Created : {dateCreated}</div>
    <Button>
      Add New Mooch Request
    </Button>
    </AccordionBody>
   </AccordionItem>
   </UncontrolledAccordion>
    </>
 }


