import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivatedRoutes from './PrivatedRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { setIsAuthenticate, setUser } from '../store/users/userSlice'
import Register from '../pages/Register'
import Login from '../pages/Login'
import LoginWithPhone from '../pages/LoginWithPhone'
import Home from '../pages/Home'
import InsertCode from '../pages/InsertCode'

function AppRouter() {
  const { isAuthenticate, user } = useSelector( store => store.user )
  const [checking, setChecking] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged?.uid && !user) {
        dispatch(setIsAuthenticate(true))
        dispatch(setUser({ 
          id: userLogged.uid, 
          email: userLogged.email, 
          name: userLogged.displayName, 
          photoURL: userLogged.photoURL, 
          accessToken: userLogged.accessToken 
        }))
        // dispatch(setError(false))
      }
    })
    setChecking(false)
  }, [dispatch, user])

  if (checking) {
    return <div>Cargando...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route element={<PublicRoutes isAuthenticate={isAuthenticate} />}>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='login-phone' element={<LoginWithPhone />} />
            <Route path='insert-code' element={<InsertCode />} />
          </Route>
          <Route element={<PrivatedRoutes isAuthenticate={isAuthenticate} />}>
            <Route path='home' element={<Home />} />
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
