import React from 'react'
import Form from '../components/form/Form'
import { Link } from 'react-router-dom'

interface Props {
    onLogin: (email: string, password: string) => void
}

export default function LoginPage(props: Props) {
    return (
        <div>
            <Form title='Login'
                onSubmit={(val) => {
                    props.onLogin(val.email, val.password)
                }}
            >
                <Form.Input label='Email' placeholder='Email...' name='email' type='email' required />
                <Form.Input label='Password' placeholder='password...' name='password' type='password' required />
                <button className='btn btn-primary mt-2 form-control'>Login</button>
            </Form>
            <Link to='/register'>
                <button className='btn btn-secondary mt-2 form-control'>Go to register</button>
            </Link>
        </div>
    )
}
