import { useState, useEffect } from 'react';
import { firestore } from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import GreenButton from './GreenButton';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const useStyles = makeStyles({
  fieldset: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  radio: {
    position: 'absolute !important',
    clip: 'rect(0, 0, 0, 0)',
    height: 1,
    width: 1,
    border: 0,
    overflow: 'hidden',
    '&:focus + label': {
      boxShadow:
        'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1)',
      fontWeight: 'bold',
    },
    '&:checked + label': {
      boxShadow:
        'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1)',
      fontWeight: 'bold',
    },
  },
  radioLabel: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    boxShadow: 'none',
    margin: '8px 0px',
    padding: '8px 0px',
    textAlign: 'center',
    width: '120px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  soon: {
    backgroundColor: '#98D79A',
  },
  kindOfSoon: {
    backgroundColor: '#EBBB73',
  },
  notSoon: {
    backgroundColor: '#FFA770',
  },
});

const AddItem = () => {
  const [item, setItem] = useState('');
  const [frequency, setFrequency] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) history.push('/');
  });

  // get a reference to the Firestore document
  const handleClick = async (e) => {
    e.preventDefault();

    const formattedItem = item.replace(/[\W_]+/g, '').toLowerCase();

    const token = localStorage.getItem('token');

    let alreadyHave = false;

    await firestore
      .collection('items')
      .where('token', '==', token)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const formattedElem = doc
            .data()
            .name.replace(/[\W_]+/g, '')
            .toLowerCase();
          if (formattedElem === formattedItem) {
            swal('Oh no!', `You have already added ${item}.`, 'warning', {
              button: 'Go back',
            });
            alreadyHave = true;
          }
        });
      })
      .catch((error) => {
        console.log('Error adding to list: ', error);
      });

    if (!alreadyHave) {
      const itemTemplate = {
        name: item,
        token,
        frequency,
        lastPurchasedDate: null,
        isPurchased: false,
        numberOfPurchases: 0,
        daysUntilPurchase: frequency,
      };

      await firestore.collection('items').add(itemTemplate);

      swal('Success!', `You added ${item} to your list.`, 'success', {
        button: 'Ok',
      });
      history.push('/list');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'item') {
      setItem(e.target.value);
    } else if (e.target.name === 'frequency') {
      setFrequency(Number(e.target.value));
    }
  };

  const navigateToList = () => history.push('/list');
  const classes = useStyles();

  return (
    <div>
      <Header />
      <form onSubmit={handleClick}>
        <h2>Add new item</h2>
        <Input
          required
          name="item"
          placeholder="Item Name"
          value={item}
          onChange={handleChange}
        />
        <fieldset className={classes.fieldset}>
          <legend>How soon will you buy this again?</legend>
          <input
            type="radio"
            name="frequency"
            id="soon"
            value={7}
            onChange={handleChange}
            className={classes.radio}
            required
          ></input>
          <label
            className={`${classes.soon} ${classes.radioLabel}`}
            htmlFor="soon"
          >
            Soon
          </label>
          <input
            type="radio"
            name="frequency"
            id="kind-of-soon"
            value={14}
            onChange={handleChange}
            className={classes.radio}
            required
          ></input>
          <label
            className={`${classes.kindOfSoon} ${classes.radioLabel}`}
            htmlFor="kind-of-soon"
          >
            {' '}
            Kind of soon
          </label>
          <input
            type="radio"
            name="frequency"
            id="not-soon"
            value={30}
            onChange={handleChange}
            className={classes.radio}
            required
          ></input>
          <label
            className={`${classes.notSoon} ${classes.radioLabel}`}
            htmlFor="not-soon"
          >
            {' '}
            Not soon
          </label>
        </fieldset>
        <GreenButton
          type="submit"
          clickFunction={item && frequency && handleClick}
          btnText="Add Item"
        />
      </form>
      <GreenButton
        type="submit"
        clickFunction={navigateToList}
        btnText="View List"
      />
    </div>
  );
};

export default AddItem;
