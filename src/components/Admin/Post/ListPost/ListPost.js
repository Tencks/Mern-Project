import React, { useState, useEffect} from 'react'
import { Loader } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { Post } from '../../../../api'
import { PostItem } from '../PostItem';
import './ListPost.scss'

const postController = new Post();

export function ListPost() {

const [posts, setPosts] = useState(null)

console.log(posts);


useEffect(() => {
  (async () => {
    try {
      const response = await postController.getPost()
      setPosts(response.postStored.docs);
    } catch (error) {
      console.error(error);
      
    }
  })()

}, [])

if (!posts) 

  return (
    <div>
        <h2>listpost</h2>
    </div>
  )
}
