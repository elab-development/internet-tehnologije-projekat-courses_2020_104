import axios, { GenericAbortSignal } from "axios";
import { BooksResponse, Course, CourseCollection, Label, User, UserType } from "../model";


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
export async function updateCourseStudents(courseId: number, data: any) {
    try {
        const res = await axios.put('/api/courses/' + courseId + '/students', data);
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

export async function uploadFile(fd: FormData) {
    const res = await axios.post('/api/upload', fd);
    return res.data.fileName as string;
}

export async function createLesson(courseId: number, lessonData: any) {
    const res = await axios.post('/api/courses/' + courseId + '/lessons', lessonData);
    return res.data as Course;
}
export async function updateLesson(courseId: number, lessonId: number, lessonData: any) {
    const res = await axios.put('/api/courses/' + courseId + '/lessons/' + lessonId, lessonData);
    return res.data as Course;
}
export async function deleteLesson(courseId: number, lessonId: number) {
    const res = await axios.delete('/api/courses/' + courseId + '/lessons/' + lessonId);
    return res.data as Course;
}

export async function getLabelStatistics() {
    const res = await axios.get('/api/label-statistics');
    return res.data as any;
}
export async function getCourseStatistics() {
    const res = await axios.get('/api/course-statistics');
    return res.data as any;
}

export async function getFact(signal?: GenericAbortSignal) {
    const res = await axios.get('/api/fact', { signal });
    return res.data.fact as string;
}

export async function fetchUsers(userType?: UserType) {
    const res = await axios.get('/api/users', { params: { type: userType } });
    return res.data as User[];
}

export async function getBooks(search: string, signal?: GenericAbortSignal) {
    const res = await axios.get("/api/books" + search, {
        signal
    });
    return res.data as BooksResponse;
}