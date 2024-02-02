import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Course, Lesson } from '../model';
import { createLesson, deleteLesson, getCourseById, updateCourse, updateCourseStudents, updateLesson } from '../service/services';
import Loader from '../components/Loader';
import { useLabels, useUsers } from '../hooks/apiHooks';
import CourseForm from '../components/CourseForm';
import Form from '../components/form/Form';
import LessonForm from '../components/LessonForm';

export default function AdminCoursePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const courseId = useParams().id;
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const labels = useLabels();
    const students = useUsers('student')
    const teachers = useUsers('teacher');
    const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(undefined);
    const [studentsForm, setStudentsForm] = useState({ studentIds: [] as number[] })
    useEffect(() => {
        setLoading(true)
        getCourseById(Number(courseId))
            .then(c => {
                setCourse(c);
                setStudentsForm({
                    studentIds: c?.students.map(s => s.id) || []
                })
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
        <div className='page'>
            <div>
                <h2 className='mt-2 text-center'>
                    <strong>Course: {course.name}</strong>
                </h2>
                <div className='row '>
                    <div className='col-6'>
                        <CourseForm
                            labels={labels}
                            teachers={teachers}
                            course={course}
                            onSubmit={async val => {
                                const res = await updateCourseStudents(course.id, val);
                                setCourse(res);
                            }}
                        />
                    </div>
                    <div className='col-6'>
                        <Form formValue={studentsForm} onChange={(val: any) => {
                            setStudentsForm(val);
                        }} title='Update students' onSubmit={async (val: any) => {
                            const res = await updateCourseStudents(course.id, val);
                            setCourse(res);
                        }}>
                            <Form.MultipleSelect
                                name='studentIds'
                                label='Students'
                                data={students.map(s => {
                                    return {
                                        value: s.id + '',
                                        label: s.firstName + " " + s.lastName
                                    }
                                })}
                            />
                            <button className='btn btn-primary form-control'>Update students</button>
                        </Form>
                    </div>
                </div>
                <h2 className='mt-2 text-center'>
                    <strong>Course lessons</strong>
                </h2>
                <div className='row pb-5'>
                    <div className='col-6'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Content type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    course.lessons.map(lesson => {
                                        return (
                                            <tr
                                                className={lesson === selectedLesson ? 'table-secondary' : ''}
                                                onClick={() => {
                                                    setSelectedLesson(prev => prev === lesson ? undefined : lesson)
                                                }}
                                                key={lesson.id}>
                                                <td>{lesson.id}</td>
                                                <td>{lesson.title}</td>
                                                <td>{lesson.contentType}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-6'>
                        <LessonForm
                            lesson={selectedLesson}
                            onSubmit={async (val) => {
                                if (!selectedLesson) {
                                    setCourse(await createLesson(course.id, val));
                                } else {
                                    setCourse(await updateLesson(course.id, selectedLesson.id, val));
                                }
                                setSelectedLesson(undefined);
                            }}
                        />
                        {
                            selectedLesson && (
                                <button className='btn btn-danger mt-2'
                                    onClick={async () => {
                                        if (!selectedLesson) {
                                            return;
                                        }
                                        await deleteLesson(course.id, selectedLesson.id);
                                        setCourse(prev => {
                                            if (!prev) {
                                                return prev;
                                            }
                                            return {
                                                ...prev,
                                                lessons: prev.lessons.filter(l => l !== selectedLesson)
                                            }
                                        })
                                        setSelectedLesson(undefined);
                                    }}
                                >Delete lesson</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
