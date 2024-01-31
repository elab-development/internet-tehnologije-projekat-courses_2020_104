import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './model';
import { getUser, login, logout, register } from './service/services';
import Loader from './components/Loader';
import HomeLayout from './components/HomeLayout';
import { Route, Routes } from 'react-router';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import UserCoursesPage from './pages/UserCoursesPage';
import UserCoursePage from './pages/UserCoursePage';
import AdminCoursesPage from './pages/AdminCoursesPage';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading) {
      return;
    }
    getUser()
      .then(setUser)
      .catch(err => { })
      .finally(() => setLoading(false))
  }, [loading])

  if (loading) {
    return (
      <div className='main'>
        <Loader />
      </div>
    )
  }
  if (!user) {
    return (
      <HomeLayout error={error} removeError={() => setError('')}>
        <Routes>
          <Route path='/register' element={<RegisterPage
            onSubmit={val => {
              register(val)
                .then(setUser)
                .catch(err => {
                  setError(err.message)
                })
            }}
          />} />
          <Route path='*' element={<LoginPage
            onLogin={(email, password) => {
              login(email, password)
                .then(setUser)
                .catch(err => {
                  setError(err.message)
                })
            }}
          />} />
        </Routes>
      </HomeLayout>
    )
  }
  if (user.type === 'admin') {
    return (
      <HomeLayout error={error} removeError={() => setError('')}>
        <Routes>
          <Route path='*' element={<AdminCoursesPage />} />
        </Routes>
      </HomeLayout>
    )
  }
  return (
    <div>
      <Navbar user={user} logout={() => {
        logout()
          .then(() => setUser(undefined))
      }} />
      <HomeLayout error={error} removeError={() => setError('')}>
        <Routes>
          <Route path='*' element={<UserCoursesPage />} />
          <Route path='course/:id' element={<UserCoursePage />} />
        </Routes>
      </HomeLayout>
    </div>
  );
}

export default App;
