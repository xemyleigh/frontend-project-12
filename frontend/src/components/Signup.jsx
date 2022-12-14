import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { useAuth } from '../hooks';
import reg from '../images/reg.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useTranslation();

  const [userAlreadyExists, setUserExistsState] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, t('signup.usernameConstraints')).max(20).required(t('signup.required')),
      password: yup.string().min(6, t('signup.passMin')).required(t('signup.required')),
      repeatPassword: yup.string().oneOf([yup.ref('password'), null], t('signup.mustMatch')),
    }),
    onSubmit: async (values) => {
      setUserExistsState(false);

      try {
        await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        signIn(values.username, values.password);

        navigate('/');
      } catch (e) {
        if (e.response?.status === 409) {
          setUserExistsState(true);
          return;
        }

        if (e.isAxiosError) {
          toast(t('errors.network'));
          throw e;
        } else {
          toast(t('erros.unknown'));
        }
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div className="container-fluid">
      <div className="row align-content-center justify-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card mt-5">
            <div className="card-body row justify-content-center m-0 p-5">

              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={reg} className="rounded-circle img" alt="" />
              </div>

              <div className="col-12 col-md-6 d-flex justify-content-center">
                <Form noValidate validated={false} onSubmit={formik.handleSubmit} className="w-100">
                  <h1 className="mb-3 text-center">{t('signup.header')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control required onBlur={formik.handleBlur} type="username" ref={input} isInvalid={(formik.errors.username || userAlreadyExists) || false} id="username" name="username" placeholder={t('signup.usernameConstraints')} onChange={formik.handleChange} value={formik.values.username} />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" isInvalid={(formik.errors.password || userAlreadyExists) || false} id="password" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password} />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control onBlur={formik.handleBlur} type="password" isInvalid={(formik.errors.repeatPassword || userAlreadyExists) || false} id="repeatPassword" name="repeatPassword" placeholder="repeatPassword" onChange={formik.handleChange} value={formik.values.repeatPassword} />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.repeatPassword || ((userAlreadyExists) && t('signup.alreadyExists'))}
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="repeatPassword">{t('signup.confirm')}</Form.Label>
                  </Form.Group>

                  <Button type="submit" className="w-100 mb-3">{t('signup.submit')}</Button>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
