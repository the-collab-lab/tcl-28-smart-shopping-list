import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import SingleItem from './SingleItem';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import useStyles from '../themes/SingleItemStyles';

const ItemsList = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const classes = useStyles();

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
      <label htmlFor="search">Filter Items</label>
      <input
        type="text"
        id="search"
        placeholder="Start typing here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <Button
          className={classes.deleteBtn}
          size="small"
          aria-label="clear search"
          onClick={() => setSearch('')}
        >
          X
        </Button>
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
