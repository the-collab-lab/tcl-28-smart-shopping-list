import { firestore } from './lib/firebase';

const ItemsList = async (item) => {
  const itemRef = firestore().collection('items').doc(item.id);

  const itemsTemplate = {
    uid: item.uid,
    name: item.name,
    date: item.date,
    frequency: item.frequency,
  };
  return itemRef.set(itemsTemplate);
};

export default ItemsList;
