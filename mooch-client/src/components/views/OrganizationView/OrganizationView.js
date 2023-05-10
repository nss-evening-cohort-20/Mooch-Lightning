import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../Utils/Constants';
import { useParams } from 'react-router-dom';
import './OrganizationView.css';
import { getCurrentUser } from '../../Utils/Constants';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from 'reactstrap';
import { Title } from './Title';

//const url = 'https://localhost:7082/api/Organization/withMembership/1';

export const OrganizationView = () => {
  //   const getOrganizationWithMembership = async () => {
  //     const fetchData = await fetch(url);
  //     const fetchJson = await fetchData.json();
  //     setTitleName(fetchJson);
  //   };

  //   const [titleName, setTitleName] = useState([]);

  //   useEffect(() => {
  //     getOrganizationWithMembership();
  //   }, []);

  return (
    <>
      <Title />
      <Card
        className="card-align"
        style={{
          width: '18rem',
        }}
      >
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Card subtitle
          </CardSubtitle>
        </CardBody>
        <img alt="Card cap" src="https://picsum.photos/318/180" width="100%" />
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card‘s content.
          </CardText>
          <CardLink href="#">Card Link</CardLink>
          <CardLink href="#">Another Link</CardLink>
        </CardBody>
      </Card>
    </>
  );
};
