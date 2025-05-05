export const getRelativeTime = (timestamp) => {
    const now = new Date().getTime();
    const diffInMs = now - timestamp;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
};

export const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + "k"; 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M"; 
    }
    return num.toString(); 
};