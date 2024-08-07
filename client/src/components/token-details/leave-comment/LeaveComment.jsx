import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './LeaveComment.module.css';
import { appendComment } from '../../../api/token-api';

const LeaveComment = ({ onCommentAdded }) => {
    const { id } = useParams();

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('Comment cannot be empty!'),
    });

    const handleFormSubmit = async (value, { setSubmitting, setErrors, resetForm }) => {
        const { comment } = value;

        try {
            const newToken = await appendComment(comment, id);
            resetForm();
            onCommentAdded(newToken);
        } catch (err) {
            setErrors({ submit: err.message });
            setSubmitting(false);
        };
    };

    return (
        <Formik
            initialValues={{ comment: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.leaveCommentContainer}>
                    <Field
                        as="textarea"
                        name="comment"
                        className={styles.commentTextArea}
                        placeholder="Leave a comment..."
                    />
                    <ErrorMessage name="comment" component="div" className={styles.commentErrorText} />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.leaveCommentButton}
                    >
                        Comment
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LeaveComment;
