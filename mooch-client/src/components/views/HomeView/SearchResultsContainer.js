import { useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultsContainer = ({ searchValue, setSearchValue, madeSelection, setMadeSelection }) => {
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

    useEffect(
        () => {
            filterResults.length > 0 ? setMadeSelection(true) : setMadeSelection(false)
        }, [filterResults]
    )
    return <>

        <>
            {filterResults === "" ? "" : filterResults.map((x) => (
                <>
                    <SearchResult
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        idNo={x.idNo}
                        result={x.result}
                        number={x.number}
                        origin={x.origin}
                    />
                </>
            ))
            }

        </>
    </>
}