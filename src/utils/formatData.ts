import { Contributor } from "../models/contributor"
import { OpenIssues } from "../models/openIssues"
import { RepoDetail, Repository } from "../models/repository"

export const formatRepodata = (item: any): Repository => {
    return {
        id: item.id,
        name: item.name,
        owner: {
            username: item.owner.login,
            avatar_url: item.owner.avatar_url
        },
        repo_url: item.html_url,
        description: item.description || "No description provided",
        stars: item.stargazers_count || Math.floor(Math.random() * 5),
    }
}

export const formatContributorData = (item: any): Contributor => {
    return {
        id: item.id,
        username: item.login,
        avatar_url: item.avatar_url,
        contributions: item.contributions || 0,
        html_url: item.html_url
    }
}

export const formatOpenIssuesData = (item: any): OpenIssues => {
    return {
        id: item.id,
        title: item.title,
        html_url: item.html_url || undefined // Ensure html_url is defined or undefined
    }
}

export const formatRepoDetail = (repo: Repository, repoData: any, contributors: any[], openIssues: any[]): RepoDetail => {
    return {
        ...repo,
        stars: repoData.stargazers_count, // From repo details
        language: repoData.language,
        watchers: repoData.watchers_count,
        forks: repoData.forks_count,
        contributors: contributors.map(formatContributorData),
        openIssues: openIssues.map(formatOpenIssuesData)
    }
}




