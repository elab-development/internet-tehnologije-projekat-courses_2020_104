import React, { useState, useEffect, ElementRef } from "react";
import { CourseCollection, Label, Lesson, User, UserType } from "../model";
import { getCourseStatistics, getFact, getLabelStatistics, getLabels, searchCourses } from "../service/services";
import axios from "axios";




export function useCourses(teacherId?: number) {
    const [searchParams, setSearchParams] = useState<any>({ page: 1 })
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<CourseCollection | undefined>(undefined)



    const fetchCourses = async () => {
        setLoading(true);
        try {

            const res = await searchCourses(teacherId ? { ...searchParams, teacherId } : searchParams)
            setCourses(res);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [searchParams, teacherId])

    return {
        loading,
        courses,
        searchParams,
        setSearchParams,
        fetchCourses
    }
}

export function useUsers(userType: UserType) {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        axios.get('/api/users', {
            params: {
                type: userType
            }
        })
            .then(res => {
                setUsers(res.data)
            }).catch(() => setUsers([]))
    }, [userType])
    return users;

}

export function useLabels() {
    const [labels, setLabels] = useState<Label[]>([])

    useEffect(() => {
        getLabels().then(setLabels)
    }, [])

    return labels;
}
export function useLabelStatistics() {
    const [labels, setLabels] = useState<any[]>([])

    useEffect(() => {
        getLabelStatistics().then(setLabels)
    }, [])

    return labels;
}
export function useCourseStatistics() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        getCourseStatistics().then(setData)
    }, [])

    return data;
}

export function useLessonFile(lesson: Lesson) {
    const url = `/api/lessons/${lesson.id}/file`;
    const [fileUrl, setFileUrl] = useState('');
    const splited = lesson.content.split('.');
    const extension = splited[splited.length - 1];
    useEffect(() => {
        if (lesson.contentType === 'text') {
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.blob())
            .then(bl => {
                const blob = extension === 'pdf' ? new Blob([bl], { type: 'application/pdf' }) : bl;
                setFileUrl(URL.createObjectURL(blob))
            })
            .catch(e => {
                setFileUrl('');
            })
    }, [url])

    return { fileUrl, extension };

}

export function useFact() {
    const [text, setText] = useState('')
    useEffect(() => {
        getFact()
            .then(res => setText(res))
            .catch(() => setText(''))
    }, [])
    return text;
}