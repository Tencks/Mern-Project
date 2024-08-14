import React from 'react'
import './EmailItem.scss'

export function EmailItem(props) {
    const { email } = props;


  return (
    <>
    
     <div className='newsletter-item'>
        <div className='newsletter-item__info'>
            <span>{email.email}</span>
        </div>
     </div>
    
    </>
  )
}
