import React from 'react'
import { Label } from '../model'
import Form from './form/Form'

interface Props {
    onChange: (val: React.SetStateAction<any>) => void,
    value: any,
    maxPage: number
}

export default function CourseFilter(props: Props) {
    return (
        <div className='search-filter'>
            <Form formValue={props.value} onChange={props.onChange} className='search-form'>
                <Form.Input name='name' placeholder='Search...' />
            </Form>
            <button
                onClick={() => {
                    props.onChange((prev: any) => {
                        const newValue = Math.max(1, (prev.page || 0) - 1);
                        if (newValue === prev.page) {
                            return prev;
                        }
                        return {
                            ...prev,
                            page: newValue
                        }
                    })
                }}
                disabled={props.value.page === 1}
                className="btn btn-white mt-3 border-dark"
            > &laquo;</button>
            <button
                onClick={() => {
                    props.onChange((prev: any) => {
                        return {
                            ...prev,
                            page: (prev.page || 0) + 1
                        }
                    })
                }}
                disabled={props.value.page >= props.maxPage}
                className="btn btn-white mt-3 border-dark"
            > &raquo;</button>
        </div>
    )
}
