import { firestore } from './lib/firebase';

const AddItem = () => {
  // get a reference to the Firestore document
  const handleClick = async () => {
    const itemTemplate = {
      name: 'New item',
      date: Date.now(),
    };
    await firestore.collection('items').add(itemTemplate);
  };

  return <button onClick={handleClick}>Add an item</button>;
};

export default AddItem;

// Template for later:
// uid: item.uid,
// name: item.name,
// time: item.time,
