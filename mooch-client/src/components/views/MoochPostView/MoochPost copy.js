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

export const MoochPost = ({
    id,
    typeId,
    organizationName,
    organizationImage,
    membershipDescription,
    membershipImageUrl,
    userName,
    userImageUrl,
    availabilityStartDate,
    availabilityEndDate,
    setBackground }) => {

    let startDate = new Date(availabilityStartDate)
    let endDate = new Date(availabilityEndDate)

    const [buttonHovered, setButtonHovered] = useState(false)
    const [isCardHovered, setIsCardHovered] = useState(false)


    return <>
        <Card
            style={{
                width: '15rem',
                transform: isCardHovered ? "scale(1.05)" : "",
                boxShadow: "2px 2px 5px 1px black",
                border: isCardHovered ? "2px solid white" : "2px solid #2A2B37"
            }}
            onMouseEnter={
                () => {
                    setIsCardHovered(true)
                    setBackground({
                        idNo: typeId,
                        img: organizationImage
                    })
                }}
            onMouseLeave={
                () => {
                    setIsCardHovered(false)
                    setBackground({
                        id: 0,
                        img: "none"
                    })
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
                    {organizationName}
                    <span
                        style={{ color: "#0C0067", fontSize: "14px", display: "block" }}>
                        {membershipDescription}</span>
                    <span
                        style={{ color: "#0C0067", fontSize: "14px", display: "block" }}>
                        Shared By: {userName}</span>
                </CardTitle>
            </CardBody>
            <ListGroup flush
                style={{
                    borderWidth: "1px 0px",
                    borderColor: "lightgray",
                    borderStyle: "solid"
                }}>
                <ListGroupItem>
                    Start Date: <span>{startDate.toLocaleDateString()}</span>
                </ListGroupItem>
                <ListGroupItem>
                    End Date: <span>{endDate.toLocaleDateString()}</span>
                </ListGroupItem>
            </ListGroup>
            <CardBody>
                <Button
                    style={{
                        backgroundColor: buttonHovered ? "white" : "#14213D",
                        color: buttonHovered ? "#14213D" : "white",
                        fontFamily: 'Vina Sans, cursive',
                        fontSize: "18px",
                        letterSpacing: "0.7px",

                    }}
                    onMouseEnter={
                        () => {
                            setButtonHovered(true)
                        }}
                    onMouseLeave={
                        () => {
                            setButtonHovered(false)
                        }}
                >
                    Mooch!
                </Button>
            </CardBody>
        </Card>




    </>
}