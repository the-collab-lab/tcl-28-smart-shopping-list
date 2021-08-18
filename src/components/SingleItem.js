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
  } = props;

  const mlsPerDay = 24 * 60 * 60 * 1000;

  const daysPassedSincePurchase = Math.round(
    (Date.now() - lastPurchasedDate) / mlsPerDay,
  );

  let bgColor;
  let aria;
  if (daysPassedSincePurchase <= daysUntilPurchase) {
    bgColor = 'green';
    aria = 'buy soon';
  } else if (daysPassedSincePurchase > 7 && daysPassedSincePurchase < 30) {
    bgColor = 'orange';
    aria = 'buy kind of soon';
  } else if (daysPassedSincePurchase > 30 && daysPassedSincePurchase < 40) {
    bgColor = 'red';
    aria = 'wait a while before buying';
  } else if (daysPassedSincePurchase >= 40) {
    bgColor = 'gray';
    aria = "you haven't bought this in a long time";
  }

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
    <div style={{ backgroundColor: bgColor }}>
      <label htmlFor={name} aria-checked={isPurchased}>
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
