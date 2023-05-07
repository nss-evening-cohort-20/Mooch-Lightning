import { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, CardHeader, CardBody, CardText } from "reactstrap";

export const SearchResults = ({ searchValue, setSearchValue }) => {
    //searchValue is user input into searchbar

    const url = "https://localhost:7082/api/MoochPost/search_results?search=";

    const getSearchResults = async () => {
        const fetchData = await fetch(url)
        const fetchJson = await fetchData.json()
        setSearchResults(fetchJson)
    }

    const [searchResults, setSearchResults] = useState([])

    useEffect(
        () => {
            getSearchResults()

        }, []
    )


    const [filterResults, setFilterResults] = useState([])

    useEffect(
        () => {

            function addToSuggestions(id, value, originDesc, length) {

                if (existsArray.indexOf(value) === -1) {
                    existsArray.push(value)
                    searchArray.push(
                        {
                            idNo: id,
                            result: value,
                            origin: originDesc,
                            number: length
                        }
                    )

                }
            }

            const copy = searchResults.map(x => ({ ...x }))
            const searchArray = []
            const existsArray = []

            //organization name results
            const filterByOrg = copy.filter(x => x.organizationName.toUpperCase().includes(searchValue.toUpperCase()))
            if (filterByOrg !== undefined) {
                const orgName = []
                filterByOrg.forEach((x) => (orgName.push(x.organizationName)))
                filterByOrg.forEach((x) => (

                    // searchArray.push(
                    //     {
                    //         result: x.organizationName,
                    //         origin: "Organization",
                    //         number: filterByOrg?.length
                    //     }
                    // )

                    addToSuggestions(
                        x.id,
                        x.organizationName,
                        "Organization",
                        orgName.filter((item) =>
                            item.toUpperCase().includes(x.organizationName.toUpperCase())).length)
                ))
            }

            //membership description results
            const filterByDesc = copy.filter(x => x.membershipDescription.toUpperCase().includes(searchValue.toUpperCase()))
            if (filterByDesc !== undefined) {
                const memDesc = []
                filterByDesc.forEach((x) => (memDesc.push(x.membershipDescription)))
                filterByDesc.forEach((x) => (

                    //     searchArray.push(
                    //     {
                    //         result: x.membershipDescription,
                    //         origin: "Description",
                    //         number: filterByDesc?.length
                    //     }
                    // )
                    addToSuggestions(
                        x.id,
                        x.membershipDescription,
                        "Description",
                        memDesc.filter((item) =>
                            item.toUpperCase().includes(x.membershipDescription.toUpperCase())).length)
                ))
            }

            //username results
            const filterByUser = copy.filter(x => x.userName.toUpperCase().includes(searchValue.toUpperCase()))
            if (filterByUser !== undefined) {
                const uName = []
                filterByUser.forEach((x) => (uName.push(x.userName)))
                filterByUser.forEach((x) => (


                    // searchArray.includes(x) ? <></> : searchArray.push(
                    //     {
                    //         result: x.userName,
                    //         origin: "Username",
                    //         number: filterByUser?.length
                    //     }
                    // )

                    addToSuggestions(
                        x.id,
                        x.userName,
                        "Username",
                        uName.filter((item) =>
                            item.toUpperCase().includes(x.userName.toUpperCase())).length)
                ))
            }

            if (searchArray.length === 0 || searchValue === "") {
                setFilterResults("")
            } else {
                searchArray.sort((a, b) => b.number - a.number)
                const slicedArray = searchArray.slice(0, 10)
                setFilterResults(slicedArray)
            }
        }, [searchValue]
    )

    return <>

        <>
            {filterResults === "" ? "" : filterResults.map((x) => (
                <>
                    {x.result === searchValue ? "" :
                        // <div
                        //     style={{
                        //         width: '800px',
                        //         marginLeft: "200px",
                        //     }}
                        // >
                        //     <div>
                        //         <div>
                        //             <section className="d-flex justify-content-start"
                        //                 onClick={
                        //                     () => {
                        //                         setSearchValue(x.result)
                        //                         document.getElementById("searchBar").value = x.result
                        //                     }
                        //                 }>
                        //                 {/* matching search result */}
                        //                 <div style={{ margin: "5px 12px", width: "210px" }}>
                        //                     {x.result}</div>
                        //                 {/* number of search results */}
                        //                 <div style={{ margin: "5px 12px", width: "150px" }}>
                        //                     {`${x.number} results found`}</div>
                        //                 {/* search origin */}
                        //                 <div style={{ margin: "5px 12px", width: "200px" }}>
                        //                     {`from ${x.origin}`}</div>
                        //             </section>
                        //         </div>
                        //     </div>
                        // </div>

                        <Card
                            style={{ width: "100%" }}
                            id={`result--${x.idNo}`}>
                            <CardBody className="d-flex pb-1 mb-0">
                                <CardText style={{ marginRight: "20px" }}>{x.result}</CardText>
                                <CardText style={{ marginRight: "20px" }}>{`${x.number} results found`}</CardText>
                                <CardText >{`from ${x.origin}`}</CardText>
                            </CardBody>
                        </Card>

                    }





                </>
            ))
            }

        </>
    </>
}