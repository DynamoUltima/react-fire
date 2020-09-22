import { useFirebase,  } from 'react-redux-firebase'
export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err)=>{
             dispatch({type:'LOGIN_ERROR',err})
        })

    }
}

export const signOut =()=>{

    return (dispatch,getState,{getFirebase})=>{
        const firebase =getFirebase()

        firebase.auth().signOut().then(()=>{
            dispatch({type:'SIGNOUT_SUCCESS'});
        })
    }
}

export const  signUp=(newUser)=>{
    return  (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase =getFirebase();
        const firestore =getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            //we want user document ot have doc id the same as user id not random id if we were to use .add()
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                initials:newUser.firstName[0]+newUser.lastName[0]
            })

        }).then(()=>{
            const firebase = useFirebase()
            firebase.updateProfile(
                {firstName:newUser.firstName,
                lastName:newUser.lastName,
                initials:newUser.firstName[0]+newUser.lastName[0]});
                console.log('worked')
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}