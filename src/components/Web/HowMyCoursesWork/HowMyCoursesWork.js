import React from 'react'
import './HowMyCoursesWork.scss'
import { Container, Icon } from 'semantic-ui-react'
import { map } from 'lodash'
import { itemData, itemsData } from './HowMyCoursesWork.data'


export function HowMyCoursesWork() {
  return (
   <Container className='how-my-courses-work'>
        <h2>Como funcionan estás webs?</h2>
        <h4> Se tiene cotenido las 4 temporadas del año!</h4>

        <div className='how-my-courses-work__items'>
            {map(itemsData, (item, index) =>(
                <div key={index}>
                    <div>
                        <Icon name={item.icon} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
   </Container>
  )
}
