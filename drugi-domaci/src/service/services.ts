import axios from "axios";
import { Course, CourseCollection, Label, User } from "../model";


export async function getLabels() {
    const res = await axios.get('/api/labels');
    return res.data as Label[]
}
export interface CourseParams {
    page?: number,
    size?: number,
    name?: string,
    teacherId?: number,
    studentId?: number,
    labels?: number[]
}
export async function searchCourses(params?: CourseParams) {
    const res = await axios.get('/api/courses', { params })
    return res.data as CourseCollection;
}

export async function getCourseById(id: number) {
    try {
        const res = await axios.get('/api/courses/' + id);
        return res.data as Course;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return undefined;
            }
            throw new Error(error.response?.data.message)
        }
        throw new Error("Unexpected error")
    }

}


export async function createCourse(data: any) {
    try {
        const res = await axios.post('/api/courses', data);
        return res.data as Course;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Unexpected error")
    }
}

export async function updateCourse(courseId: number, data: any) {
    try {
        const res = await axios.put('/api/courses/' + courseId, data);
        return res.data as Course;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Unexpected error")
    }
}

export async function deleteCourse(courseId: number) {
    try {
        await axios.delete('/api/courses/' + courseId);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
        throw new Error("Unexpected error")
    }
}

export async function login(email: string, password: string) {
    try {
        const res = await axios.post('/api/login/', { email, password });
        const token = res.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        return res.data.user as User;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Unexpected error")
    }
}

export interface RegisterUser {
    email: string,
    password: string,
    firstName: string,
    lastName: string,

}

export async function register(data: RegisterUser) {
    try {
        const res = await axios.post('/api/register/', data);
        const token = res.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        return res.data.user as User;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Unexpected error")
    }
}

export async function logout() {
    await axios.post('/api/logout');
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = undefined;
}

export async function getUser() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    try {
        const res = await axios.get('/api/user/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        return res.data as User;
    } catch (error) {
        localStorage.removeItem('token');
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Unexpected error")
    }
}