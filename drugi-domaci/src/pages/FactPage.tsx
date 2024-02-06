import React from 'react'
import { useFact } from '../hooks/apiHooks'

export default function FactPage() {
    const fact = useFact();
    return (
        <div>
            <h3 className='text-center'>Random fact</h3>
            <p className='mt-3 px-5 text-center'>
                {fact}
            </p>
        </div>
    )
}
