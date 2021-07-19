import { useState } from 'react';
import { firestore } from './lib/firebase';

const AddItem = () => {
  const [item, setItem] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [lastPurchasedDate, setLastPurchasedDate] = useState(null);

  const token = JSON.parse(localStorage.getItem('token'));

  // get a reference to the Firestore document
  const handleClick = async () => {
    const itemTemplate = {
      name: item,

      date: Date.now(),
    };
    await firestore.collection('items').add(itemTemplate);
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
        <button onClick={handleClick}>Add an item</button>
      </form>
    </div>
  );
};

export default AddItem;

// Template for later:
// uid: item.uid,
// name: item.name,
// time: item.time,
