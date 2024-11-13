import { useState, useEffect } from 'react'
import Header from './components/header/Header'
import { Footer,Login  } from './components/compIndex'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'
import service from './appwrite/services'
import { useDispatch } from 'react-redux'
import { logout , login} from './store/authSlice'
import { addPost } from './store/postSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    authService.getUser().then((user)=>{
      if (user) {
        dispatch(login(user))
      }
      else{
        dispatch(logout(user))
      }
    })
    .finally(
      setLoading(false)
    )

   service.getPosts([]).then((posts)=>{
    setPosts(posts.documents)
    dispatch(addPost(post))
  })
   console.log(post)
  
   
  }, [])
  

  return (
    <>
      <Header></Header>
      <main>
        <Outlet/>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
