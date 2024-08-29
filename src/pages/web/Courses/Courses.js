import React, {useState, useEffect} from 'react'
import { Course } from '../../../api'
import { Container, Image, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { image } from '../../../assets';
import { Course as Cursillo} from '../../../components/Web/Courses/Course';
import './Courses.scss'

const courseController = new Course();


export function Courses() {
  const [courses, setCourses] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null)
  
  const isCurrentLastPage = pagination?.page === pagination?.pages


  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({page, limit: 3});
        console.log('paginas', response);
        
        setPagination({
          page: response.course.page,
          pages: response.course.totalPages,
        })

        if(!courses) setCourses(response.course.docs);
        else setCourses([...courses, ...response.course.docs])
        console.log('line 31',courses());
      } catch (error) {
          console.error(error);
          
      }
    })()
  
    
  }, [page])

  const loadMore = () =>{
    setPage((prevState) => prevState + 1)
  }
  

  return (
    <Container className='courses-page'>
      <Image src={image.academyLogo} />
      <h2>En esta fantástica web encontrarás las mejores webs para consumir el mejor de los contenidos existentes</h2>

      <div className='courses'>
        {map(courses, (course) =>(
          <div key={course._id} className='courses__item'>
          <Cursillo course={course} />
        </div>
     
        ))}
         </div>

        {!isCurrentLastPage && (

        <div className='more'>
          <Button primary onClick={loadMore}  >Cargar más...</Button>
        </div>
        )}

    </Container>
  )
}
