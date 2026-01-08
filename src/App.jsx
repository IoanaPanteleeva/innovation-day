import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Context
import { AuthProvider } from './contexts/AuthContext'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Layouts
import MainLayout from './components/layout/MainLayout/MainLayout'
import AuthLayout from './components/layout/AuthLayout/AuthLayout'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute'

// Pages
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import SubmitIdea from './pages/SubmitIdea/SubmitIdea'
import MyIdeas from './pages/MyIdeas/MyIdeas'
import IdeaDetailPage from './pages/IdeaDetailPage/IdeaDetailPage'
import NotificationsPage from './pages/Notifications/NotificationsPage'
import AdminDashboard from './pages/Admin/ReviewIdeas'
import NotFound from './pages/NotFound/NotFound'

import './App.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/submit-idea" element={<SubmitIdea />} />
            <Route path="/my-ideas" element={<MyIdeas />} />
            <Route path="/ideas/:id" element={<IdeaDetailPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
