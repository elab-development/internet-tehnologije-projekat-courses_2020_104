import React from 'react'
import { CourseItem } from '../model'
import { Link } from 'react-router-dom'

interface Props {
    courses: CourseItem[]
}

export default function CourseTable(props: Props) {
    return (
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
                    props.courses.map(course => {
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
