import React, {useState,useEffect} from 'react'
import { Container, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import { Course } from '../../../api'
import { ENV } from '../../../Utils'
import './HomeCourses.scss'

const courseController = new Course();

export function HomeCourses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
      (async () =>{
        try {
            const response = await courseController.getCourses({ limit:3});
            setCourses(response.course.docs);
            
        } catch (error) {
            console.error(error);
            
        }
      })()
    
    
    }, [])
    



  return (
    <div className='home-courses'>
            <h2>Manejemos con la mejor!</h2>
        <Container>

            <div className='home-courses__all-courses'>
                {map (courses, (course) => (
                    <a key={course._id} href={course.url} target='_blank'>
                        <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                        <div>
                            <span>{course.title}</span>
                            <span>{course.description}</span>
                        </div>
                    </a>
                ) )}

            </div>

            <div className='home-courses__more'>
                <Button as={Link} to='/cursos' primary>
                    Ver más
                </Button>
            </div>

        </Container>
    </div>
  )
}
