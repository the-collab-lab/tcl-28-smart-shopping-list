import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import SingleItem from './SingleItem';
import { useState, useEffect } from 'react';

const ItemsList = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  // Get items by token and sort them in ascending order by daysUntilPurchase
  const getItems = async () => {
    await firestore
      .collection('items')
      .where('token', '==', token)
      .orderBy('daysUntilPurchase', 'asc')
      .get()
      .then((data) => {
        setSortedItems(data.docs);
      })
      .catch((err) => console.error(err));
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const addItem = () => {
    history.push('/add');
  };

  return (
    <div>
      <h1>Collection:</h1>
      <label htmlFor="search">Filter Items</label>
      <input
        type="text"
        id="search"
        placeholder="Start typing here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && <button onClick={() => setSearch('')}>X</button>}
      {sortedItems && (
        <>
          {!sortedItems.length ? (
            <>
              <h2>Your shopping list is currently empty.</h2>
              <button onClick={addItem}>Add Item</button>
            </>
          ) : (
            <>
              {sortedItems
                .filter((doc) =>
                  doc.data().name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((doc, index) => (
                  <SingleItem key={index} {...doc.data()} id={doc.id} />
                ))}
            </>
          )}
        </>
      )}
      <button onClick={removeToken}>clear token</button>
    </div>
  );
};

export default ItemsList;
