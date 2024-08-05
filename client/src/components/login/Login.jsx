import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { login } from '../../api/user-api';
import useUserLoginCheck from '../../hooks/useUserLoginCheck';

import styles from './Login.module.css';

const Login = () => {
  const { checkAndRedirect, navigate } = useUserLoginCheck();
  const isLoggedIn = checkAndRedirect();
  if (isLoggedIn) return null;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(12, 'Must be at least 12 characters')
      .required('Required'),
  });

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { email, password } = values;

          try {
            await login(email, password);
            navigate('/');
          } catch (error) {
            setErrors({ submit: error.response.data.message });
            setSubmitting(false);
          };
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <Field type="email" name="email" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.formError} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <Field type="password" name="password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.formError} />
            </div>
            {errors.submit && <div className={styles.formError}>{errors.submit}</div>}
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              Login
            </button>
            <div className={styles.redirectLink}>
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
