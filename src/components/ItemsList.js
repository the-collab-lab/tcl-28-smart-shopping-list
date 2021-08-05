import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';

const ItemsList = () => {
  const token = localStorage.getItem('token');
  const [snapshot, loading, error] = useCollection(
    firestore.collection('items').where('token', '==', token),
  );
  const history = useHistory();

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
      {snapshot && (
        <>
          {!snapshot.docs.length ? (
            <>
              <h2>Your shopping list is currently empty.</h2>
              <button onClick={addItem}>Add Item</button>
            </>
          ) : (
            <ul>
              {snapshot.docs.map((doc, index) => (
                <li key={index}>{doc.data().name}</li>
              ))}
            </ul>
          )}
        </>
      )}
      <button onClick={removeToken}>clear token</button> {/*See comment above*/}
    </div>
  );
};

export default ItemsList;
