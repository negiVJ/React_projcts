import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LogInPage from './pages/LogInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import MyPosts from './pages/MyPosts.jsx'


const customRouter2 = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      {
          path: "/",
          element: <Home/>,
      },
      {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <LogInPage/>
              </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <SignUpPage/>
              </AuthLayout>
          ),
      },
  
      {
          path: "/addpost",
          element: (
              <AuthLayout authentication={true}>
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/editpost/:slug",
          element: (
              <AuthLayout authentication={true}>
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>,
      },
      {
        path: "/myposts",
        element: <AuthLayout authentication={true}>
          <MyPosts/>
        </AuthLayout>,
    },
  ],
  }
])

// const customRouter = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/addPost' element={<AddPost/>}/>
//       <Route path='/login' element={<LogInPage/>}/>
//       <Route path='/signup' element={<SignUpPage/>}/>
//       <Route path='/post/:slug' element={<Post/>}/>
//       <Route path='/editpost/:slug' element={<EditPost/>}/>

//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={customRouter2}/>
    </Provider>
  </StrictMode>,
)
