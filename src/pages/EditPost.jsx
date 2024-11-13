import React from 'react'
import { useSelector } from 'react-redux'
import { PostForm } from '../components/compIndex'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/services'

export default function EditPost() {
    const status = useSelector((state)=>state.auth.login)
    const navigate = useNavigate()
    const [post, setPost] = React.useState();
    const slug = useParams();

    console.log(slug)

    React.useEffect(() => {
      service.getPost(slug.slug).then((post)=>{
        if(post){
            setPost(post)
        }
      })
    }, [slug, navigate])

  return (
    <div>
        <PostForm post={post}></PostForm>
    </div>
  )
}
