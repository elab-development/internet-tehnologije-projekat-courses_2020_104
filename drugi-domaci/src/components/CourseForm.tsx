import React from 'react'
import Form from './form/Form'

interface Props {
    onSubmit: (data: any) => void
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
                <Form.Input label='Teacher id' placeholder='Teacher id...' name='teacherId' required />
                <button className='btn btn-primary mt-2 form-control'>Login</button>
            </Form>
        </div>
    )
}
