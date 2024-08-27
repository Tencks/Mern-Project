import React, {useState, useEffect} from 'react'
import { Course } from '../../../api'
import { Container, Image, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { image } from '../../../assets';
import './Courses.scss'

const courseController = new Course();


export function Courses() {
  const [courses, setCourses] = useState(null);
  const [page, setPage] = useState(1);
    
    


  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({page, limit: 5});
        setCourses(response.docs);
        console.log(response);
      } catch (error) {
          console.error(error);
          
      }
    })()
  
    
  }, [])
  

  return (
    <Container className='courses-page'>
      <Image src={image.academyLogo} />
      <h2>En esta fantástica web encontrarás las mejores webs para consumir el mejor de los contenidos existentes</h2>

      <div className='courses'>
        <div className='courses__item'>
          <span>Titulo curso</span>
        </div>
      </div>

      <div className='more'>
        <Button primary>Cargar más...</Button>
      </div>

    </Container>
  )
}
