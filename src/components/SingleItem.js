import React, { useEffect } from 'react';
import { firestore } from '../lib/firebase';
import calculateEstimate from '../lib/estimates';
import swal from 'sweetalert';

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

  let bgColor;
  let aria;
  if (daysUntilPurchase <= 7) {
    bgColor = 'green';
    aria = 'buy soon';
  } else if (daysUntilPurchase > 7 && daysUntilPurchase < 30) {
    bgColor = 'orange';
    aria = 'buy kind of soon';
  } else if (daysUntilPurchase > 30 && daysUntilPurchase < 40) {
    bgColor = 'red';
    aria = 'wait a while before buying';
  } else {
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

  const handleDelete = async (e) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      await firestore.collection('items').doc(id).delete();
    }
  };

  return (
    <div style={{ backgroundColor: bgColor }}>
      <label htmlFor={name} aria-checked={isPurchased} aria-label={aria}>
        <input
          type="checkbox"
          id={name}
          checked={isPurchased}
          onChange={handleChange}
        />
        {name} - {daysUntilPurchase}
      </label>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SingleItem;
