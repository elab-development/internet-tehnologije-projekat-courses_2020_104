import React, { useState, useEffect } from "react";
import { CourseCollection } from "../model";
import { searchCourses } from "../service/services";


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