import React from 'react';
import { useFormik } from 'formik';
import Form from '../../node_modules/react-bootstrap/Form'
import Button from '../../node_modules/react-bootstrap/Button'
import * as yup from 'yup';


const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
        nickname: '',
        password: '',
    },
    validationSchema: yup.object({
        nickname: yup.string().required('Required'),
        password: yup.string().required('Required')
    }),
    onSubmit: (values) => {
        console.log(formik)
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className='card'>
        <div className="card-body mb-3 row justify-content-center">
            <div className='col-5'>
                <img src="..." className="card-img-top" alt="" />
                <p>IMAGE IS GONNA BE HERE</p>
            </div>

            <div className='col-5'>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control type="nickname" id="nickname" name="nickname"placeholder="nickname" onChange={formik.handleChange} value={formik.values.nickname}/>
                        <div>{formik.errors.nickname}</div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" name="password"placeholder="password" onChange={formik.handleChange} value={formik.values.password}/>
                        <div>{formik.errors.password}</div>

                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>

            </div>
        </div>
    </div>
    )
}

export default SignupForm