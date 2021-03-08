import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCRz-MvKZPEcsxTE1i2bsUrwtHDCkOQHdQ',
  authDomain: 'qwitter-febf6.firebaseapp.com',
  projectId: 'qwitter-febf6',
  storageBucket: 'qwitter-febf6.appspot.com',
  messagingSenderId: '565865231889',
  appId: '1:565865231889:web:7070c86b2440be215023b0'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
