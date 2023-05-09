import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../Utils/Constants';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

import { getCurrentUser } from '../../Utils/Constants';
import { formatDateToString } from '../../Utils/dateUtils';

export const MoochRequestModal = ({modalIsOpen, setModalIsOpen, modalData}) => {
  const [moochId, setMoochId] = useState('');
    const [requestData, setRequestData] = useState({
        startDate: "",
        endDate: "",
        userId: "",
        moochPostId: ""
    })

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const copy = {...requestData}
    copy.userId = currentUser.id;
    copy.moochPostId = modalData.postId;

    fetch(`${ROUTE_CONSTANTS.API_URL}/MoochRequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(copy),
    }).then(() => {
      navigate('/');
    });
  };

  const updateStateData = (evt) => {
    const copy = {...requestData};
    copy[evt.target.id] = evt.target.value;
    setRequestData(copy)
  }
  
  const toggle = () => setModalIsOpen(!modalIsOpen);

  return (
    <Modal isOpen={modalIsOpen} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Submit a Request for this Mooch</ModalHeader>
        <ModalBody>

    <Container className="form-align">
      <div className="App">
      <section className="text-center">
                    <img src={modalData.membershipImageUrl} />
                    <h1>{modalData.organizationName} - {modalData.membershipDescription}</h1>
                    <h5>{formatDateToString(modalData.availabilityStartDate)} - {formatDateToString(modalData.availabilityEndDate)}</h5>
             
                </section>
        <Form className="form" onSubmit={handleSubmit}>
          
          <div className="d-flex justify-content-around">
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="date"
                type="date"
                placeholder="date placeholder"
                defaultValue={requestData.startDate}
                onChange={(e) => updateStateData(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                id="endDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                defaultValue={requestData.endDate}
                onChange={(e) => updateStateData(e)}
                />
            </FormGroup>
          </div>
          <Button className="Btn" style={{marginRight: '2rem'}}>Submit</Button>
          <Button className="btn-danger" onClick={toggle}>Cancel</Button>
        </Form>
      </div>
    </Container>
    </ModalBody>
    </Modal>
  );
};