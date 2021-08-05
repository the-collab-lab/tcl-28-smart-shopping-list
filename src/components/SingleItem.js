import React, { useEffect } from 'react';
import { firestore } from '../lib/firebase';

const SingleItem = (props) => {
  const { name, isPurchased, id, token, frequency, lastPurchasedDate } = props;

  const updateIsPurchased = async (id) => {
    await firestore.collection('items').doc(id).set({
      isPurchased: false,
      lastPurchasedDate,
      token,
      name,
      frequency,
    });
  };

  setInterval(() => {
    const todaysDate = Date.now();
    const yesterday = todaysDate - 24 * 60 * 60 * 1000;
    if (lastPurchasedDate < yesterday) {
      updateIsPurchased(id);
    }
  }, 60000);

  useEffect(() => {
    const todaysDate = Date.now();
    const yesterday = todaysDate - 24 * 60 * 60 * 1000;
    if (lastPurchasedDate < yesterday) {
      updateIsPurchased(id);
    }
  });

  const handleChange = async (e) => {
    await firestore
      .collection('items')
      .doc(id)
      .set({
        isPurchased: !isPurchased,
        lastPurchasedDate: !isPurchased ? Date.now() : lastPurchasedDate,
        token,
        name,
        frequency,
      });
  };

  return (
    <div>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          checked={isPurchased}
          onChange={handleChange}
        />
        {name}
      </label>
    </div>
  );
};

export default SingleItem;
