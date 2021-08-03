import React, { useState } from 'react';
import { firestore } from '../lib/firebase';

const SingleItem = (props) => {
  const { name, isPurchased, id, token, frequency } = props;

  const handleChange = async (e) => {
    await firestore
      .collection('items')
      .doc(id)
      .set({
        isPurchased: !isPurchased,
        lastPurchasedDate: !isPurchased ? Date.now() : null,
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
