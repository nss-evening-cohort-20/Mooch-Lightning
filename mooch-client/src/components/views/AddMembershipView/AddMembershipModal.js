import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIRTY_WHITE, ROUTE_CONSTANTS, SLATE, WHITE } from '../../Utils/Constants';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

import { getCurrentUser } from '../../Utils/Constants';
import { formatDateToString } from '../../Utils/dateUtils';

export const AddMembershipModal = ({modalIsOpen, setModalIsOpen, reloadData }) => {
    const [requestData, setRequestData] = useState({
        startDate: "",
        endDate: "",
        userId: "",
        moochPostId: ""
    })
    const [organizationId, setOrganizationId] = useState(0)
    const [membershipId, setMembershipId] = useState(0)
    const [orgList, setOrgList] = useState([])
    const [membershipList, setMembershipList] = useState([])

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchOrgs = async () => {
        const data = await fetch(`${ROUTE_CONSTANTS.API_URL}/Organization/organiztion_names`)
        setOrgList(await data.json())
    };
    fetchOrgs();
  }, [])

  useEffect(() => {
    const fetchMemberships = async () => {
        const data = await fetch(`${ROUTE_CONSTANTS.API_URL}/Organization/withMembership/${organizationId}`)
        const jsonData = await data.json()

        setMembershipList(jsonData.memberships)
    };
    if (organizationId) {
        fetchMemberships();
    } else {
        setMembershipList([])
        setMembershipId(0)
    }
  }, [organizationId])


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestObj = {
        userId: currentUser.id,
        membershipId: membershipId
    }

    fetch(`${ROUTE_CONSTANTS.API_URL}/UserMembership`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObj),
    }).then(() => {
        setModalIsOpen(false)
        reloadData()
    });
  };
  
  const toggle = () => setModalIsOpen(!modalIsOpen);

  return (
    <Modal isOpen={modalIsOpen} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} style={{backgroundColor: `${SLATE}`, color: `${WHITE}`}}>Add a membership to your Profile</ModalHeader>
        <ModalBody style={{backgroundColor: `${SLATE}`}}>

    <Container className="form-align">
      <div className="App">
        <Form className="form" >
          
          <div className="d-flex justify-content-around">
          <FormGroup>
            <Label for="organization" style={{color: `${DIRTY_WHITE}`}}>Choose the Organization</Label>
            <Input
              id="organization"
              style={{backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}`, width: '20rem'}}
              name="organization"
              type="select"
              onChange={(e) => setOrganizationId(parseInt(e.target.value))}
            >
              <option value={0}>-- Choose --</option>
              {orgList.map((org) => {
                return (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="orgMemberships" style={{color: `${DIRTY_WHITE}`}}>Choose the Membership</Label>
            <Input
              id="orgMemberships"
              style={{backgroundColor: `${SLATE}`, color: `${DIRTY_WHITE}`, width: '20rem'}}
              name="orgMemberships"
              type="select"
              onChange={(e) => setMembershipId(parseInt(e.target.value))}
              disabled={membershipList.length > 0 ? false : true}
            >
              <option value={0}>-- Choose --</option>
              {membershipList.map((membership) => {
                return (
                  <option key={membership.id} value={membership.id}>
                    {membership.description}
                  </option>
                );
              })}
            </Input>
          </FormGroup>

          </div>
          <Button onClick={(e) => handleSubmit(e)}disabled={membershipId != 0 ? false : true} className="Btn" style={{marginRight: '2rem'}}>Add</Button>
          <Button className="btn-danger" onClick={toggle}>Cancel</Button>
        </Form>
      </div>
    </Container>
    </ModalBody>
    </Modal>
  );
};