import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css';
const App = () => {
    return (
        <div>
            <nav>
                <div className='navContent'>
                    <div className='navLinks'>
                        <Link to="/counter">Counter</Link>
                        <Link to="/posts">Posts</Link>
                    </div>
                </div>
            </nav>
            <br />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default App