import './Home.css';
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
  CardLink,
} from "reactstrap"
import { useEffect, useState } from "react"
import { DIRTY_WHITE, LIGHT_GRAY, SLATE, WHITE } from "../../Utils/Constants"
import { MoochRequestModal } from "../MoochRequestView/MoochRequestModal"
import { useNavigate } from "react-router-dom"

export const MoochPost = ({
  id,
  typeId,
  organizationId,
  organizationName,
  organizationImage,
  membershipDescription,
  membershipImageUrl,
  userName,
  userImageUrl,
  availabilityStartDate,
  availabilityEndDate,
  setBackground,
  setModalData,
  setModalIsOpen,
}) => {
  let startDate = new Date(availabilityStartDate);
  let endDate = new Date(availabilityEndDate);

  const [moochBtnHovered, setMoochBtnHovered] = useState(false)
  const [suggBtnHovered, setSuggBtnHovered] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const navigate = useNavigate()

  const handleRequestBtn = () => {
    setModalData(
      {
        postId: id,
        organizationName: organizationName,
        membershipDescription: membershipDescription,
        membershipImageUrl: membershipImageUrl,
        userName: userName,
        userImageUrl: userImageUrl,
        availabilityStartDate: availabilityStartDate,
        availabilityEndDate: availabilityEndDate
      })
    setModalIsOpen(true)
  }

  return (
    <>
      <div style={{ opacity: isCardHovered ? '1' : `.8` }}>
        <Card
          style={{
            backgroundColor: `${SLATE}`,
            width: '15rem',
            transform: isCardHovered ? 'scale(1.05)' : '',
            transition: 'transform .2s',
            boxShadow: isCardHovered
              ? `0px 0px 5px 3px ${LIGHT_GRAY}`
              : '2px 2px 5px 1px black',
            border: isCardHovered
              ? `2px solid ${LIGHT_GRAY}`
              : '2px solid #2A2B37',
          }}
          onMouseEnter={() => {
            setIsCardHovered(true);
            setBackground({
              idNo: typeId,
              img: organizationImage,
            });
          }}
          onMouseLeave={() => {
            setIsCardHovered(false);
            setBackground({
              id: 0,
              img: 'none',
            });
          }}
        >
          <img
            alt="Card"
            onClick={() => navigate(`OrganizationView/${organizationId}`)}
            src={organizationImage}
            style={{
              height: '150px',
            }}
          />
          <CardBody>
            <CardTitle
              tag="h4"
              style={{ color: `${WHITE}` }}
              onClick={() => navigate(`OrganizationView/${organizationId}`)}
            >
              {organizationName}
              <p
                style={{
                  color: `${DIRTY_WHITE}}`,
                  fontSize: '14px',
                  display: 'block',
                }}
              >
                {membershipDescription}
              </p>
              <p
                style={{
                  color: `${DIRTY_WHITE}}`,
                  fontSize: '14px',
                  display: 'block',
                }}
              >
                Shared By: {userName}
              </p>
            </CardTitle>
          </CardBody>
          <ListGroup
            flush
            style={{
              backgroundColor: `${SLATE}`,
              borderWidth: '1px 0px',
              borderColor: 'lightgray',
              borderStyle: 'solid',
            }}
          >
            <ListGroupItem
              style={{ backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}` }}
            >
              Start Date: <span>{startDate.toLocaleDateString()}</span>
            </ListGroupItem>
            <ListGroupItem
              style={{ backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}` }}
            >
              End Date: <span>{endDate.toLocaleDateString()}</span>
            </ListGroupItem>
          </ListGroup>
          <CardBody className="d-flex justify-content-between">
            <Button
              style={{
                backgroundColor: moochBtnHovered ? `${DIRTY_WHITE}` : `${SLATE}`,
                color: moochBtnHovered ? `${SLATE}` : `${DIRTY_WHITE}`,
                fontFamily: 'Vina Sans, cursive',
                fontSize: '18px',
                letterSpacing: '0.7px',
              }}
              onClick={handleRequestBtn}
              onMouseEnter={() => {
                setMoochBtnHovered(true)
              }}
              onMouseLeave={() => {
                setMoochBtnHovered(false)
              }}
            >
              Mooch!
            </Button>
            <Button
              style={{
                backgroundColor: suggBtnHovered ? `${DIRTY_WHITE}` : `${SLATE}`,
                color: suggBtnHovered ? `${SLATE}` : `${DIRTY_WHITE}`,
                fontFamily: 'Vina Sans, cursive',
                fontSize: "18px",
                letterSpacing: "0.7px",
              }}
              onClick={() => navigate(`mooch-details/${id}`)}
              onMouseEnter={
                () => {
                  setSuggBtnHovered(true)
                }}
              onMouseLeave={
                () => {
                  setSuggBtnHovered(false)
                }}
            >
              View Similar
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
