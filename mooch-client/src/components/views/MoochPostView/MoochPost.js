import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"
import { formatDateToString } from "../../Utils/dateUtils"

export const MoochPost = ({ id,
    organizationName,
    membershipDescription,
    membershipImageUrl,
    userName,
    userImageUrl,
    availabilityStartDate,
    availabilityEndDate }) => {

        const navigate = useNavigate()


    return <>

        <Card
            className="my-2 mr-2"
            style={{
                minWidth: '18rem',
                maxWidth: '18rem',
                marginRight: '2rem'
            }}
        >
            <CardHeader>
                <div className="d-flex justify-content-around">
                    <div>{organizationName}</div>
                </div>
            </CardHeader>
            <CardBody>
                <CardTitle tag="h5">
                    <div>{formatDateToString(availabilityStartDate)} - {formatDateToString(availabilityEndDate)}</div>
                </CardTitle>
                <CardText>
                    {membershipDescription}
                </CardText>
                <Button onClick={(c) => navigate(`/mooch-details/${id}`)} style={{marginRight: '2rem'}}>
                    Details!
                </Button>
                <Button onClick={(c) => navigate(`/mooch-details/${id}`)}>
                    Request!
                </Button>
            </CardBody>
            <CardFooter>
                <div className="d-flex justify-content-start">
                    <img style={{ width: "40px", marginRight: "12px" }} src={`${userImageUrl}`} alt="" />
                    <div>{userName}</div>
                </div>
            </CardFooter>
        </Card>

    </>
}