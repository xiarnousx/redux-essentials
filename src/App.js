import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css';
const App = () => {
    return (
        <div>
            <nav>
                <ul className='navLinks'>
                    <li><Link to="/counter">Counter</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                </ul>
            </nav>
            <br />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default App