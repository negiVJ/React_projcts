import React, { useState } from 'react'
import {Card} from '../components/compIndex'
import service from '../appwrite/services';
import conf from '../conf/config';
import { useSelector } from 'react-redux';

function Home() {

  const [posts, setPosts] =useState([]);
  //const postsArray= useSelector((state)=>state.post.allposts)  

  React.useEffect(() => {

    console.log(conf.appWriteUrl)
    service.getPosts([]).then((posts)=>{
      if (posts) {
        setPosts(posts.documents);
      }
    })
    // const postsArray = useSelector((state)=>state.post.allposts)
    // if (postsArray) {
    //   setPosts(postsArray)
    // }
    // console.log(postsArray)
    
  }, [])
  



  return (
    <div className='mt-20'>
        <div className='flex flex-wrap justify-center shadow-lg rounded-lg   h-full'>
            {
              posts.map((post)=>(
                <Card id={post} post={post}></Card>
        
              ))
            }
         </div> 
        
    </div>
  )
}

export default Home