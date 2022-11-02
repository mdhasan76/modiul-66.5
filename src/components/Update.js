import React from 'react';
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom'

const Update = () => {
    const userData = useLoaderData();
    console.log(userData)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password }
        console.log(user)
        // console.log(email, password)

        fetch(`http://localhost:5000/update/${userData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" defaultValue={userData.email} name='email' placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" defaultValue={userData.password} name='password' placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update user
                </Button>
            </Form>
        </div>
    );
};

export default Update;