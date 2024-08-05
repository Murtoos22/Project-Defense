import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { createComment } from '../../../api/comments-api';

import styles from './LeaveComment.module.css';

const LeaveComment = () => {
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
        .required('Comment cannot be empty!'),
    });

    return (
        <Formik
            initialValues={{ comment: '' }}
            validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting, setErrors }) => {
                const { comment } = value;

                try {
                    // TODO find a way to parse the username into the create comment function (mongoose schema requires it)
                    await createComment(comment);
                } catch (err) {      
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                };
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.leaveCommentContainer}>
                    <Field
                        as="textarea"
                        name="comment"
                        className={styles.commentTextArea}
                        placeholder="Leave a comment..."
                    />
                    <ErrorMessage name="comment" component="div" className={styles.commentErrorText}/>
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
