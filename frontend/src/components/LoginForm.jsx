import React from 'react';
import { useFormik } from 'formik';
import Form from '../../node_modules/react-bootstrap/Form'
import Button from '../../node_modules/react-bootstrap/Button'
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';


const SignupForm = () => {
    const { signIn, setUsername } = useAuth()
    const [authFailed, setAuthFailed] = useState(false)

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    validationSchema: yup.object({
        username: yup.string().required('Required'),
        password: yup.string().required('Required')
    }),
    onSubmit: async (values) => {
        try {
            const username = formik.values.username
            await signIn(username, formik.values.password)
            setUsername(username)    
        } catch(e) {
            if (e.response.status === 401) setAuthFailed(true)
        }
    },
  });
  return (
    <div className='container'>
        <div className='row align-content-center justify-content-center'>

            <div className='col-12 col-md-8 col-xxl-6'>

                <div className='card'>
                    <div className="card-body mb-3 row justify-content-center">
                        <div className='col-5'>
                            <img src="..." className="card-img-top" alt="" />
                            <p>IMAGE IS GONNA BE HERE</p>
                        </div>

                        <div className='col-5'>
                            <Form onSubmit={formik.handleSubmit} >
                                <Form.Group>
                                    <Form.Label>username</Form.Label>
                                    <Form.Control type="username" id="username" name="username"placeholder="username" onChange={formik.handleChange} value={formik.values.username}/>
                                    <div>{formik.errors.password}</div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="password" name="password"placeholder="password" onChange={formik.handleChange} value={formik.values.password}/>
                                    {authFailed && <div>Неверное имя или пароль</div>}
                                </Form.Group>
                                <Button type="submit">Submit</Button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    )
}

export default SignupForm