import "./Home.css"
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"

export const MoochPost = ({ id,
    organizationName,
    membershipDescription,
    membershipImageUrl,
    userName,
    userImageUrl,
    availabilityStartDate,
    availabilityEndDate }) => {

    let startDate = new Date(availabilityStartDate)
    let endDate = new Date(availabilityEndDate)

    return <>
        {/* <div>
            <div className="d-flex">
                <img className="mp-img" src={`${membershipImageUrl}`} alt="" />
                <img className="mp-img" src={`${userImageUrl}`} alt="" />
            </div>
            <div>{organizationName}</div>
            <div>{membershipDescription}</div>
            <div>{userName}</div>
        </div> */}

        <Card
            className="my-2"
            style={{
                width: '18rem'
            }}
        >
            <CardHeader>
                <div className="d-flex justify-content-around">
                    <div>{organizationName}</div>
                </div>
            </CardHeader>
            <CardBody>
                <CardTitle tag="h5">
                    <div>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</div>
                </CardTitle>
                <CardText>
                    {membershipDescription}
                </CardText>
                <Button>
                    Mooch!
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