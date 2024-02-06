import React, { useEffect, useState } from 'react'
import { Lesson, LessonType } from '../model'
import Form from './form/Form';
import { uploadFile } from '../service/services';

interface Props {
    lesson?: Lesson;
    onSubmit: (data: any) => void;
}

const emptyForm = {
    title: '',
    content: '',
    contentType: 'text' as LessonType
}
const lessonTypes = ['video', 'text', 'audio', 'image', 'file'];
export default function LessonForm(props: Props) {
    const [formState, setFormState] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
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
            onSubmit={val => {
                if (loading) {
                    return;
                }
                props.onSubmit(val);
            }} formValue={formState} onChange={(val: any) => setFormState(val)}
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
                        setLoading(true);
                        const fileName = await uploadFile(fd);
                        setLoading(false);
                        setFormState(prev => {
                            return {
                                ...prev,
                                content: fileName
                            }
                        })
                    }} />
                )
            }
            <Form.Input disabled={formState.contentType != 'text'} textArea name='content' placeholder='Content...' required label='Content' />
            <button disabled={loading} className='btn btn-primary form-control mt-1'>Save lesson</button>
        </Form>
    )
}
