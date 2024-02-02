import React, { useEffect, useState } from 'react'
import { Lesson, LessonType } from '../model'
import Form from './form/Form';
import axios from 'axios';
import { uploadFile } from '../service/services';

interface Props {
    lesson?: Lesson;
    onSubmit: (data: any) => void;
}

const emptyForm = {
    title: '',
    content: '',
    contentType: undefined as LessonType | undefined
}
const lessonTypes = ['video', 'text', 'audio', 'image', 'file'];
export default function LessonForm(props: Props) {
    const [formState, setFormState] = useState(emptyForm);

    useEffect(() => {
        if (!props.lesson) {
            setFormState(emptyForm);
            return;
        }
        setFormState({
            content: props.lesson.content,
            title: props.lesson.title,
            contentType: props.lesson.contentType,
        })
    }, [props.lesson])

    return (
        <Form title={props.lesson ? 'Update lesson' : 'Create lesson'}
            onSubmit={props.onSubmit} formValue={formState} onChange={(val: any) => setFormState(val)}
        >
            <Form.Input name='title' placeholder='Title...' required label='Title' />
            <Form.Select name='contentType' label='Content type' data={lessonTypes.map(val => {
                return {
                    value: val,
                    label: val
                }
            })} />
            {
                formState.contentType && formState.contentType !== 'text' && (
                    <input className='my-1' type='file' onChange={async e => {
                        const files = e.target.files;
                        if (!files) {
                            return;
                        }
                        const file = files[0];
                        const fd = new FormData();
                        fd.set('file', file);
                        const fileName = await uploadFile(fd);
                        setFormState(prev => {
                            return {
                                ...prev,
                                content: fileName
                            }
                        })
                    }} />
                )
            }
            <Form.Input textArea name='content' placeholder='Content...' required label='Content' />
            <button className='btn btn-primary form-control mt-1'>Save lesson</button>
        </Form>
    )
}
