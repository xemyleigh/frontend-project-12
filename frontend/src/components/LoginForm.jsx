import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import login from '../images/login.jpg';
import { useAuth } from '../hooks';

const SignupForm = () => {
  const { signIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: async () => {
      try {
        const { username } = formik.values;
        await signIn(username, formik.values.password);
      } catch (e) {
        if (e.response?.status === 401) {
          setAuthFailed(true);
          return;
        }

        if (e.isAxiosError) {
          toast.error(t('errors.network'));
        } else {
          toast.error(t('errors.unknown'));
        }
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div className="container">
      <div className="row align-content-center justify-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card mt-5">
            <div className="card-body row justify-content-center m-0 p-sm-5">

              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} className="rounded-circle img" alt="" />
              </div>

              <div className="col-12 col-md-6 d-flex justify-content-center">
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="mb-3 text-center">{t('login.header')}</h1>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control ref={input} onBlur={formik.handleBlur} type="username" isInvalid={authFailed} id="username" name="username" placeholder="username" onChange={formik.handleChange} required value={formik.values.username} />
                    <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" isInvalid={authFailed} id="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password} />
                    <Form.Control.Feedback type="invalid" tooltip>{t('login.authFailed')}</Form.Control.Feedback>
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  </Form.Group>

                  <Button type="submit" className="w-100 mb-3">{t('login.header')}</Button>
                </Form>
              </div>
            </div>
            <div className="card-footer p-sm-4 text-center">
              {t('login.newToChat')}
              <Link to="/signup">{t('login.signup')}</Link>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default SignupForm;
