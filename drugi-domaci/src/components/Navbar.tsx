import React from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../model'

interface Props {
    user: User,
    logout: () => void
}

export default function Navbar(props: Props) {
    const titleMap = {
        'teacher': 'Teacher panel',
        'student': 'Online courses',
        'admin': 'Admin panel'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <NavLink className='navbar-brand' to='/'>{titleMap[props.user.type]}</NavLink>
            <div className="collapse navbar-collapse d-flex- justify-content-between align-items-center" >
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className='nav-link' to='/'>Courses</NavLink>
                    </li>
                </ul>
                <div>
                    <span className="navbar-text mr-2">
                        {props.user.firstName + ' ' + props.user.lastName}
                    </span>
                    <button className='btn btn-danger mx-2' onClick={props.logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
