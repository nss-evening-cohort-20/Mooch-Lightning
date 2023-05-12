import { useState, useEffect } from 'react';
import { MoochPost } from './MoochPost';

export const MoochPostContainer = ({
  orgType,
  isClicked,
  searchValue,
  setSearchValue,
  setBackground,
}) => {
  const url = 'https://localhost:7082/api/MoochPost/search_results?search=';

  const getSearchResults = async () => {
    const fetchData = await fetch(url);
    const fetchJson = await fetchData.json();
    setSearchResults(fetchJson);
  };

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getSearchResults();
  }, []);

  const [filterResults, setFilterResults] = useState([]);

  useEffect(() => {
    const copy = searchResults.map((x) => ({ ...x }));
    const filteredSearch = copy.filter((obj) => obj.type === orgType);
    setFilterResults(filteredSearch);
  }, [searchResults]);

  useEffect(() => {
    let editValue = '';

    if (
      (searchValue !== '' && searchValue.includes('(')) ||
      searchValue.includes(')')
    ) {
      editValue = searchValue.replace('(', '%28');
      editValue = editValue.replace(')', '%29');
      editValue = editValue.replace('+', '%2B');
    } else {
      editValue = searchValue;
    }

    const searchUrl = `${url}${editValue}`;

    const getNewSearchResults = async () => {
      const fetchData = await fetch(searchUrl);
      const fetchJson = await fetchData.json();
      setSearchResults(fetchJson);
    };

    getNewSearchResults();
    document.getElementById('searchBar').value = '';
    setSearchValue('');
  }, [isClicked]);

  return (
    <>
      {filterResults.map((search) => (
        <>
          <div
            style={{
              margin: '10px 15px',
            }}
          >
            <MoochPost
              key={`mp--${search.id}`}
              id={search.id}
              organizationId={search.organizationId}
              typeId={search.typeId}
              organizationName={search.organizationName}
              organizationImage={search.organizationImageUrl}
              membershipDescription={search.membershipDescription}
              membershipImageUrl={search.membershipImageUrl}
              userName={search.userName}
              userImageUrl={search.userImageUrl}
              availabilityStartDate={search.availabilityStartDate}
              availabilityEndDate={search.availabilityEndDate}
              setBackground={setBackground}
            />
          </div>
        </>
      ))}
    </>
  );
};
