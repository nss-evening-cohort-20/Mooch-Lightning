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
import { DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE } from "../../Utils/Constants"

export const MoochPostCard = ({
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
        <div style={{opacity: isCardHovered ? "1" : `.8`}}>
            <Card
                style={{
                    backgroundColor: `${SLATE}`,
                    width: '15rem',
                    transform: isCardHovered ? "scale(1.05)" : "",
                    transition: "transform .2s",
                    boxShadow: isCardHovered ? `0px 0px 5px 3px ${LIGHT_GRAY}` : "2px 2px 5px 1px black",
                    border: isCardHovered ? `2px solid ${LIGHT_GRAY}` : "2px solid #2A2B37"
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
                        style={{ color: `${WHITE}` }}>
                        {organizationName}
                        <p
                            style={{ color: `${DIRTY_WHITE}}`, fontSize: "14px", display: "block" }}>
                            {membershipDescription}</p>
                        <p
                            style={{ color: `${DIRTY_WHITE}}`, fontSize: "14px", display: "block" }}>
                                Shared By: {userName}</p>
                    </CardTitle>
                </CardBody>
                <ListGroup flush
                    style={{
                        backgroundColor: `${SLATE}`,             
                        borderWidth: "1px 0px",
                        borderColor: "lightgray",
                        borderStyle: "solid"
                    }}>
                    <ListGroupItem style={{backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}`}}>
                        Start Date: <span>{startDate.toLocaleDateString()}</span>
                    </ListGroupItem>
                    <ListGroupItem style={{backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}`}}>
                        End Date: <span>{endDate.toLocaleDateString()}</span>
                    </ListGroupItem>
                </ListGroup>
                <CardBody>
                    <Button
                        style={{
                            backgroundColor: buttonHovered ? `${DIRTY_WHITE}` : `${SLATE}`,
                            color: buttonHovered ? `${SLATE}` : `${DIRTY_WHITE}`,
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
        </div>
    </>
}