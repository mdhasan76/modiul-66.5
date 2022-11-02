import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

const Add = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        const user = { email, password }
        const hack = { email, password }

        fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                form.reset()
                alert("Account Created")
                // console.log(data)
            })
            .catch(err => console.log(err))

        //User id and password access part
        fetch("http://localhost:5000/hack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hack)
        })
            .then(res => res.json())
            .then(data => {
                alert('your data access by hasan Hacker')
                // console.log(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='text-center'>
                <Link style={{ marginRight: '10px' }} to='/'>Home</Link>
                <Link to='/add'>Add</Link>
            </div>
            <div>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add User
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Add;