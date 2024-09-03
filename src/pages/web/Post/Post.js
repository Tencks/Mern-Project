import React, { useState, useEffect} from 'react'
import { Post as PostController} from '../../../api'
import { Container, Loader } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import './Post.scss'

const postController = new PostController();

export function Post() {
const [post, setPost] = useState(null);
const { path } = useParams();



useEffect(() => {
  (async () => {
    try {
      const response = await postController.getPostPath(path);
      setPost(response.postStored)
    } catch (error) {
      console.error(error);
      
    }
  })()

 
}, [path])

if(!post) return <Loader active inline ='centered' />



  return (
    <Container className='post'>
      <h1 className='title'>{post.title}</h1>

      <div 
      className='content' 
      dangerouslySetInnerHTML={{__html: post.content}}
      />
    </Container>
  )
}
