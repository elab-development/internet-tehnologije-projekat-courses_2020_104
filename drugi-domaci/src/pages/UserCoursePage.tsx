import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Course } from '../model';
import Loader from '../components/Loader';
import { getCourseById } from '../service/services';

export default function UserCoursePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const courseId = useParams().id;
    const [course, setCourse] = useState<Course | undefined>(undefined);


    useEffect(() => {
        setLoading(true)
        getCourseById(Number(courseId))
            .then(c => {
                setCourse(c);
                setError('');
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [courseId])

    if (loading) {
        return (
            <Loader />
        )
    }
    if (error) {
        return (
            <h2 className='text-center text-danger'>{error}</h2>
        )
    }
    if (!course) {
        return (
            <h2 className='text-center text-danger'>There is no course with given id</h2>
        )
    }

    return (
        <div>
            <h2 className='text-center'>
                <strong>
                    {'Course: ' + course.name}
                </strong>
            </h2>
            <div className='row pt-3'>
                <div className='col-6'>

                    <div>
                        <strong>Title:</strong> <span className='ps-1'>{course.name}</span>
                    </div>
                    <div className='pt-2'>
                        <strong>Teacher:</strong> <span className='ps-1'>{course.teacher.firstName + ' ' + course.teacher.lastName}</span>
                    </div>
                    <div className='pt-2'>
                        <strong>Labels:</strong> <span className='ps-1 text-dark'>{course.labels.map(l => l.name).join(', ')}</span>
                    </div>

                    <div className='pt-2'>
                        <strong> Description:</strong>
                        <p>
                            {course.description}
                        </p>
                    </div>
                </div>
                <div className='col-6'>
                    <h3 className='text-center'>
                        <strong>Lessons</strong>
                    </h3>
                    <ul className='list-group list-group-flush'>
                        {
                            course.lessons.map(lesson => {
                                return (
                                    <li key={lesson.id} className='list-group-item'>
                                        {`${lesson.title} - ${lesson.contentType}`}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
