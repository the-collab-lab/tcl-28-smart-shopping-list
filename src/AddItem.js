import { firestore } from './lib/firebase';

const AddItem = () => (item) => {
  // get a reference to the Firestore document
  const handleClick = async () => {
    const itemTemplate = {
      uid: item.uid,
      name: item.name,
      time: item.time,
    };
    await firestore().collection('items').add(itemTemplate);
  };

  return <button onClick={handleClick}>Add an item</button>;
};

export default AddItem;
