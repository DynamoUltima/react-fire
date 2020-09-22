import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './components/store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded,  } from "react-redux-firebase";
import fbConfig from './config/fbConfig';
import firebase from "firebase/app"



const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData, firebase) => { // how profiles are stored in database
    const { user } = userData
    return {
      email: user.email
    }
  }
}



const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig),
  ),
);



const rrfProps = {
  firebase,
  config: rrfConfig,
  // config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  presence: 'presence',
  sessions: 'sessions'
};


function AuthIsLoaded({ children }) {
  
  const auth = useSelector(state => state.firebase.auth);
  
  const { uid } = useSelector(state => state.firebase.auth);
 
  
 
  const myUser= firebase.firestore().collection(`users`)
 .doc(`${uid}`).get()
 .then(  doc=> {
   const  theUser =  doc.data();
   return theUser
   //put some if statements to prevent null errors //uid ,doc 
  // console.log('hi', theUser)
 }).then(doc=>{
 
  console.log('hi', doc)
  //  myFirebase.updateProfile(doc);

 })
//  .catch(err=>console.log(err))
  

  

  console.log('hello', myUser)
  // firebase.updateProfile({ role: 'admin' });

  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
  return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
