import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
// import { useEffect, useState } from 'react';

const ItemsList = () => {
  const token = localStorage.getItem('token');
  const [snapshot, loading, error] = useCollection(
    firestore.collection('items').where('token', '==', token),
  );
  const history = useHistory();

  // made this function just for testing purposes so it's easier to clear
  // the token and go back to the home page
  const removeToken = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  // Alternate solution for filtering items by token:
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     firestore
  //       .collection('items')
  //       .where('token', '==', token)
  //       .onSnapshot(
  //         (querySnapshot) => {
  //           if (!querySnapshot.empty) {
  //             setItems(querySnapshot.docs.map((doc) => doc.data()));
  //           }
  //         },
  //         (error) => {
  //           console.log(error);
  //         },
  //       );
  //   }
  // });

  return (
    <div>
      {loading && <>Loading</>}
      {error && <>Error</>}
      {snapshot && (
        <>
          <h1>Collection:</h1>
          <ul>
            {snapshot.docs.map((doc, index) => (
              <li key={index}>{doc.data().name}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={removeToken}>clear token</button>
    </div>
  );
};

export default ItemsList;
