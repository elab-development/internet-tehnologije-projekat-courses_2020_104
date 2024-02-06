import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { Lesson } from '../model'
import { useLessonFile } from '../hooks/apiHooks'

interface Props {
    lesson: Lesson
}

export default function LessonView(props: Props) {
    const { fileUrl, extension } = useLessonFile(props.lesson);
    if (props.lesson.contentType !== 'text') {
        return (
            <div>
                <MediaLesson fileUrl={fileUrl} lesson={props.lesson} />
                <a className='mt-2' href={fileUrl} download={props.lesson.title + '.' + extension}>
                    <button className='btn btn-primary'>Download</button>
                </a>
            </div>
        )
    }
    return (
        <div className='pt-3'>
            <p>
                {props.lesson.content}
            </p>
        </div>
    )
}

function MediaLesson(props: Props & { fileUrl: string }) {


    if (props.lesson.contentType === 'image') {
        return (
            <img src={props.fileUrl} alt="Image" width='100%' style={{ height: '90vh' }} />
        )
    }
    if (props.lesson.contentType === 'video') {
        return (
            <video itemType="video/mp4" src={props.fileUrl} width='100%' style={{ height: '90vh' }} controls></video>
        )
    }
    if (props.lesson.contentType === 'audio') {
        return (
            <figure>
                <figcaption>Listen:</figcaption>
                <audio controls src={props.fileUrl}></audio>
            </figure>
        )
    }
    if (props.lesson.contentType === 'file') {
        return (
            <embed src={props.fileUrl} width="100%" height="600px" />
        )
    }

    return null;
}