import React from 'react'
import { useCourses, useUsers, useLabels } from '../hooks/apiHooks';
import { createCourse } from '../service/services';
import CourseFilter from './CourseFilter';
import CourseForm from './CourseForm';
import CourseTable from './CourseTable';
import Loader from './Loader';

interface Props {
    teacherId?: number
}

export default function CourseEditPage(props: Props) {
    const { searchParams, courses, loading, setSearchParams, fetchCourses } = useCourses(props.teacherId);
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
                            <CourseTable courses={courses?.data || []} />
                        )
                    }
                </div>
                <div className='col-5'>
                    <CourseForm
                        labels={labels}
                        teachers={teachers}
                        admin={props.teacherId === undefined}
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
