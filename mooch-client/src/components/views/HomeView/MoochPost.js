import "./Home.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Button,
    CardFooter,
    ListGroup,
    ListGroupItem,
    CardLink
} from "reactstrap"
import { useEffect, useState } from "react"

export const MoochPost = ({ id,
    organizationName,
    organizationImage,
    membershipDescription,
    membershipImageUrl,
    userName,
    userImageUrl,
    availabilityStartDate,
    availabilityEndDate }) => {

    let startDate = new Date(availabilityStartDate)
    let endDate = new Date(availabilityEndDate)

    const [isHovered, setIsHovered] = useState(false)
    const [isCardHovered, setIsCardHovered] = useState(false)


    return <>
        {/* <Card
            className="my-2"
            style={{
                width: '18rem',
                borderColor: "#0C0067",
                boxShadow: "2px 2px 5px 3px black",
                backgroundImage: `url(${organizationImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
            onMouseEnter={
                () => {
                    setIsHovered(true)
                }
            }
            onMouseLeave={
                () => {
                    setIsHovered(false)
                }
            }
        >
            <CardHeader tag="h4" style={{
                background: "linear-gradient(45deg,#060034,#0C0067)"
            }}>
                <div className="">
                    <div>{organizationName}</div>
                </div>
            </CardHeader>
            <CardBody className={isHovered ? `overflow-hidden h-100` : `overflow-hidden py-0`}
                style={{
                    height: isHovered ? "" : "0",
                    transition: "5s"
                }}>
                <div
                    style={{
                        backgroundColor: "#f5f5f5",
                        opacity: "0.8",
                        borderRadius: "5px",
                        padding: "15px",
                        margin: "0px 0 10px"
                    }}>
                    <CardTitle tag="h5"
                        style={{ color: "#060034" }}>
                        <div>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</div>
                    </CardTitle>
                    <CardText
                        style={{ color: "#060034" }}>
                        {membershipDescription}
                    </CardText>
                </div>
                <Button>
                    Mooch!
                </Button>

            </CardBody>
            <CardFooter style={{ background: "linear-gradient(45deg,#060034,#0C0067)" }}>
                <div className="d-flex justify-content-start">
                    <img style={{ width: "40px", marginRight: "12px" }} src={`${userImageUrl}`} alt="" />
                    <div>{userName}</div>
                </div>
            </CardFooter>
        </Card> */}


        <Card
            style={{
                width: '15rem',
                transform: isCardHovered ? "scale(1.1)" : "",
                boxShadow: "2px 2px 5px 1px black"
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
            <img
                alt="Card"
                src={organizationImage}
                style={{
                    height: "150px"
                }}
            />
            <CardBody>
                <CardTitle tag="h4"
                    style={{ color: "#060034" }}>
                    {organizationName} <span
                        style={{ color: "#0C0067", fontSize: "14px", display: "block" }}>
                        {membershipDescription}</span>
                    <span
                        style={{ color: "#0C0067", fontSize: "14px", display: "block" }}>
                        Shared By: {userName}</span>
                </CardTitle>
            </CardBody>
            <ListGroup flush>
                <ListGroupItem>
                    Start Date: <span>{startDate.toLocaleDateString()}</span>
                </ListGroupItem>
                <ListGroupItem>
                    End Date: <span>{endDate.toLocaleDateString()}</span>
                </ListGroupItem>
            </ListGroup>
            <CardBody>
                <Button
                    style={{ backgroundColor: "#14213D" }}>
                    Mooch!
                </Button>
            </CardBody>
        </Card>




    </>
}