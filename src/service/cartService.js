import firebase from 'firebase';

export const addToCart = (sub, date, time, seat) => {
  firebase.firestore().collection('cart').doc().set({
    sub: sub,
    date: date,
    time: time,
    seat: seat,
  });
};

export const deleteFromCart = (id) => {
  firebase
    .firestore()
    .collection('cart')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
