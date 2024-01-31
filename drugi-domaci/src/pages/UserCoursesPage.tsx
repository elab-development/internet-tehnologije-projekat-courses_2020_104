import React, { useNavigate } from 'react-router';
import CourseCard from '../components/CourseCard';
import CourseFilter from '../components/CourseFilter';
import Loader from '../components/Loader';
import { useCourses } from '../hooks/useCourses';

export default function UserCoursesPage() {
    const { searchParams, courses, loading, setSearchParams } = useCourses();
    const navigate = useNavigate();
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
            {
                loading ? (<Loader />) : (
                    <div className='flex-container'>
                        {courses?.data.map(course => {
                            return (
                                <div onClick={() => {
                                    navigate('/course/' + course.id);
                                }} className='mt-2 p-1 course-card' key={course.id}>
                                    <CourseCard course={course} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}
