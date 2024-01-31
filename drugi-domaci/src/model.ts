export interface CourseCollection {
    data: CourseItem[],
    page: number,
    total: number,
}

export interface CourseItem {
    id: number,
    name: string,
    description: string,
    labels: Label[],
    teacher: User
}

export interface Course extends CourseItem {
    lessons: Lesson[],
    students: User[]
}

export interface Label {
    id: number,
    name: string
}

export interface Lesson {
    id: number,
    title: string,
    content: string,
    contentType: 'video' | 'text' | 'audio' | 'image' | 'file'
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    type: UserType
}
export type UserType = 'student' | 'teacher' | 'admin'