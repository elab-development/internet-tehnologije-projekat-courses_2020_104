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
    contentType: LessonType
}

export type LessonType = 'video' | 'text' | 'audio' | 'image' | 'file'

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    type: UserType
}
export type UserType = 'student' | 'teacher' | 'admin'

export interface BooksResponse {
    total: number,
    hasNext: boolean,
    hasPrevious: boolean,
    data: Book[]
}

export interface Book {
    id: number,
    title: string,
    authors: BookPerson[],
    translators: BookPerson[],
    subjects: string[],
    languages: string[],
    bookshelves: string[],
    copyright: boolean;
}

export interface BookPerson {
    name: string,
    birth_year: number,
    death_year: number
}