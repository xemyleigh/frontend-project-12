import React from 'react';
import { useFormik } from 'formik';
import Form from '../../node_modules/react-bootstrap/Form'
import Button from '../../node_modules/react-bootstrap/Button'
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import login from '../images/login.jpg'
import { Link } from 'react-router-dom';


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
                <div className='card mt-5'>
                    <div className="card-body row justify-content-center m-0 p-sm-5">

                        <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                            <img src={login} className="rounded-circle img" alt="" />
                        </div>

                        <div className='col-12 col-md-6 d-flex justify-content-center'>
                            <Form onSubmit={formik.handleSubmit} >
                                <h1 className='mb-3 text-center'>Войти</h1>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='visually-hidden'>username</Form.Label>
                                    <Form.Control type="username" id="username" name="username"placeholder="username" onChange={formik.handleChange} value={formik.values.username}/>
                                    <div>{formik.errors.password}</div>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='visually-hidden'>Password</Form.Label>
                                    <Form.Control type="password" id="password" name="password"placeholder="password" onChange={formik.handleChange} value={formik.values.password}/>
                                    {authFailed && <div>Неверное имя или пароль</div>}
                                </Form.Group>
                                <Button type="submit" className='w-100 mb-3'>Войти</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="card-footer p-sm-4 text-center">Нет аккаунта? <Link to='/signup'>Регистрация</Link></div>

                </div>
            </div>
        </div>
    </div>


    )
}

export default SignupForm