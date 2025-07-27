# GitHub Explorer

GitHub Explorer is a React-based web application designed to help users search, explore, and view detailed information about GitHub repositories. It features infinite scrolling for search results, a dedicated detail page for each repository, and a simulated API rate limit warning system.

## Features

- Repository Search: Search for GitHub repositories by name, description, or full name.

- Infinite Scrolling: Automatically loads more repositories as the user scrolls down, providing a seamless browsing experience.

- Repository Detail Page: Click on any repository card to view comprehensive details, including:

    Primary Language

    Number of Forks and Watchers

    Top 5 Contributors

    List of Open Issues

API Rate Limit Warning: The application includes a mock rate-limiting mechanism to demonstrate how to warn users when they are approaching API call limits.

Responsive Design: Built with Tailwind CSS for a responsive and modern user interface that adapts to various screen sizes.

Modular Architecture: Organized into reusable React components and custom hooks for better maintainability and scalability.

### Technologies Used

- React: A JavaScript library for building user interfaces.

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

- Tailwind CSS: A utility-first CSS framework for rapidly styling applications.

- @tanstack/react-query: For efficient data fetching, caching, and synchronization with the server, including infinite scrolling capabilities.

- react-router-dom: For client-side routing and navigation between the repository list and detail pages.

- Intersection Observer API: Used for implementing infinite scrolling.

## Available Scripts

Clone project :
git clone git@github.com:sneharao/githubExplorer.git
cd github-explorer

### `npm i`

Installs all the required packages to run the application


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Future Improvements

- Add more sophisticated filtering options (e.g., by language, or sort by stars/forks).

- Implement GitHub OAuth for higher API rate limits.

- Bookmark repositories in localStorage

- Add a "Commit History" tab to the detail page by fetching from the commits API.

- Improve error states with more specific UI feedback.

- Add unit and integration tests.

- Implement debouncing for the search input to reduce API calls while typing.

## Learn More

You can learn more in

- [Rest API to fetch public repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28&search-overlay-input=api+to+get+list+of+puiblic+repositories#list-public-repositories)
- [Pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28&search-overlay-input=search+api&search-overlay-ask-ai=true)
- [Rest API for repository issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues)
- [Search API](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28&versionId=free-pro-team%40latest&restPage=using-pagination-in-the-rest-api#about-search)

To learn React, check out the [React documentation](https://reactjs.org/).

## Snaps of the application

<img width="2063" height="1242" alt="Screenshot 2025-07-27 at 17 28 52" src="https://github.com/user-attachments/assets/9fdc970f-7fdb-4fc1-9dd6-431acac7a3f0" />
<img width="1719" height="917" alt="Screenshot 2025-07-27 at 17 30 23" src="https://github.com/user-attachments/assets/4fe0e952-47f8-49be-986e-d0bd8610b407" />




