import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { register } from '../../api/user-api';
import useUserLoginCheck from '../../hooks/useUserLoginCheck';

import styles from './Register.module.css';

const Register = () => {
  const { checkAndRedirect, navigate } = useUserLoginCheck();
  const isLoggedIn = checkAndRedirect();
  if (isLoggedIn) return null;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, 'Must be no longer than 20 characters long')
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    email: Yup.string()
      .min(10, 'Must be at least 10 characters long')
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(12, 'Must be at least 12 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Register</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { username, email, password, confirmPassword } = values;

          try {
            await register(username, email, password, confirmPassword);
            navigate('/');
          } catch (error) {
            setErrors({ submit: error.message });
            setSubmitting(false);
          };
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <Field type="text" name="username" className={styles.input} />
              <ErrorMessage name="username" component="div" className={styles.formError} />
            </div>
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
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <Field type="password" name="confirmPassword" className={styles.input} />
              <ErrorMessage name="confirmPassword" component="div" className={styles.formError} />
            </div>
            {errors.submit && <div className={styles.formError}>{errors.submit}</div>}
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              Register
            </button>
            <div className={styles.redirectLink}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

