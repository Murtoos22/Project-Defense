import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './EditComment.module.css';

import { editComment } from '../../../../api/token-api';

const EditComment = ({ comment, onEdit }) => {
    const { id } = useParams();
    const commentId = comment._id.toString();

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('Comment cannot be empty!'),
    });

    const handleFormSubmit = async (value, { setSubmitting, setErrors, resetForm }) => {
        const { comment: newComment } = value;

        try {
            let newToken;
            if(!comment.tokenId) {
                newToken = await editComment(commentId, newComment, id);
            } else {
                newToken = await editComment(commentId, newComment, comment.tokenId);
            };
            console.log(newToken);
            
            onEdit(newToken);
        } catch (err) {
            setErrors({ submit: err.message });
            setSubmitting(false);
        };
    };

    return (
        <Formik
            initialValues={{ comment: comment.text }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ values, isSubmitting, handleChange, handleBlur }) => (
                <Form className={styles.leaveCommentContainer}>
                    <Field
                        as="textarea"
                        name="comment"
                        placeholder="edit your comment..."
                        className={styles.commentTextArea}
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <ErrorMessage name="comment" component="div" className={styles.commentErrorText} />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.leaveCommentButton}
                    >
                        Edit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default EditComment;