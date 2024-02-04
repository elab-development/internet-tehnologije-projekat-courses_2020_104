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
import UserCoursesPage from './pages/student/UserCoursesPage';
import UserCoursePage from './pages/student/UserCoursePage';
import AdminCoursePage from './pages/admin/AdminCoursePage';
import AdminStatisticsPage from './pages/admin/AdminStatisticsPage';
import FactPage from './pages/FactPage';
import CourseEditPage from './components/CourseEditPage';

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
      <HomeLayout
        navbar={(
          <Navbar user={user} logout={() => {
            logout()
              .then(() => setUser(undefined))
          }} />
        )}
        error={error} removeError={() => setError('')}>

        <Routes>
          <Route path='*' element={<CourseEditPage />} />
          <Route path='course/:id' element={<AdminCoursePage admin />} />
          <Route path='fact' element={<FactPage />} />
          <Route path='statistics' element={<AdminStatisticsPage />} />
        </Routes>
      </HomeLayout>
    )
  }

  if (user.type === 'teacher') {

    return (
      <HomeLayout navbar={(
        <Navbar user={user} logout={() => {
          logout()
            .then(() => setUser(undefined))
        }} />
      )} error={error} removeError={() => setError('')}>
        <Routes>
          <Route path='*' element={<CourseEditPage teacherId={user.id} />} />
          <Route path='course/:id' element={<AdminCoursePage />} />
          <Route path='fact' element={<FactPage />} />
        </Routes>
      </HomeLayout>
    );

  }

  return (
    <HomeLayout navbar={(
      <Navbar user={user} logout={() => {
        logout()
          .then(() => setUser(undefined))
      }} />
    )} error={error} removeError={() => setError('')}>
      <Routes>
        <Route path='*' element={<UserCoursesPage />} />
        <Route path='course/:id' element={<UserCoursePage />} />
        <Route path='fact' element={<FactPage />} />
      </Routes>
    </HomeLayout>
  );
}

export default App;
