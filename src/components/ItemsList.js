import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';

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
      <button onClick={removeToken}>clear token</button> {/*See comment above*/}
    </div>
  );
};

export default ItemsList;
