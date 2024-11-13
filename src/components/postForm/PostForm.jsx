import React from 'react'
import { Input, CustomButton, RTE, Select } from '../compIndex'
import { useForm } from 'react-hook-form'
import services from '../../appwrite/services';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {

    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || " ",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || 'active'
        }
    });

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData)
    // console.log(userData.$id)

    const submitPost = async (data) => {
        try {
            //create a bucket (imgage)
            //post image to server and get featured id

            if (post) {
                //for post updation
                //first delete the existing image then update the post
                const file = await services.uploadFile(data.image[0] ? data.image[0] : null);
                if (file) {
                    const fileId = file.$id
                    console.log("posts featured id" + post.featuredImageId)
                    const deletedPost = await services.deleteFile(post.featuredImageId);
                    if (deletedPost) {
                        console.log("Post Deleted")
                        const updatedPost = await services.updatePost(post.$id, { ...data, featuredImageId: fileId });
                        if (updatedPost) {
                            console.log("now navigating")
                            // dispatch()
                            navigate("/")
                        }
                    }
                }
            }
            else {
                console.log("posting starts")
                //create a new post using the createPost and then navigate user if created successfully
                const file = await services.uploadFile(data.image[0] ? data.image[0] : null);
                if (file) {
                    const fileId = file.$id;
                    console.log(fileId)
                    console.log(userData.$id)
                    const postData = await services.createPost({
                        ...data,
                        featuredImageId: fileId,
                        userId: userData.$id
                    });
                    if (postData) {
                        dispatch(addPost(postData))
                        console.log("post created")
                        //navigate here-
                        navigate("/")
                    }
                }
            }
        } catch (error) {

        }
    }

    return (
        <form onSubmit={handleSubmit(submitPost)} className='bg-white rounded-lg  mt-16 mb-16 p-10 w-9/12 flex h-full' >
            <div className='w-2/3'>
                <div className='p-3'>
                    <Input  type="text" className='login-back outline-none h-10 w-3/4 rounded-lg m-1 pl-3 placeholder:text-gray-600' 
                        placeholder="Title"
                        {...register("title", {
                            required: true
                        })}></Input>
                </div>
                <div className='p-3'>

                    <Input placeholder="Slug" type="text" className='login-back outline-none h-10 w-3/4 rounded-lg m-1 pl-3 placeholder:text-gray-600'
                        {...register("slug", {
                            required: true
                        })}></Input>
                    <RTE name="Content"  control={control} defaultValue={getValues("content") } className='login-back mt'></RTE>
                </div>

            </div>


            <div className='w-1/3 mt-3'>
                <div className='login-back p-3 rounded-lg'>
                <Input type="File"
                    label="Featured Image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="w-full p-3 "
                    {...register("image", {
                        required: !post
                    })}
                ></Input>
                </div>

                <div className='login-back mt-5 p-3 rounded-lg'>
                {post && (
                    <div>
                        <img src={services.getFilePreview(post.featuredImageId)} alt={post.title} />
                    </div>
                )}
                <Select options={["active", "inactive"]}
                    label="Status"
                    name='Status'
                    className='p-2 w-full outline-none bg-white rounded-lg'
                    {...register("status", {
                        required: true
                    })}
                ></Select>
                </div>
                <div className='mt-16'>
                <CustomButton label={post ? "Update" : "Create"} type='submit' 
            classname='w-full rounded-lg outline-none  font-medium text-xl bg-purple-600 border-purple-600 text-white h-12 hover:bg-purple-800'
            ></CustomButton>
                </div>

            </div>
            
        </form>
    )
}

export default PostForm