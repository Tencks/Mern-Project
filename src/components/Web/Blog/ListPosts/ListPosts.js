import React, {useState, useEffect} from 'react';
import { Post } from '../../../../api';
import './ListPost.scss';
import { Loader,Pagination } from 'semantic-ui-react';
import { map } from 'lodash';
import { ListPostItem } from '../ListPostItem/ListPostItem';
import { useNavigate, useSearchParams } from 'react-router-dom';


const postController = new Post();


export function ListPosts() {
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState();

    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(searchParams.get('page') || 1 );

    const navigate  = useNavigate();
    


    useEffect(() => {
      ( async () => {
        try {
            const response =  await postController.getPost({page, limit:1} );
            setPosts(response.postStored.docs)
            setPagination({
                limit: response.postStored.limit,
                page: response.postStored.page,
                pages: response.postStored.totalPages,
                total: response.postStored.totalDocs,
              })
              
        } catch (error) {
            console.error(error);
            
        }
      })()
    
     
    }, [page])
    
    const ChangePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage)
        navigate(`?page=${newPage}`)
        
    }


    if(!posts) return <Loader active inline = 'centered' />

    return (
    <div className='list-posts-web'>
        <div className='list'>
            {map (posts, (post) => (
                <div key={post._id} className='item'>
                   <ListPostItem post={post} />
                </div>
            ))}
        </div>

        <div className='pagination'>
            <Pagination 
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            secondary
            pointing
            onPageChange={ChangePage}
            />
        </div>

    </div>
  )
}
