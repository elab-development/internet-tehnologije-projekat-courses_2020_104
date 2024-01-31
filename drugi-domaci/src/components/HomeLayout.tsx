import React from 'react'


interface Props {
    error: string,
    children: React.ReactNode,
    removeError: () => void
}

export default function HomeLayout(props: Props) {
    return (
        <div className='home-layout'>
            <div className='container home-content'>
                {
                    props.error && (
                        <div className="alert alert-danger p-2 mt-2 d-flex align-items-center justify-content-between" role="alert">
                            {props.error}
                            <button type="button" className="btn btn-white" onClick={props.removeError}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )
                }
                {props.children}
            </div>
        </div>
    )
}
