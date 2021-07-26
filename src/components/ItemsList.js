import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [snapshot, loading, error] = useCollection(
    firestore.collection('items'),
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      firestore
        .collection('items')
        .where('token', '==', token)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.docs.map((doc) => setItems(doc.data().name));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  return (
    <div>
      {loading && <>Loading</>}
      {error && <>Error</>}
      {snapshot && (
        <>
          <h1>Collection:</h1>
          <ul>
            {/* {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))} */}

            <li>{items}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ItemsList;
