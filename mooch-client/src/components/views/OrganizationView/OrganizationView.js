import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../Utils/Constants';
import { useParams } from 'react-router-dom';
import './OrganizationView.css';
import { getCurrentUser } from '../../Utils/Constants';
import {
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
} from 'reactstrap';
import { Title } from './Title';

const url = 'https://localhost:7082/api/Organization/withMembership/1';

export const OrganizationView = () => {
  const getOrgUrl = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setOrgUrl(fetchJson.memberships);
  };
  // image for memberships
  const [orgUrl, setOrgUrl] = useState([]);

  useEffect(() => {
    getOrgUrl();
  }, []);

  return (
    <>
      <Title />
      <div className="d-flex justify-content-around">
        <CardGroup style={{ width: '40%', height: '50%' }}>
          {orgUrl.map((e) => {
            return (
              <>
                <Card
                  style={{ backgroundColor: '#DCDCDC' }}
                  className="card, card-align"
                >
                  <CardImg
                    alt="Card image cap"
                    src={e.imageUrl}
                    top
                    width="100%"
                  />
                  <CardBody>
                    <CardText className="card-text">{e.description}</CardText>
                  </CardBody>
                </Card>
              </>
            );
          })}
        </CardGroup>
      </div>
    </>
  );
};
