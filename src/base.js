import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCyC06VmGzSxrS12Wmvqk9msPU-bjvaSZI',
  authDomain: 'catch-of-the-day-francisco.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-francisco-default-rtdb.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
