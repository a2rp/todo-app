import React from 'react'
import TodoApp from './todoApp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TodoApp />
            </div>

            <ToastContainer />
        </div>
    )
}

export default App

