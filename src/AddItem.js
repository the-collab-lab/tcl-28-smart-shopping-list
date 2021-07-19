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
      console.log(item);
    } else if (e.target.name === 'frequency') {
      setFrequency(e.target.value);
      console.log(frequency);
    }
  };

  return (
    <div>
      <h1>Smart Shopping List</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="item">
          Item Name:
          <input
            type="text"
            name="item"
            value={item}
            placeholder="Type item here"
            onChange={handleChange}
          />
        </label>
        <fieldset>
          <legend>How soon will you buy this again?</legend>
          <label htmlFor="frequency">
            <input
              type="radio"
              name="frequency"
              value={7}
              onChange={handleChange}
            ></input>
            Soon
          </label>
          <label htmlFor="frequency">
            <input
              type="radio"
              name="frequency"
              value={14}
              onChange={handleChange}
            ></input>
            Kind of soon
          </label>
          <label htmlFor="frequency">
            <input
              type="radio"
              name="frequency"
              value={30}
              onChange={handleChange}
            ></input>
            Not soon
          </label>
        </fieldset>
        <button type="submit">Add an item</button>
      </form>
    </div>
  );
};

export default AddItem;

// Template for later:
// uid: item.uid,
// name: item.name,
// time: item.time,
