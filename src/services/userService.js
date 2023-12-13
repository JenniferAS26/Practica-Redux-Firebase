import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebaseConfig'

const collectionName = 'users'

export const createUserInCollection = async ( uid, newUser ) => {
  try {
    const newUserRef = doc(firestore, collectionName, uid)
    await setDoc(newUserRef, newUser)
    return {
      id: uid,
      ...newUser
    }
  } catch (error) {
    console.warn(error)
    return false
  }
}

export const getUserFromCollection = async ( uid ) => {
  try {
    const userRef = doc(firestore, collectionName, uid)
    const user = await getDoc(userRef)
    if (user.exists()) {
      return {
        id: user.id,
        ...user.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.warn(error)
    return false
  }
}

export const loginFromFirestore = async ( userData ) => {
  try {
    let userLogged = await getUserFromCollection(userData.uid)
    if (userLogged) {
      return userLogged
    } else {
      const newUser = {
        name: userData.displayName,
        photoUrl: userData.photoURL,
        accessToken: userData.accessToken
        /* Otra información de usuario */
      }
      await createUserInCollection(userData.uid, newUser)
      return {
        id: userData.uid,
        ...newUser
      }
    }
  } catch (error) {
    console.warn(error)
    return false
  }
}