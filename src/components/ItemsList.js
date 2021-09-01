import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import SingleItem from './SingleItem';
import { useState } from 'react';
import Input from './Input';

const ItemsList = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');

  const [snapshot, loading, error] = useCollection(
    firestore
      .collection('items')
      .where('token', '==', token)
      .orderBy('daysUntilPurchase', 'asc')
      .orderBy('name', 'asc'),
  );

  const removeToken = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const addItem = () => {
    history.push('/add');
  };

  return (
    <div>
      {loading && <>Loading</>}
      {error && <>Error</>}
      <h1>Collection:</h1>
      <Input
        name="search"
        placeholder="Search List"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button aria-label="clear search" onClick={() => setSearch('')}>
          X
        </button>
      )}
      {snapshot && (
        <>
          {!snapshot.docs.length ? (
            <>
              <h2>Your shopping list is currently empty.</h2>
              <button onClick={addItem}>Add Item</button>
            </>
          ) : (
            <>
              {snapshot.docs
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
