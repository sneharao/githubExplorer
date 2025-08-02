import { useRef, useState } from 'react';
import RepoPreviewCard from './RepoPreviewCard';
import { useGithubRepos } from '../services/repoService';
import { Repository } from '../models/repository';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import SearchBar from './SearchBar';

function RepoContainer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSortBy, setCurrentSortBy] = useState<string>(''); // State for sorting
    const [sortedRepos, setSortedRepos] = useState<Repository[]>([]); // State to hold repositories

    // useRef to get a direct reference to the DOM element (the sentinel div)
    const triggerRef = useRef(null);

    const {
        data,
        fetchNextPage, // Function to fetch the next page
        hasNextPage,   // Boolean: true if there's a next page to fetch
        isFetchingNextPage, // Boolean: true if currently fetching the next page
        isLoading,     // Boolean: true if the initial data is loading
        isError,       // Boolean: true if there was an error
        error,         // Error object if isError is true
    } = useGithubRepos(searchQuery);

    // Flatten the data.pages array into a single array of repositories
    // data.pages is an array of the objects returned by queryFn ({ repos: [], nextPage: ... })
    const allRepos: Repository[] = data?.pages?.flatMap(page => page.repos) || [];

    // callback function that will be triggered when the sentinel is visible
    const onSentinelIntersect = () => {
        // load more data when the user scrolls to the bottom
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const onSelectSOrtBy = (sortBy: 'stars' | 'repoName') => {
        setCurrentSortBy(sortBy);
        const sortedRepos = [...allRepos].sort((a, b) => {
            if (sortBy === 'stars') {
                return b.stars - a.stars; // Sort by stars in descending order
            }
            if(sortBy === 'repoName') {
                return a.name.localeCompare(b.name); // Sort by repository name in ascending order
            }

            return 0; // No sorting if sortBy is empty
        });
        setSortedRepos(sortedRepos); // Update the state with sorted repositories
    };

    // Pass the ref, the callback, and optionally any Intersection Observer options
    useIntersectionObserver(triggerRef, onSentinelIntersect);

    // Handle form submission on button click
    const handleSearchSubmit = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Explore Repositories Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Repositories</h1>
                    <div className="flex items-center space-x-4">
                        {/* Search Input */}
                        <SearchBar onSearchClick={handleSearchSubmit} />

                        {/* Sort By Dropdown */}
                        <select
                            className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentSortBy} onChange={(e) => onSelectSOrtBy(e.target.value as 'stars' | 'repoName')} // Functional part
                        >
                            <option value="stars">Sort by Stars</option>
                            <option value="repoName">Sort by Repo Name</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Display loading indicator if initial data is loading */}
                    {isLoading && <p className="col-span-full text-center text-gray-600">Loading repositories...</p>}
                    {/* Display error message if there's an error */}
                    {(error || isError) && <p className="col-span-full text-center text-red-500">Error: {error.message}</p>}

                    {/* Map and display sorted repository cards */}
                    {sortedRepos?.map((repo: Repository) => (
                        <RepoPreviewCard key={repo.id} repo={repo} /> // Use a unique key like repo.id
                    ))}

                    {/* Map and display repository cards */}
                    {allRepos?.map((repo: Repository) => (
                        <RepoPreviewCard key={repo.id} repo={repo} /> // Use a unique key like repo.id
                    ))}

                    {/* The sentinel div that the Intersection Observer will watch */}
                    {hasNextPage && (
                        <div ref={triggerRef} className="col-span-full sentinel h-1 w-full bg-transparent"></div>
                    )}

                    {/* Show a loading message when more data is being fetched */}
                    {isFetchingNextPage && (
                        <div className="col-span-full text-center py-4 text-gray-600">
                            Loading more repositories...
                        </div>
                    )}

                    {/* Message when no more items are available */}
                    {!hasNextPage && !isLoading && allRepos.length > 0 && (
                        <div className="col-span-full text-center py-4 text-gray-500">
                            You've reached the end of the list!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RepoContainer;
