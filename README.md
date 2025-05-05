# Reddit Minimal App

A React-based web application that allows users to browse and search Reddit posts. This project demonstrates the use of modern React features, including hooks, state management with Redux, routing with React Router, and API integration.

## Features

### General Features
- Browse top posts from Reddit.
- Search for posts by keywords.
- Responsive design for mobile and desktop.
- Easy-to-use interface.

### Header Component
- Displays the application logo and title.
- Includes a search form for searching Reddit posts.
- Provides a menu button to toggle the visibility of the subreddit navigation.

### SubReddits Component
- Displays a list of predefined subreddits.
- Allows users to select a subreddit, fetch its posts, and navigate to the home page.
- Highlights the currently active subreddit.
- Clears the search term when a new subreddit is selected.

### NewsDetails Component
- Fetches and displays a list of Reddit posts.
- Filters posts based on a search term.
- Displays post details, including title, image, author, creation time, number of comments, and likes.
- Allows users to toggle the visibility of comments for individual posts.
- Handles loading and error states during data fetching.

### CommentsDetails Component
- Fetches and displays comments for a specific Reddit post.
- Shows the username, relative time, number of likes, and the comment text for each comment.
- Handles loading and error states during data fetching.

### SearchFallback Component
- Displays a message indicating that no posts are available for the current search term.
- Provides a button to navigate back to the home page and clear the search term.

### State Management
- Fetches news posts from a specified subreddit using the Reddit API.
- Fetches comments for a specific Reddit post using the Reddit API.
- Stores and manages fetched data in the Redux store.
- Provides actions for setting and clearing a search term.
- Includes selectors for accessing and filtering news data based on the search term.
- Handles loading and error states during API calls.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd reddit-app
npm install
```

## Usage

1. Start the development server using `npm start`.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Use the search bar to find posts or browse the default feed.

## Project Structure

The project is organized into the following key components:

- **Header**: Displays the application logo, search form, and menu button.
- **SubReddits**: Allows users to navigate between different subreddits.
- **NewsDetails**: Displays a list of Reddit posts and their details.
- **CommentsDetails**: Displays comments for a specific Reddit post.
- **SearchFallback**: Provides a fallback UI when no posts match the search term.

## Technologies Used

- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **React Router**: For routing and navigation.
- **Reddit API**: For fetching posts and comments.
- **CSS**: For styling the application.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Reddit API](https://www.reddit.com/dev/api/) for providing the data.
- [React](https://reactjs.org/) for the framework.
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management.
- [React Router](https://reactrouter.com/) for routing.

