import React, { useEffect, useState } from 'react'
import Form from './form/Form'
import { Course, Label, User } from '../model'

interface Props {
    onSubmit: (data: any) => void,
    teachers: User[],
    course?: Course;
    labels: Label[]
}

const emptyForm = {
    name: '',
    description: '',
    teacherId: '',
    labels: [] as number[]
}

export default function CourseForm(props: Props) {
    const [formValue, setFormValue] = useState(emptyForm);


    useEffect(() => {
        if (!props.course) {
            setFormValue(emptyForm);
            return;
        }
        setFormValue({
            description: props.course.description,
            name: props.course.name,
            teacherId: props.course.teacher.id + '',
            labels: props.course.labels.map(l => l.id)
        })
    }, [props.course])

    return (
        <div>
            <Form formValue={formValue} onChange={(val: any) => {
                setFormValue(val);
            }} title={props.course ? 'Update data' : 'Create course'}
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
                <Form.MultipleSelect label='Labels' name='labels' required
                    data={props.labels.map(label => {
                        return {
                            value: label.id,
                            label: label.name
                        }
                    })}
                />
                <button className='btn btn-primary mt-2 form-control'>Save</button>
            </Form>
        </div>
    )
}
