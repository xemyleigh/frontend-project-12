import React, { useRef } from 'react';
import { useFormik } from 'formik';
import Form from '../../node_modules/react-bootstrap/Form'
import Button from '../../node_modules/react-bootstrap/Button'
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import login from '../images/login.jpg'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel"



const SignupForm = () => {
    const { signIn, setUsername } = useAuth()
    const [authFailed, setAuthFailed] = useState(false)
    const { t } = useTranslation()

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
            if (e.response?.status === 401) {
                console.log(e.isAxiosError)
                setAuthFailed(true)
                return
            }

            if (e.isAxiosError) {
                toast.error(t('errors.network'))
            } else {
                toast.error(t('erros.unknown'))
            }
        }
    },
  });

  const input = useRef(null)
  useEffect(() => input.current.focus(), [])


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
                                <h1 className='mb-3 text-center'>{t('login.header')}</h1>

                                <Form.Group className='form-floating mb-3'>
                                    <FloatingLabel className='' label={t('login.username')}>
                                        <Form.Control ref={input} onBlur={formik.handleBlur} type="username" isInvalid={authFailed} id="username" name="username" placeholder="username" onChange={formik.handleChange} required value={formik.values.username}/>
                                    </FloatingLabel>
                                </Form.Group>


                                <Form.Group className='form-floating mb-3'>
                                    <FloatingLabel className='' label={t('login.password')}>
                                        <Form.Control onBlur={formik.handleBlur} type="password" isInvalid={authFailed} id="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password}/>
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {t('login.authFailed')}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Button type="submit" className='w-100 mb-3'>{t('login.header')}</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="card-footer p-sm-4 text-center">{t('login.newToChat')}<Link to='/signup'>{t('login.signup')}</Link></div>

                </div>
            </div>
        </div>
    </div>


    )
}

export default SignupForm