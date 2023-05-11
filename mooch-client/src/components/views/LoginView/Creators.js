import { CardText } from "reactstrap"
import "./Login.css";
import { useState, useEffect } from "react";



export const Creators = ({ x, index }) => {

    const [hover, setHover] = useState(false)

    return (
        <>
            <a href={x.url} target="_blank" style={{
                textDecoration: "none",
                color: "grey"
            }}>
                <CardText
                    style={{
                        animation: `displayName ${0.5 * (index + 1)}s linear 0s 1`,
                        position: "relative",
                        top: "0px",
                        color: hover ? "orange" : "",
                        cursor: "pointer"
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
                    }>{x.name}</CardText>
            </a>
        </>
    )
}