import React from 'react'
import { CourseItem } from '../model'
interface Props {
    course: CourseItem
}
export default function CourseCard(props: Props) {
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.course.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    <i>
                        {'By: ' + props.course.teacher.firstName + ' ' + props.course.teacher.lastName}
                    </i>
                </h6>
                <p className="card-text">{props.course.description}</p>
                <div >
                    {
                        props.course.labels.map(label => {
                            return (
                                <span className='text-light bg-dark p-1 m-1 border border-dark rounded'>
                                    {label.name}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
