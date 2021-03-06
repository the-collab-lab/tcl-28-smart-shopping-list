import { useState } from 'react';
import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import SingleItem from './SingleItem';
import Input from './Input';
import GreenButton from './GreenButton';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

export const useStyles = makeStyles({
  basket: {
    marginTop: 20,
    height: 200,
  },
  // these are the SingleItem styles
  container: {
    width: '75%',
    margin: '16px auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    width: '60%',
    padding: '8px',
    color: 'rgb(0, 0, 0)',
    textAlign: 'left',
  },
  deleteBtn: {
    variant: 'contained',
    backgroundColor: '#80727B',
    color: '#fefefe',
    height: 'auto',
    margin: '0 8px',
    '& :hover': {
      backgroundColor: '#FFADAD',
      color: '#000',
    },
  },
  list: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    padding: 0,
    flexDirection: 'column',
    listStyle: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width:600px)': {
      flexDirection: 'row',
    },
  },
  listItem: {
    padding: '.8rem',
    margin: '.8rem',
    borderRadius: '5px',
    '@media (max-width:600px)': {
      width: '80%',
      margin: '.5rem',
      padding: '.3rem',
    },
  },
});

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
      <Header />
      {loading && <>Loading</>}
      {error && <>Error</>}
      <Typography variant="h5">Your List:</Typography>
      <Input
        name="search"
        placeholder="Search List"
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
              <h2>Your shopping list is empty!</h2>
              <GreenButton clickFunction={addItem} btnText="Add an Item" />
            </>
          ) : (
            <>
              <ul className={classes.list}>
                <li
                  style={{
                    backgroundColor: '#98D79A',
                  }}
                  className={classes.listItem}
                >
                  Need to buy soon
                </li>
                <li
                  style={{
                    backgroundColor: '#EBBB73',
                  }}
                  className={classes.listItem}
                >
                  Kind of soon
                </li>
                <li
                  style={{
                    backgroundColor: '#FFA770',
                  }}
                  className={classes.listItem}
                >
                  Not soon
                </li>
              </ul>
              {snapshot.docs
                .filter((doc) =>
                  doc.data().name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((doc, index) => (
                  <SingleItem key={index} {...doc.data()} id={doc.id} />
                ))}
              <GreenButton clickFunction={addItem} btnText="Add an Item" />
            </>
          )}
        </>
      )}
      <GreenButton clickFunction={removeToken} btnText="Exit List" />
      {snapshot && !snapshot.docs.length ? (
        <div>
          <img src="img/basket.svg" alt="" className={classes.basket} />
        </div>
      ) : (
        <div>
          <img src="img/full-basket.png" alt="" className={classes.basket} />
        </div>
      )}
    </div>
  );
};

export default ItemsList;
