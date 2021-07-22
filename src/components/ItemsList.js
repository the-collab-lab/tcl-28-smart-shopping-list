import { firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ItemsList = () => {
  const [snapshot, loading, error] = useCollection(
    firestore.collection('items'),
  );

  return (
    <div>
      {loading && <>Loading</>}
      {error && <>Error</>}
      {snapshot && (
        <>
          Collection:
          {snapshot.docs.map((doc, index) => (
            <pre key={index}>{JSON.stringify(doc.data())}</pre>
          ))}
        </>
      )}
    </div>
  );
};

export default ItemsList;
