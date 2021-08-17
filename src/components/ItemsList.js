import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import SingleItem from './SingleItem';
import { useState } from 'react';

const ItemsList = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');

  const [snapshot, loading, error] = useCollection(
    firestore
      .collection('items')
      .where('token', '==', token)
      .orderBy('daysUntilPurchase', 'asc'),
  );

  const styles = {
    soon: 'green',
    kindOfSoon: 'orange',
    notSoSoon: 'red',
    inactive: 'gray',
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
      {loading && <>Loading</>}
      {error && <>Error</>}
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
                .map((doc, index) => {
                  if (doc.data().daysUntilPurchase <= 7) {
                    return (
                      <SingleItem
                        key={index}
                        {...doc.data()}
                        id={doc.id}
                        styles={styles.soon}
                      />
                    );
                  } else if (
                    doc.data().daysUntilPurchase > 7 &&
                    doc.data().daysUntilPurchase < 30
                  ) {
                    return (
                      <SingleItem
                        key={index}
                        {...doc.data()}
                        id={doc.id}
                        styles={styles.kindOfSoon}
                      />
                    );
                  } else if (doc.data().daysUntilPurchase >= 30) {
                    return (
                      <SingleItem
                        key={index}
                        {...doc.data()}
                        id={doc.id}
                        styles={styles.notSoSoon}
                      />
                    );
                  } else {
                    return (
                      <SingleItem
                        key={index}
                        {...doc.data()}
                        id={doc.id}
                        styles={styles.inactive}
                      />
                    );
                  }
                })}
            </>
          )}
        </>
      )}
      <button onClick={removeToken}>clear token</button>
    </div>
  );
};

export default ItemsList;
