import React, {useState, useEffect} from 'react';
import { Loader,Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash'
import { Course } from '../../../../api'
import { CourseItem } from '../CourseItem';
import './ListCourses.scss';


const courseController = new Course();

export function ListCourses(props) {
  const { reload, onReload } = props;
  
  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination,setPagination] = useState(1);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await courseController.getCourses({page, limit:1});

        if (isMounted){
          setCourses(response.course.docs);

        console.log(response.course.docs);

        setPagination({
          limit: response.course.limit,
          page: response.course.page,
          pages: response.course.totalPages,
          total: response.course.totalDocs
        });
        }
        
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      isMounted = false;
    };

  }, [page, reload])

  const changePage = (_,data) =>{
    setPage(data.activePage)
  }

  if(!courses) return <Loader active inline='centered' />
  if(size(courses) === 0) return 'No hay cursos'

  return (
    <div className='list-courses'>
      
      {/* {map(courses, (course) => {
        <CourseItem key={course._id} course={course} />
      })} */}


    {map(courses, (course) => (
      <CourseItem key={course._id} course={course} onReload={onReload} />
    ))}
    
 
      <div className='list-courses__pagination'>
        <Pagination 
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange= {changePage}
        />
      </div>

    </div>
  )
}
