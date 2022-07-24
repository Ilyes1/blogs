import React, { useEffect, useState } from 'react'
import { db, storage } from './firebase'
import { ref as dbRef, set, push, onChildAdded, get } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

const Home = () => {

    const [loader, setLoader] = useState(false)
    const [preview, setPreview] = useState('')
    const [posted, setPosted] = useState(false)

    const uploadImage = (e) => {
        const image = e.target.files[0]
        setLoader(true)
        const uploadRef = storageRef(storage, image.name)
        uploadBytes(uploadRef, image)
        .then(() => {
            setLoader(false)
            getDownloadURL(uploadRef)
            .then(url => {
                setPreview(url)
                // console.log(url)
            })
        })
    }

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const addPost = () => {

        // set(push(dbRef(db, 'posts'), {
        //     name: name,
        //     image: preview,
        //     description: description
        // }))

        axios.post(
            'https://blog-ilyes.herokuapp.com/createPost',
            {
                name: name,
                image: preview,
                description: description
            }
        ).then(() => {
            setName('')
            setPreview('')
            setDescription('')
            setPosted(true)
    
            setTimeout(() => {
                setPosted(false)
            }, 2000);
        })


    }

    const [posts, setPosts] = useState([])

    useEffect(() => {

        // onChildAdded(dbRef(db, 'posts'), (snapshot) => {
        //     setPosts((oldArray) => [...oldArray, {
        //         name: snapshot.val().name,
        //         image: snapshot.val().image,
        //         description: snapshot.val().description,
        //         key: snapshot.key
        //     }])
        // })

        axios.get('https://blog-ilyes.herokuapp.com/posts')
        .then((posts) => {
            posts.data.map(post => {
                setPosts((oldArray) => [...oldArray, {
                    name: post.name,
                    image: post.image,
                    description: post.description,
                    key: post._id
                }])
            })
        })

    }, [])

  return (
    <div>
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 m-auto">
                    <div className="d-flex justify-content-end mb-4">
                        <button className="btn btn-secondary shadow-none" data-bs-toggle="modal" data-bs-target="#postModal">Add Post</button>
                    </div>

                    {
                        posts.map(post => (
                            <div className="post-card shadow rounded mb-4" key={post.key}>
                                <img className='rounded-top' src={post.image} alt="" />
                                <div className="p-2">
                                    <h5>{post.name}</h5>
                                    <p className='mb-0'>{post.description}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>

        <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label className='form-label'>Enter Your Name</label>
                        <input type="text" className='form-control shadow-none mb-3' value={name} onChange={(e) => setName(e.target.value)} />

                        <label className='form-label'>Post Image</label>
                        <input type="file" className='form-control shadow-none mb-3' onChange={uploadImage} />

                        <div className="text-center">
                            <div className={`lds-ring m-auto mb-3 ${loader ? '' : 'd-none'}`}><div></div><div></div><div></div><div></div></div>
                        </div>

                        <img src={preview} className={`w-100 mb-3 rounded ${preview == '' ? 'd-none' : ''}`} alt="" />
                                
                        <label className='form-label'>Post Description</label>
                        <textarea className='form-control shadow-none' rows='4' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                        <h3 className={`mt-3 text-success text-center ${posted ? '' : 'd-none'}`}>Post Added</h3>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addPost}>Add Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home