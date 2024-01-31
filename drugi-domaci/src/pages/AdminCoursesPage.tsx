import React from 'react'
import { useCourses } from '../hooks/useCourses';
import CourseFilter from '../components/CourseFilter';
import Loader from '../components/Loader';
import CourseForm from '../components/CourseForm';
import { createCourse } from '../service/services';

export default function AdminCoursesPage() {
    const { searchParams, courses, loading, setSearchParams, fetchCourses } = useCourses();
    return (
        <div className='page'>
            <h2 className='mt-2 text-center'>
                <strong>Courses</strong>
            </h2>
            <CourseFilter
                value={searchParams}
                onChange={setSearchParams}
                maxPage={courses ? Math.ceil(courses.total / 20) : 1}
            />
            <div className='row mt-2'>
                <div className='col-7'>
                    {
                        loading ? (<Loader />) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>labels</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courses?.data.map(course => {
                                            return (
                                                <tr key={course.id}>
                                                    <td>{course.id}</td>
                                                    <td>{course.name}</td>
                                                    <td>{course.description}</td>
                                                    <td>{course.labels.map(l => l.name).join(', ')}</td>
                                                    <td>{course.teacher.firstName + ' ' + course.teacher.lastName}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
                <div className='col-5'>
                    <CourseForm
                        onSubmit={async val => {
                            await createCourse(val);
                            fetchCourses();
                        }}
                    />

                </div>
            </div>
        </div>
    )
}
