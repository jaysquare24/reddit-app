import { selectNewsDetails, selectLoading, selectError } from "../features/newsDetailsSlice";
import { useSelector } from "react-redux";
import {getRelativeTime} from "../utilities";

export const NewsDetail = () => {
    const newsDetails = useSelector(selectNewsDetails);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!newsDetails || newsDetails.length === 0) {
        return <div>No news available.</div>;
    }

    return (
        <div className="news-details">
            {newsDetails.map((news, index) => (
                <div key={index} className="news-item">
                    <h2>{news.tittle}</h2>
                    <img src={news.image} alt={news.tittle} />
                    <div>
                        <p>Posted by: {news.postedBy}</p>
                        <p>Created at: {getRelativeTime(news.createdAt)}</p>
                        <p>Comments: {news.comments.length}</p>
                        <p>Likes: {news.numOfLikes}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}