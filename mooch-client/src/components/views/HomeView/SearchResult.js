import { Card, ListGroup, ListGroupItem, CardHeader, CardBody, CardText } from "reactstrap"
import { useState, useEffect } from "react"


export const SearchResult = ({ searchValue, setSearchValue, result, idNo, number, origin }) => {

    const [isSuggestionHovered, setIsSuggestionHovered] = useState(false)

    return <>
        <Card
            style={{
                width: "102%",
                position: "relative",
                right: "1%",
                borderWidth: searchValue === "" ? "0px" : "1px",
                borderColor: "#BAD9FB",
                // backgroundColor: isSuggestionHovered ? "blue" : ""
            }}
            id={`result--${idNo}`}
            onClick={
                () => {
                    setSearchValue(result)
                    document.getElementById("searchBar").value = result
                }
            }

        >
            <CardBody className="d-flex mb-0"
                style={{
                    padding: "8px 0 8px 30px",
                    height: "fit-content",
                    backgroundColor: isSuggestionHovered ? "#FCA311" : "#14213D",
                    color: "#E5E5E5"
                }}
                onMouseEnter={
                    () => {
                        setIsSuggestionHovered(true)
                    }
                }
                onMouseLeave={
                    () => {
                        setIsSuggestionHovered(false)
                    }
                }>
                <CardText style={{
                    margin: "0 20px 0",
                    width: "33%",
                    fontSize: isSuggestionHovered ? "19px" : "",
                    color: isSuggestionHovered ? "white" : ""
                }}>{result.toUpperCase()}</CardText>
                <CardText style={{
                    margin: "0 20px 0",
                    width: "33%",
                    fontSize: isSuggestionHovered ? "19px" : "",
                    color: isSuggestionHovered ? "white" : ""
                }}>{`${number} results found`}</CardText>
                <CardText style={{
                    margin: "0",
                    width: "33%",
                    fontSize: isSuggestionHovered ? "19px" : "",
                    color: isSuggestionHovered ? "white" : ""
                }}
                >{`from ${origin.toUpperCase()}`}</CardText>
            </CardBody>
        </Card>
    </>
}