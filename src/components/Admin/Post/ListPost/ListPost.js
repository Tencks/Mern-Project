import React, { useState, useEffect} from 'react'
import { Loader, Pagination } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { Post } from '../../../../api'
import { PostItem } from '../PostItem';
import './ListPost.scss'

const postController = new Post();

export function ListPost(props) {

const { reload } = props;

const [posts, setPosts] = useState(null)
const [pagination, setPagination] = useState(null);
const [page, setPage] = useState(1)

console.log(posts);


useEffect(() => {
  (async () => {
    try {
      const response = await postController.getPost(page, 2)
      console.log(response.postStored);
      
      setPosts(response.postStored.docs);
      setPagination({
        limit: response.limit,
        page: response.page,
        pages: response.pages,
        total: response.total,
      })
    } catch (error) {
      console.error(error);
      
    }
  })()

}, [page, reload])

const changePage = (_, data) => {
  setPage(data.activePage)
  console.log(data, 'uwu')
}

if (!posts) return <Loader active inline='centered' />
if (size(posts) === 0) return 'No hay ningún post';

  return (
    <div className='list-post'>
        {map(posts, (post) => (
          <PostItem key={post._id} post={post} />
        ))}


        <div className='list-post__pagination'> 
          <Pagination 
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
          />

          
        </div>
    </div>

      )
}
