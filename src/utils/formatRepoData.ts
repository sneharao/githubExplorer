import { RepoDetail } from "../models/repoDetail"

export const formatRepodata = (item: any): RepoDetail => {
    return {
        id: item.id,
        name: item.name,
        avatar_url: item.owner.avatar_url,
        description: item.description || 'No description available',
        language: item.language,
        forks: item.forks_count,
        watchers: item.watchers_count,
        stars: item.stargazers_count,
        repo_url: item.html_url,
        contributors: [],
        openIssues: [],
    }
}
