import React, { useEffect } from 'react';
import { firestore } from '../lib/firebase';
import calculateEstimate from '../lib/estimates';
import { InputLabel, Button } from '@material-ui/core';
import useStyles from '../themes/SingleItemStyles';

const SingleItem = (props) => {
  const classes = useStyles();
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
    bgColor = '#98D79A';
    aria = 'buy soon';
  } else if (daysUntilPurchase > 7 && daysUntilPurchase < 30) {
    bgColor = '#EBBB73';
    aria = 'buy kind of soon';
  } else if (daysUntilPurchase >= 30 && daysUntilPurchase < 40) {
    bgColor = '#FFA770';
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
    <div className={classes.container}>
      <InputLabel
        className={classes.label}
        style={{ backgroundColor: bgColor }}
        htmlFor={name}
        aria-checked={isPurchased}
        aria-label={aria}
      >
        <input
          type="checkbox"
          id={name}
          checked={isPurchased}
          onChange={handleChange}
        />
        {name}
      </InputLabel>
      <Button
        className={classes.deleteBtn}
        aria-label="delete"
        size="small"
        onClick={handleDelete}
      >
        X
      </Button>
    </div>
  );
};

export default SingleItem;
