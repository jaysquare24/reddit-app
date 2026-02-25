import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsDetails, selectCommentsLoading, selectCommentsError } from "../features/commentsSlice";
import { getRelativeTime, formatNumber } from "../utilities";

export const CommentsDetails = ({ newsId }) => {
  const commentsDetails = useSelector(selectCommentsDetails) || [];
  const loading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error fetching comments: {error}</div>;

  const filteredComments = commentsDetails.filter(
    (comment) => comment.commentsDetailsId === newsId
  );

  if (filteredComments.length === 0) return <p>No Comment Available.</p>;

  return (
    <div className="comments-container">
      {filteredComments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="user-info">
              <p>
                Username: <span className="comment-username">{comment.postedBy}</span>
              </p>
            </div>
            <p>{getRelativeTime(comment.createdAt)}</p>
            <p>
              <img
                src="https://img.icons8.com/?size=100&id=66627&format=png&color=FFFFFF"
                alt="like icon"
              />
              {formatNumber(comment.numOfLikes)}
            </p>
          </div>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};