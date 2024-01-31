import React from 'react'
import Form from './form/Form'
import { User } from '../model'

interface Props {
    onSubmit: (data: any) => void,
    teachers: User[]
}

export default function CourseForm(props: Props) {
    return (
        <div>
            <Form title='Create course'
                onSubmit={(val) => {
                    props.onSubmit(val)
                }}
            >
                <Form.Input label='Name' placeholder='Name...' name='name' required />
                <Form.Input label='Description' placeholder='Description...' name='description' textArea required />
                <Form.Select label='Teacher id' name='teacherId' required
                    data={props.teachers.map(teacher => {
                        return {
                            value: teacher.id,
                            label: teacher.firstName + ' ' + teacher.lastName
                        }
                    })}
                />
                <button className='btn btn-primary mt-2 form-control'>Save</button>
            </Form>
        </div>
    )
}
