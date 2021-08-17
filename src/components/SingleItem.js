import React, { useEffect } from 'react';
import { firestore } from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const SingleItem = (props) => {
  const {
    name,
    isPurchased,
    id,
    frequency,
    lastPurchasedDate,
    numberOfPurchases,
    daysUntilPurchase,
    styles,
  } = props;

  const mlsPerDay = 24 * 60 * 60 * 1000;

  const daysPassedSincePurchase = Math.round(
    (Date.now() - lastPurchasedDate) / mlsPerDay,
  );

  // let bgColor
  // if(daysPassedSincePurchase <= 7) {
  //   bgColor = 'green';
  // } else if(daysPassedSincePurchase > 7 &&
  // daysPassedSincePurchase < 30) {
  //   bgColor = 'orange';
  // } else if(daysPassedSincePurchase >= 30) {
  //   bgColor = 'red';
  // } else {
  //   bgColor = 'gray';
  // }

  const updateIsPurchased = async (id) => {
    await firestore.collection('items').doc(id).update({
      isPurchased: false,
    });
  };

  setInterval(() => {
    const todaysDate = Date.now();
    const yesterday = todaysDate - mlsPerDay;
    if (lastPurchasedDate && lastPurchasedDate < yesterday) {
      updateIsPurchased(id);
    }
  }, 60000);

  useEffect(() => {
    const todaysDate = Date.now();
    const yesterday = todaysDate - mlsPerDay;
    if (lastPurchasedDate && lastPurchasedDate < yesterday) {
      updateIsPurchased(id);
    }
  });

  let latestInterval = Number(frequency);

  if (lastPurchasedDate) {
    latestInterval = Math.round((Date.now() - lastPurchasedDate) / mlsPerDay);
  }

  const handleChange = async (e) => {
    let nextPurchaseDate;
    if (e.target.checked) {
      nextPurchaseDate = calculateEstimate(
        daysUntilPurchase,
        latestInterval,
        numberOfPurchases + 1,
      );
    }

    await firestore
      .collection('items')
      .doc(id)
      .update({
        isPurchased: !isPurchased,
        lastPurchasedDate: !isPurchased ? Date.now() : lastPurchasedDate,
        numberOfPurchases: !isPurchased
          ? numberOfPurchases + 1 || 1
          : numberOfPurchases,
        daysUntilPurchase: nextPurchaseDate || daysUntilPurchase,
      });
  };

  return (
    <div style={{ backgroundColor: styles }}>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          checked={isPurchased}
          onChange={handleChange}
        />
        {name} - {daysUntilPurchase}
      </label>
    </div>
  );
};

export default SingleItem;
