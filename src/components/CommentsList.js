import React from "react";
import { getRelativeTime } from "../utilities";

export const CommentsList = ({ id, comment, newsId }) => {

    return (
       /* comment.commentsDetailsId === newsId && ( // Check if the comment belongs to the newsId passed as prop
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
            </li>
        )
    );
};