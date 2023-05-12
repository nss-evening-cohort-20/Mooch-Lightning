import { UncontrolledAccordion, AccordionItem,AccordionHeader,AccordionBody, Button, Card } from "reactstrap"
import {BLACK, DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE} from "../../Utils/Constants";

export const UserMoochRequestDetails =
 ({userId,moochRequestId,moochPostId,startDate,endDate,isApproved,dateCreated}) => {
  let start = new Date(startDate)
  let end = new Date(endDate)
  let created = new Date(dateCreated)
    return <>
    <Card style={{color: `${WHITE}`,
        backgroundColor: `${SLATE}`,
        border: `2px solid ${LIGHT_GRAY}`,
        padding: '15px',
        margin: '5px'
      }}>
    <div>User Id : {userId}</div>
    <div>Mooch Request Id: {moochRequestId}</div>
    <div>Mooch Post Id: {moochPostId}</div>
    <div>Start Date : {start.toLocaleDateString()}</div>
    <div>End Date : {end.toLocaleDateString()}</div>
    <div>Approved : {isApproved ? "true" : "false" }</div>
    <div>Date Created : {created.toLocaleDateString()}</div>
    </Card> 
    </>
 }


