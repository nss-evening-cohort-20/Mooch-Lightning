import { useEffect, useState } from "react"
import { DIRTY_WHITE, ROUTE_CONSTANTS, WHITE } from "../../Utils/Constants";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { formatDateToString } from "../../Utils/dateUtils";
import { MoochRequestModal } from "../MoochRequestView/MoochRequestModal";
import { MoochPostCard } from "./MoochPostCard";

export const MoochPostView = () => {
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [organizationTypeSuggestions, setorganizationTypeSuggestions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [moochPost, setMoochPost] = useState({
        id: 0,
        membershipImageUrl: "",
        organizationImageUrl: "",
        organizationName: "",
        membershipDescription: "",
        userName: "",
        userImageUrl: "",
        availabilityStartDate: "",
        availabilityEndDate: ""
    });

    const [modalData, setModalData] = useState({
        postId: 0,
        organizationName: "",
        organizationImageUrl: "",
        membershipDescription: "",
        membershipImageUrl: "",
        userName: "",
        userImageUrl: "",
        availabilityStartDate: "",
        availabilityEndDate: ""
    })

    const { moochId } = useParams();

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


    const handleRequestBtn = () => {
        setModalData(
            {
                postId: moochPost.id,
                organizationName: moochPost.organizationName,
                membershipDescription: moochPost.membershipDescription,
                membershipImageUrl: moochPost.membershipImageUrl,
                userName: moochPost.userName,
                userImageUrl: moochPost.userImageUrl,
                availabilityStartDate: moochPost.availabilityStartDate,
                availabilityEndDate: moochPost.availabilityEndDate
            })
        setModalIsOpen(true)
    }

    return <>
        <Container fluid className="pt-5">
            <Row md="2">
                <Col md="">
                    <section className="text-center" style={{ color: `${WHITE}` }}>
                        <h1 className="mb-4" style={{ color: `${WHITE}` }}>{moochPost?.userName}'s {moochPost?.organizationName} Mooch</h1>
                        <img src={moochPost?.organizationImageUrl} className="rounded shadow  mb-3" style={{ width: '40rem', height: '32rem', objectFit: 'cover' }} />
                        <h1 style={{ color: `${DIRTY_WHITE}` }}>{moochPost?.organizationName} - {moochPost?.membershipDescription}</h1>
                        <h5 className="mb-4" style={{ color: `${DIRTY_WHITE}` }}>{formatDateToString(moochPost?.availabilityStartDate)} - {formatDateToString(moochPost?.availabilityEndDate)}</h5>
                        <Button onClick={(c) => handleRequestBtn()}>
                            Request!
                        </Button>
                    </section>
                </Col>
                <Col className="">
                    <h4 className="mb-3" style={{ color: `${WHITE}` }}>More Mooches from this user</h4>
                    <div className="d-flex gap-3 flex-wrap justify-content-start mb-5">
                        {userSuggestions.map(post => {
                            return <MoochPostCard
                                key={`mp--${post.id}`}
                                id={post.id}
                                organizationImage={post.organizationImageUrl}
                                organizationName={post.organizationName}
                                membershipDescription={post.membershipDescription}
                                membershipImageUrl={post.membershipImageUrl}
                                userName={post.username}
                                userImageUrl={post.userImageUrl}
                                availabilityStartDate={post.availabilityStartDate}
                                availabilityEndDate={post.availabilityEndDate}
                                setModalData={setModalData}
                                setModalIsOpen={setModalIsOpen}
                            />
                        })}
                    </div>
                    <h4 className="mb-3" style={{ color: `${WHITE}` }} >Similar Mooches</h4>
                    <div className="d-flex gap-3 flex-wrap justify-content-start mb-5">
                        {organizationTypeSuggestions.map(post => {
                            return <>
                                <MoochPostCard
                                    key={`mp--${post.id}`}
                                    id={post.id}
                                    organizationName={post.organizationName}
                                    organizationImage={post.organizationImageUrl}
                                    membershipDescription={post.membershipDescription}
                                    membershipImageUrl={post.membershipImageUrl}
                                    userName={post.username}
                                    userImageUrl={post.userImageUrl}
                                    availabilityStartDate={post.availabilityStartDate}
                                    availabilityEndDate={post.availabilityEndDate}
                                    setModalData={setModalData}
                                    setModalIsOpen={setModalIsOpen}
                                />
                            </>
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
        <MoochRequestModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} modalData={modalData} />
    </>
};