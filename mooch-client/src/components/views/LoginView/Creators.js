import { CardText, Card } from "reactstrap"
import "./Login.css";
import { useState, useEffect } from "react";
import { DARK_GRAY, SLATE, LIGHT_GRAY, WHITE, BLACK } from "../../Utils/Constants";



export const Creators = ({ x, index }) => {

    const [hover, setHover] = useState(false)

    return (
        <>
            <a href={x.url} target="_blank" style={{
                textDecoration: "none",
                color: `${LIGHT_GRAY}`
            }}>
                <Card
                    style={{
                        animation: `displayName ${0.5 * (index + 1)}s linear 0s 1`,
                        position: "relative",
                        top: "0px",
                        color: hover ? "orange" : "",
                        cursor: "pointer",
                        backgroundColor: `${SLATE}`,
                        border: "none",
                        zIndex: "1"
                    }}
                    onMouseEnter={
                        () => {
                            setHover(true)
                        }
                    }
                    onMouseLeave={
                        () => {
                            setHover(false)
                        }
                    }><CardText>{x.name}</CardText>
                    <CardText
                        style={{
                            color: `${DARK_GRAY}`,
                            position: "relative",
                            bottom: "65px",
                            left: "5px",
                            zIndex: "-1"
                        }}>{x.name}</CardText>
                </Card>
            </a>
        </>
    )
}