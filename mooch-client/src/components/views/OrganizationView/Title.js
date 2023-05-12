import { useEffect, useState } from 'react';
import './Title.css';
import { WHITE } from '../../Utils/Constants';

const url = 'https://localhost:7082/api/Organization/withMembership/1';

export const Title = () => {
  const [org, setOrg] = useState({ name: 'name', imageUrl: 'imageUrl' });

  const getOrganizationWithMembership = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setOrg(fetchJson);
  };

  useEffect(() => {
    getOrganizationWithMembership();
  }, []);

  return (
    <>
      <div className="container">
        <h1 style={{ color: `${WHITE}` }}> {org.name}</h1>
        <img className="img-size" src={org.imageUrl} />
      </div>
    </>
  );
};
