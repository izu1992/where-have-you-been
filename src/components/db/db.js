import firebase from "firebase";

firebase.initializeApp({
    // apiKey: "AIzaSyAb_6AJP5qdgLtLlYjkhAjZ7PV5ClfOuqE",
    // authDomain: "clwroproject.firebaseapp.com",
    // databaseURL: "https://clwroproject.firebaseio.com",
    // projectId: "clwroproject",
    // storageBucket: "clwroproject.appspot.com",
    // messagingSenderId: "1028990301891"
  });

export const get = (url) => {
 return firebase
  .database()
  .ref(url)
  .once("value")
  .then(snapshot => snapshot.val());
}

export const update = (url, value) => {
 return firebase.database().ref(url).set(value);
}

export const create = (url, value) => {
 return firebase
   .database()
   .ref(url)
   .push(value)
   .then(response => response.getKey());
}

export const remove = (url) => {
  return firebase
    .database()
    .ref(url)
    .remove();
}

export default {
  get, update, create, remove
}
