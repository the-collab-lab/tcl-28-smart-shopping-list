import { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import GreenButton from './GreenButton';

const AddItem = () => {
  const [item, setItem] = useState('');
  const [frequency, setFrequency] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) history.push('/');
  });

  // get a reference to the Firestore document
  const handleClick = async (e) => {
    e.preventDefault();

    const formattedItem = item.replace(/[\W_]+/g, '').toLowerCase();

    const token = localStorage.getItem('token');

    let alreadyHave = false;

    await firestore
      .collection('items')
      .where('token', '==', token)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const formattedElem = doc
            .data()
            .name.replace(/[\W_]+/g, '')
            .toLowerCase();
          if (formattedElem === formattedItem) {
            alert('You have already added this item!');
            alreadyHave = true;
          }
        });
      })
      .catch((error) => {
        console.log('Error adding to list: ', error);
      });

    if (!alreadyHave) {
      const itemTemplate = {
        name: item,
        token,
        frequency,
        lastPurchasedDate: null,
        isPurchased: false,
        numberOfPurchases: 0,
        daysUntilPurchase: frequency,
      };

      await firestore.collection('items').add(itemTemplate);

      alert(`Successfully added ${item} to your list!`);
      history.push('/list');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'item') {
      setItem(e.target.value);
    } else if (e.target.name === 'frequency') {
      setFrequency(Number(e.target.value));
    }
  };

  // created this function to provide to the button component - it redirects the user to the list page
  const navigateToList = () => history.push('/list');

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
          required
        />
        <fieldset>
          <legend>How soon will you buy this again?</legend>
          <input
            type="radio"
            name="frequency"
            id="soon"
            value={7}
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="soon">Soon</label>
          <input
            type="radio"
            name="frequency"
            id="kind-of-soon"
            value={14}
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="kind-of-soon"> Kind of soon</label>
          <input
            type="radio"
            name="frequency"
            id="not-soon"
            value={30}
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="not-soon"> Not soon</label>
        </fieldset>
        <GreenButton
          type="submit"
          clickFunction={item && frequency && handleClick}
          btnText="Add Item"
        />
      </form>
      <GreenButton
        type="submit"
        clickFunction={navigateToList}
        btnText="View List"
      />
    </div>
  );
};

export default AddItem;
