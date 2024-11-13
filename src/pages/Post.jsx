import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import service from '../appwrite/services';
import HTMLReactParser from 'html-react-parser/lib/index';
import { parse } from 'postcss';
import { useSelector } from 'react-redux';
import {CustomButton} from '../components/compIndex'
import { Link } from 'react-router-dom';

function Post() {
    const navigate = useNavigate()
    const [post, setPost] = useState();
    const slug = useParams();
    const location = useLocation();
    const userData = useSelector((state)=>state.auth.userData)
    // const posted = location.state?.post;

    const isauthor = post && userData ? post.userId == userData.$id: false
    console.log(isauthor)

    useEffect(() => {
      service.getPost(slug.slug).then((post)=>{
        if(post){
            setPost(post)
        }
      })
    }, [slug])
    
    const deletePost=()=>{
        // console.log(slug.slug)
        service.deletePost(post.$id).then((post)=>{
            if (post) {
                navigate("/")
            }
        })
    }

  return (
    <>
    {
        post && (
    <div className='mt-24'>
        <div className='relative'>
            <img src={service.getFilePreview(post.featuredImageId)} alt={post.title} />
            {isauthor && (
                <div className="absolute right-6 top-6 bg-white p-2 rounded-lg  ">
                <Link to={`/editpost/${slug.slug}`}>
                    <CustomButton type='button'label='Edit' classname='login-back mr-3 p-2 w-16 rounded-lg text-lg font-normal' >
                        
                    </CustomButton>
                </Link>
                <CustomButton classname="login-back p-2 w-16 rounded-lg text-gray-700 text-lg font-normal" label='Delete' onClick={deletePost}>
                    
                </CustomButton>
            </div>
            )}
        </div>
        <div>
            <h1>{HTMLReactParser(post.title)}</h1>
            <p>{post.content}</p>
        </div>
    </div>
        )
    }
      
    </>
  )
}

export default Post