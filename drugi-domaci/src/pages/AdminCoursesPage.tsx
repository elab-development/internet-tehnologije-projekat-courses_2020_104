import React from 'react'
import { useCourses, useLabels, useUsers } from '../hooks/apiHooks';
import CourseFilter from '../components/CourseFilter';
import Loader from '../components/Loader';
import CourseForm from '../components/CourseForm';
import { createCourse } from '../service/services';
import { Link } from 'react-router-dom';

export default function AdminCoursesPage() {
    const { searchParams, courses, loading, setSearchParams, fetchCourses } = useCourses();
    const teachers = useUsers('teacher');
    const labels = useLabels();
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
            <div className='row mt-2' style={{ overflow: 'auto' }}>
                <div className='col-7' style={{ overflow: 'auto', height: '100%' }}>
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
                                                    <td>
                                                        <Link to={'/course/' + course.id}>
                                                            {course.id}
                                                        </Link>
                                                    </td>
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
                        labels={labels}
                        teachers={teachers}
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
