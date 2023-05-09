import { Card, CardBody, CardText } from "reactstrap"
import { useState, useEffect } from "react"


export const SearchResult = ({ searchValue, setSearchValue, result, idNo, number, origin }) => {

    const [isSuggestionHovered, setIsSuggestionHovered] = useState(false)

    return <>
        {/* {result === searchValue ? setMadeSelection(true) : setMadeSelection(true)} */}
        <Card
            style={{
                width: "100%",
                borderWidth: searchValue === "" ? "0px" : "1px",
                borderColor: "#BAD9FB",
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
                    padding: "5px 0 5px 30px",
                    height: "fit-content",
                    backgroundColor: "#2A2B37",
                    color: isSuggestionHovered ? "#E5E5E5" : "grey",
                    fontSize: "20px"
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
                    fontFamily: 'Vina Sans, cursive',
                    color: isSuggestionHovered ? "white" : ""
                }}>{result.toUpperCase()}</CardText>
                <CardText style={{
                    margin: "0 20px 0",
                    width: "33%",
                    color: isSuggestionHovered ? "white" : "",
                    fontFamily: 'Vina Sans, cursive',
                }}>{`${number} results found`}</CardText>
                <CardText style={{
                    margin: "0",
                    width: "33%",
                    color: isSuggestionHovered ? "white" : "",
                    fontFamily: 'Vina Sans, cursive',
                }}
                >{`from ${origin.toUpperCase()}`}</CardText>
            </CardBody>
        </Card>

    </>
}