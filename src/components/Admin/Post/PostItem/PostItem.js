import React from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import './PostItem.scss';
import { Link } from 'react-router-dom';

export  function PostItem(props) {
  const { post } = props;


  return (
    <>
    
    <div className='post-item'>
      <div className='post-item__info'>
        <span className='post-item__info-title'>{post.title}</span>
        <span className='post-item__info-path'>{post.path}</span>
      </div>

      <div>
        <Button as={Link} icon to={`/blog/${post.path}`} target='_blank'>
          <Icon name='eye'></Icon>
        </Button>

        <Button icon primary>
          <Icon name='pencil'></Icon>
        </Button>
         
        <Button icon color='red'>
          <Icon name='trash' ></Icon>
        </Button>
      </div>
    </div>
    
    </>
  )
}
