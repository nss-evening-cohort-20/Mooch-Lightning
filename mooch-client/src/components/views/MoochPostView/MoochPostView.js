import { useEffect, useState } from "react"
import { ROUTE_CONSTANTS } from "../../Utils/Constants";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { MoochPost } from "./MoochPost";
import { formatDateToString } from "../../Utils/dateUtils";

export const MoochPostView = () => {
    const [moochPost, setMoochPost] = useState();
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [organizationTypeSuggestions, setorganizationTypeSuggestions] = useState([]);

    const { moochId } = useParams();

    //console.log(userSuggestions)
    console.log(organizationTypeSuggestions)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${ROUTE_CONSTANTS.API_URL}/MoochPost/${moochId}`)
            const jsonData = await data.json()
            setUserSuggestions(jsonData.userSuggestions)
            setorganizationTypeSuggestions(jsonData.organizationTypeSuggestions)
            delete jsonData.userSuggestions
            delete jsonData.organizationTypeSuggestions
            setMoochPost(jsonData)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
        }
        fetchData()
    }, [moochId])



    return <>
    <Container fluid className="text-muted pt-5">
        
        <Row md="2">
        <Col md="">
                <section className="text-center">
                    <h1>Mooch Post Details Page</h1>
                    <img src={moochPost?.membershipImageUrl} />
                    <h1>{moochPost?.organizationName} - {moochPost?.membershipDescription}</h1>
                    <h5>{formatDateToString(moochPost?.availabilityStartDate)} - {formatDateToString(moochPost?.availabilityEndDate)}</h5>
             
                </section>
            </Col>
        <Col className="">
                <h4>More Mooches from this user</h4>
            <div className="d-flex flex-wrap justify-content-start mb-5">

                    {userSuggestions.map(post => {
                        return <>
                    <MoochPost
                        key={`mp--${post.id}`}
                        id={post.id}
                        organizationName={post.organizationName}
                        membershipDescription={post.membershipDescription}
                        membershipImageUrl={post.membershipImageUrl}
                        userName={post.username}
                        userImageUrl={post.userImageUrl}
                        availabilityStartDate={post.availabilityStartDate}
                        availabilityEndDate={post.availabilityEndDate}
                        />
                        

                        </>
})}
            </div>
        <h4 className="text-left">Similar Mooches</h4>
        <div className="d-flex flex-wrap justify-content-start mb-5">
                {organizationTypeSuggestions.map(post => {
                    return <>
                    <MoochPost
                        key={`mp--${post.id}`}
                        id={post.id}
                        organizationName={post.organizationName}
                        membershipDescription={post.membershipDescription}
                        membershipImageUrl={post.membershipImageUrl}
                        userName={post.username}
                        userImageUrl={post.userImageUrl}
                        availabilityStartDate={post.availabilityStartDate}
                        availabilityEndDate={post.availabilityEndDate}
                        />
                        </>

                })}
        </div>
            </Col>
                </Row>
               

    </Container>
    </>
};