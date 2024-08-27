import React from 'react'
import { Banner, HomeCourses, HowMyCoursesWork, Reviews } from '../../../components/Web'

export function Home() {
  return (
    <div>
        <Banner></Banner>

        <HomeCourses />

        <HowMyCoursesWork />

        <Reviews />
    </div>
  )
}
