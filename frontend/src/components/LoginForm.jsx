import React from 'react';
import { useFormik } from 'formik';
import Form from '../../node_modules/react-bootstrap/Form'
import Button from '../../node_modules/react-bootstrap/Button'
import yup from '../../node_modules/yup'

console.log(useFormik);

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
        nickname: '',
        password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className='container-fliud'>
        <div className='row align-content-center justify-content-center'>
            <div className='col-6'>
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
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="password" name="password"placeholder="password" onChange={formik.handleChange} value={formik.values.password}/>
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