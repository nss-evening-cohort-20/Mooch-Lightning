import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS, SLATE, WHITE } from '../../Utils/Constants';
import { Button, Container, Form, FormGroup, Input, Label, Navbar } from 'reactstrap';
import './CreateMoochPostView.css';
import { getCurrentUser } from '../../Utils/Constants';
import { NavBar } from '../../Layout/NavBar/NavBar';

export const CreateMoochPostView = () => {
  const [moochId, setMoochId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [membershipArray, setMembershipArray] = useState([]);

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${ROUTE_CONSTANTS.API_URL}/User/usermembershiplist/${currentUser.id}`
      );
      const array = await response.json();
      setMembershipArray(array);
      console.log('MembershipArray', membershipArray);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const membershipPost = {
      UserMembershipId: moochId,
      isMooched: false,
      availabilityStartDate: startDate,
      AvailabilityendDate: endDate,
    };

    fetch(`${ROUTE_CONSTANTS.API_URL}/MoochPost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(membershipPost),
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <NavBar />
      <Container className="form-align">
        <div className="App" style={{ backgroundColor: `${SLATE}` }}>
          <label>
            <span
              style={{
                textAlign: 'left',
                fontSize: '25px',
                marginLeft: '15px',
                color: `${WHITE}`,
              }}
            >
              Share a Membership For Mooching
            </span>
          </label>
          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="select" style={{ color: `${WHITE}`, fontWeight: "600" }}>
                Select
              </Label>
              <Input
                style={{ backgroundColor: `${SLATE}`, color: `${WHITE}` }}
                id="select"
                name="Mooch Request"
                type="select"
                onChange={(e) => setMoochId(e.target.value)}
              >
                <option value="">-- Choose --</option>
                {membershipArray.map((m) => {
                  return (
                    <option key={m.id} value={m.id}>
                      {m.organization + ' ' + '-' + ' ' + m.description}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-around">
              <FormGroup>
                <Label for="startDate" style={{ color: `${WHITE}`, fontWeight: "600" }}>
                  Start Date
                </Label>
                <Input
                  style={{ backgroundColor: `${SLATE}`, color: `${WHITE}` }}
                  id="startDate"
                  name="date"
                  type="date"
                  placeholder="date placeholder"
                  defaultValue={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="endDate" style={{ color: `${WHITE}` }}>
                  End Date
                </Label>
                <Input
                  style={{ backgroundColor: `${SLATE}`, color: `${WHITE}` }}
                  id="endDate"
                  name="date"
                  placeholder="date placeholder"
                  type="date"
                  defaultValue={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormGroup>
            </div>
            <Button className="Btn">Submit</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
