import React, { useEffect } from 'react';
import { firestore } from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const SingleItem = (props) => {
  const {
    name,
    isPurchased,
    id,
    token,
    frequency,
    lastPurchasedDate,
    numberOfPurchases,
    previousEstimate,
    daysUntilPurchase,
  } = props;

  const mlsPerDay = 86400000;

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
    console.log(name, frequency);
    const todaysDate = Date.now();
    const yesterday = todaysDate - 24 * 60 * 60 * 1000;
    if (lastPurchasedDate < yesterday) {
      updateIsPurchased(id);
    }
  });

  let latestInterval = 0;

  if (lastPurchasedDate) {
    latestInterval = Math.round((Date.now() - lastPurchasedDate) / mlsPerDay);
  }

  const handleChange = async (e) => {
    let nextPurchaseDate = calculateEstimate(
      previousEstimate,
      latestInterval,
      numberOfPurchases + 1,
    );

    await firestore
      .collection('items')
      .doc(id)
      .update({
        // tried .update() instead of .set()
        isPurchased: !isPurchased,
        lastPurchasedDate: !isPurchased ? Date.now() : lastPurchasedDate,
        numberOfPurchases: numberOfPurchases + 1,
        daysUntilPurchase: nextPurchaseDate,
      });
    // .set({
    //     isPurchased: !isPurchased,
    //     lastPurchasedDate: !isPurchased ? Date.now() : lastPurchasedDate,
    //     token,
    //     name,
    //     frequency,
    //   });
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
