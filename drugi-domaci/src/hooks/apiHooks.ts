import React, { useState, useEffect } from "react";
import { CourseCollection, User, UserType } from "../model";
import { searchCourses } from "../service/services";
import axios from "axios";


export function useCourses() {
    const [searchParams, setSearchParams] = useState<any>({ page: 1 })
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<CourseCollection | undefined>(undefined)

    const fetchCourses = async () => {
        setLoading(true);
        try {

            const res = await searchCourses(searchParams)
            setCourses(res);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [searchParams])

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