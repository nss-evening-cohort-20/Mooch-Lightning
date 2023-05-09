import { useEffect, useState } from 'react';

export const Title = () => {
  const [title, setTitle] = useState('Default Title');

  useEffect(() => {
    document.title = title;
  }, [title]);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={changeTitle} value={title} />
    </div>
  );
};
