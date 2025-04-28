import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCommentsDetails, selectCommentsLoading, selectCommentsError } from '../features/commentsSlice';
import { getRelativeTime } from '../utilities';
import { fetchCommentsDetails } from '../features/commentsSlice';


export const CommentsDetails = ({newsId}) => {
    const commentsDetails = useSelector(selectCommentsDetails) || {}; // Ensure commentsDetails is an object
    const loading = useSelector(selectCommentsLoading);
    const error = useSelector(selectCommentsError);
    const dispatch = useDispatch(); // Initialize the dispatch function

   



        


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul className="comments-lists">
            {commentsDetails && Object.keys(commentsDetails).length > 0 ? (
                Object.entries(commentsDetails).map(([id, comment]) => (
                     // This is where the log happens
                    comment && comment.commentsDetailsId === newsId && (
                        <li key={id} className="comment">
                            <div className="comment-header">
                                <div className="user-info">
                                    <img
                                        className="profile-imge"
                                        src={comment.profilePic}
                                        alt={`${comment.postedBy}'s profile`}
                                        style={{ width: "15px", height: "20px", marginRight: "10px" }}
                                    />
                                    <p>{comment.postedBy}</p>
                                </div>
                                <p>{getRelativeTime(comment.createdAt)}</p>
                            </div>
                            <p>{comment.comment}</p>
                            <p>Likes: {comment.numOfLikes}</p>
                        </li>
                    )
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </ul>
    );
}

