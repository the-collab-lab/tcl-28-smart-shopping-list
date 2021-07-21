import { useState, useEffect } from 'react';
import getToken from './lib/tokens';
import { firestore } from './lib/firebase';
import { useHistory } from 'react-router-dom';

const AddItem = () => {
  const [item, setItem] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [lastPurchasedDate, setLastPurchasedDate] = useState(null);
  const history = useHistory();

  // For testing purposes to make sure we can push new item to Firestore
  useEffect(() => {
    const token = getToken();
    localStorage.setItem('token', JSON.stringify(token));
  });

  // get a reference to the Firestore document
  const handleClick = async (e) => {
    e.preventDefault();
    const itemTemplate = {
      name: item,
      token: JSON.parse(localStorage.getItem('token')),
      frequency,
      lastPurchasedDate,
    };
    await firestore.collection('items').add(itemTemplate);

    alert(`Successfully added ${item} to your list!`);
    history.push('/list');
  };

  const handleChange = (e) => {
    if (e.target.name === 'item') {
      setItem(e.target.value);
    } else if (e.target.name === 'frequency') {
      setFrequency(e.target.value);
    }
  };

  return (
    <div>
      <h1>Smart Shopping List</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="item">Item Name:</label>
        <input
          type="text"
          name="item"
          id="item"
          value={item}
          placeholder="Type item here"
          onChange={handleChange}
        />
        <fieldset>
          <legend>How soon will you buy this again?</legend>
          <input
            type="radio"
            name="frequency"
            id="soon"
            value={7}
            onChange={handleChange}
          ></input>
          <label htmlFor="soon">Soon</label>
          <input
            type="radio"
            name="frequency"
            id="kind-of-soon"
            value={14}
            onChange={handleChange}
          ></input>
          <label htmlFor="kind-of-soon"> Kind of soon</label>
          <input
            type="radio"
            name="frequency"
            id="not-soon"
            value={30}
            onChange={handleChange}
          ></input>
          <label htmlFor="not-soon"> Not soon</label>
        </fieldset>
        <button type="submit">Add an item</button>
      </form>
    </div>
  );
};

export default AddItem;
