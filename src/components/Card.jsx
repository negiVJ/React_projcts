import React from 'react'
import img from '../images/cardImg.jpg'
import { Link } from 'react-router-dom'
import service from '../appwrite/services'
import HTMLReactParser from 'html-react-parser/lib/index';

export default function Card({ post, id }) {
  // console.log(post.$id);
  return (
    <Link to={`/post/${post.$id}`}>
    <div className='inline-block m-3 overflow-hidden shadow-md rounded-3xl bg-white h-80' id={id}>
    
    <img src={service.getFilePreview(post.featuredImageId)} alt="" width="350px" height="230px" className='h-52' />
    <div className='p-2 h-2/3 login-back'>
      <h3 className=''>{post.title}</h3>
      <p>{HTMLReactParser(post.content)}</p>
    </div>



  </div>
  </Link>
  )
}
