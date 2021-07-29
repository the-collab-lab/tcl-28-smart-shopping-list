import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ItemsList = () => {
  const token = localStorage.getItem('token');

  const [snapshot, loading, error] = useCollection(
    firestore.collection('items').where('token', '==', token),
  );

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
    </div>
  );
};

export default ItemsList;
