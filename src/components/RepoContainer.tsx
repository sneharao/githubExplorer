import * as React from 'react';
import RepoPreviewCard from './RepoPreviewCard';
import { useGithubRepos } from '../services/repoService';
import { Repository } from '../models/repository';
function RepoContainer() {
    const { data, isLoading, error } = useGithubRepos();
    console.log('RepoContainer data:', data);

    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((repo: Repository, index: React.Key | null | undefined) => (
            <RepoPreviewCard key={index} repo={repo} />
        ))}
    </div>);
}

export default RepoContainer
    ;