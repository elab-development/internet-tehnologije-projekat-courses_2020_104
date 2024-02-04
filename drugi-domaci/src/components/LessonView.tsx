import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { Lesson } from '../model'
import { useLessonFile } from '../hooks/apiHooks'

interface Props {
    lesson: Lesson
}

export default function LessonView(props: Props) {
    if (props.lesson.contentType !== 'text') {
        return (
            <MediaLesson lesson={props.lesson} />
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

function MediaLesson(props: Props) {

    const fileUrl = useLessonFile(props.lesson);

    if (props.lesson.contentType === 'image') {
        return (
            <img src={fileUrl} alt="Image" width='100%' style={{ height: '90vh' }} />
        )
    }
    if (props.lesson.contentType === 'video') {
        return (
            <video itemType="video/mp4" src={fileUrl} width='100%' style={{ height: '90vh' }} controls></video>
        )
    }
    if (props.lesson.contentType === 'audio') {
        return (
            <figure>
                <figcaption>Listen:</figcaption>
                <audio controls src={fileUrl}></audio>
            </figure>
        )
    }
    if (props.lesson.contentType === 'file') {
        return (
            <embed src={fileUrl} width="100%" height="600px" />
        )
    }

    return null;
}