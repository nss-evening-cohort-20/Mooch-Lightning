import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrganizationView.css';
import { Card, CardGroup, CardImg, CardBody, CardText } from 'reactstrap';
import { Title } from './Title';
import { NavBar } from '../../Layout/NavBar/NavBar';
import { SLATE } from '../../Utils/Constants';

export const OrganizationView = () => {
  const getOrgUrl = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setOrgUrl(fetchJson.memberships);
  };
  const { id } = useParams();
  const url = `https://localhost:7082/api/Organization/withMembership/${id}`;

  // image for memberships
  const [orgUrl, setOrgUrl] = useState([]);

  useEffect(() => {
    getOrgUrl();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ marginTop: '6rem' }} >
        <Title />

        <CardGroup className="d-flex justify-content-around mx-auto" style={{ width: '40%', height: '50%' }}>
          {orgUrl.map((e) => {
            return (
              <>
                <Card
                  key={e.id}
                  style={{
                    backgroundColor: `${SLATE}`,
                    marginRight: "20px",
                    color: "#a9a9a9 "
                  }}
                  className="card, card-align"
                >
                  <CardImg
                    alt="Card image cap"
                    src={e.imageUrl}
                    top
                    width="100%"
                  />
                  <CardBody>
                    <CardText className="card-text"
                      style={{
                        textAlign: "center",
                        fontWeight: "bolder",
                        color: "#808080"
                      }}>{e.description}
                    </CardText>
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
