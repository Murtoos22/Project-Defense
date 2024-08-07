import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './LeaveComment.module.css';
import { useParams } from 'react-router-dom';
import { appendComment, appendReply } from '../../../api/token-api';

const LeaveComment = ({ onCommentAdded, isReply = false, comment }) => {
    const { id } = useParams();

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('Comment cannot be empty!'),
    });

    const handleFormSubmit = async (value, { setSubmitting, setErrors, resetForm }) => {
        const { comm } = value;

        try {
            let newToken;
            if(!isReply) {
                newToken = await appendComment(comm, id);
            } else {
                newToken = await appendReply(comm, id, comment);
            };
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
