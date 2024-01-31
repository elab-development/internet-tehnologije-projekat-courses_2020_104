import React from 'react'
import Form from '../components/form/Form'
import { Link } from 'react-router-dom'

interface Props {
    onSubmit: (data: any) => void
}

export default function RegisterPage(props: Props) {
    return (
        <div>
            <Form title='Register'
                onSubmit={(val) => {
                    if (val.repeat !== val.password) {
                        return;
                    }
                    props.onSubmit(val);
                }}
            >
                <Form.Input label='First name' placeholder='First name...' name='firstName' required />
                <Form.Input label='Last name' placeholder='Last name...' name='lastName' required />
                <Form.Input label='Email' placeholder='Email...' name='email' type='email' required />
                <Form.Input label='Password' placeholder='password...' name='password' type='password' required />
                <Form.Input label='Repeat password' placeholder='Repeat...' name='repeat' type='password' required />
                <button className='btn btn-primary mt-2 form-control'>Register</button>
            </Form>
            <Link to='/'>
                <button className='btn btn-secondary mt-2 form-control'>Back to login</button>
            </Link>
        </div>
    )
}
