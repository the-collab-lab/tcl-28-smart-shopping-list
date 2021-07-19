import { useState } from 'react';
import { firestore } from './lib/firebase';

const AddItem = () => {
  const [item, setItem] = useState('');

  // get a reference to the Firestore document
  const handleClick = async () => {
    const itemTemplate = {
      name: 'New item',
      date: Date.now(),
    };
    await firestore.collection('items').add(itemTemplate);
  };

  return (
    <div>
      <h1>Smart Shopping List</h1>
      <form>
        <label for="item">
          Item Name:
          <input
            type="text"
            name="item"
            value={item}
            placeholder="Type item here"
          />
        </label>
        <fieldset>
          <legend>How soon will you buy this again?</legend>
          <label for="frequency">
            <input type="radio" name="frequency" value={7}></input>
            Soon
          </label>
          <label for="frequency">
            <input type="radio" name="frequency" value={14}></input>
            Kind of soon
          </label>
          <label for="frequency">
            <input type="radio" name="frequency" value={30}></input>
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
