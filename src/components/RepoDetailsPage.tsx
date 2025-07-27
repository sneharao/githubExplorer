/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { OpenIssues } from '../models/openIssues';
import { Contributor } from '../models/contributor';
import { useNavigate } from "react-router-dom";
import { useRepoStore } from '../store/repoStore';
import { fetchRepoDetails } from '../services/repoService';

function RepoDetailPage() {
    const selectedRepo = useRepoStore((state: any) => state.selectedRepo);
    const navigate = useNavigate();
    const [repoDetail, setRepoDetail] = useState<any>(selectedRepo); // Replace 'any' with your actual type

    useEffect(() => {
        if (!selectedRepo) {
            console.error('No repository selected');
            return;
        }
        fetchRepoDetails(selectedRepo)
            .then(data => {
                setRepoDetail(data);
            })
            .catch(error => {
                console.error('Error fetching repository details:', error);
            })
    }, [selectedRepo]);


    function onBack() {
        // Navigate back to the dashboard or previous page
        navigate('/');
    }

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Top Section: Back button and Repo Name */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onBack} // Functional part
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                        &larr; Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 flex-grow text-center">
                        {repoDetail.name} {/* Functional part */}
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Repository Details & Top Contributors */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Repository Details Section */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Repository Details</h2>
                            <p className='text-gray-900 mb-2'>{repoDetail.description}</p>

                            <p className="text-gray-700 mb-4">
                                <span className="font-semibold">Primary Language:</span> {repoDetail.language || 'Not specified'}
                            </p>
                            <div className="flex items-center space-x-6 text-gray-600">
                                <div className="flex items-center">
                                    {/* Forks Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 20v-7.5l1.5 1.5H20" />
                                        <path d="M18 13 22 9 18 5" />
                                        <path d="M8 10V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.5" />
                                    </svg>
                                    <span>Forks: {repoDetail.forks}</span>
                                </div>
                                <div className="flex items-center">
                                    {/* Watchers Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span>Watchers: {repoDetail.watchers}</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Contributors Section */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Top Contributors</h2>
                            {repoDetail.contributors && repoDetail.contributors?.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {repoDetail.contributors.map((contributor: Contributor) => (
                                        <a
                                            key={contributor.id} // Use contributor.id for key
                                            href={contributor.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <img
                                                src={contributor.avatar_url}
                                                alt={contributor.username}
                                                className="w-16 h-16 rounded-full mr-4 border-2 border-blue-400"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{contributor.username}</h3>
                                                <p className="text-sm text-gray-600">{contributor.contributions} contributions</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No contributors found for this repository.</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Open Issues */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Open Issues</h2>
                        {repoDetail.openIssues && repoDetail.openIssues.length > 0 ? (
                            <ul className="space-y-3">
                                {repoDetail.openIssues.map((issue: OpenIssues) => (
                                    <li key={issue.id}>
                                        <a
                                            href={issue.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-blue-600 hover:underline text-lg font-medium"
                                        >
                                            Issue #{issue.id}: {issue.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No open issues found for this repository.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoDetailPage;
