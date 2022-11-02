import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    const [prev, setUser] = useState([]);

    useEffect(() => {
        const data = () => {
            fetch("http://localhost:5000/user")
                .then(res => res.json())
                .then(data => setUser(data))
        }
        data()
    }, [])
    const handleDelete = (id) => {
        const confirm = window.confirm('Do you want to delete This user?')
        if (confirm) {
            fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    const newUser = prev.filter(user => user._id !== id);
                    setUser(newUser)
                    console.log("User deleted Successful")
                })

        }

    }
    return (
        <div>
            <div className='text-center'>
                <Link style={{ marginRight: '10px' }} to='/'>Home</Link>
                <Link to='/add'>Add</Link>
            </div>
            <div>
                {
                    prev.map(user => <div key={user._id} className='border p-5 m-5'>
                        <h3>email: {user.email}</h3>
                        <h6>password: {user.password}</h6>
                        <p> id: {user._id}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;