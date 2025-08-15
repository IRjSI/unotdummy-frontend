import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useContext } from 'react'
import { AuthContext, type AuthContextProps } from './context/AuthContext'
import Header from './components/Header'
import CreateCourse from './pages/CreateCourse'
import SearchResult from './pages/SearchResult'
import Profile from './pages/Profile'
import MyCreatedCourses from './pages/MyCreatedCourses'
import LandingPage from './pages/LandingPage'
import ChangePassword from './pages/ChangePassword'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import CreateLecture from './pages/CreateLecture'
import ProtectedRoute from './utils/ProtectedRoutes'
import Watch from './pages/Watch'
import Enroll from './pages/Enroll'
import EditCourseDetails from './pages/EditCourseDetails'
import OAuthCallback from './pages/OAuthCallback'
import { ResetPassword } from './pages/ResetPassword'

function App() {
  const { isLoggedIn } = useContext(AuthContext) as AuthContextProps

  return (
    <div className="w-screen min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        <Route element={<ProtectedRoute />}>
          {/* profile routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* course routes */}
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/my-courses" element={<MyCreatedCourses />} />
          <Route path="/edit-course" element={<EditCourseDetails />} />
          <Route path="/create-lecture" element={<CreateLecture />} />

          {/* search result */}
          <Route path="/search-result" element={<SearchResult />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
