import { Repository } from "../models/repository";
import { useInfiniteQuery } from '@tanstack/react-query'
import { RepoDetail } from "../models/repository";
import { formatRepoDetail, formatRepodata } from "../utils/formatData";
import { rateLimitManager } from "../utils/rateLimitManager";
import { extractNextSince } from "../utils/extractHeaderParam";

const BASE_GITHUB_API_URL = 'https://api.github.com/repos';
const ITEMS_PER_PAGE = 20;

export async function fetchRepositories(since = 0, searchQuery: string, isSearch = false): Promise<{
  repositories: Repository[],
  nextPageParam?: number,
  hasMore: boolean
}> {
  // Check rate limit before making request
  await rateLimitManager.checkRateLimit();
  let url;
  if (searchQuery && isSearch) {
    // Use search API for search queries
    url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=${ITEMS_PER_PAGE}&page=${since}`;
  } else {
    // Use the standard repositories endpoint for non-search queries
    url = `https://api.github.com/repositories?since=${since}`;
  }

  try {

    const response = await fetch(url);
    // Update rate limit info from headers
    rateLimitManager.updateFromHeaders(response.headers);
    const linkHeader = response.headers.get('link');
    let nextPageParam;
    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.statusText}`);
    }
    const rawData = await response.json();

    let repositories = [];
    let hasMore = true;
    if (isSearch) {
      // Handle search API response
      repositories = rawData.items.map(formatRepodata);
      hasMore = rawData.total_count > since + repositories.length;
      nextPageParam = hasMore ? since + 1 : undefined;
    } else {
      // Handle repositories API response
      nextPageParam = linkHeader ? extractNextSince(linkHeader) : undefined;
      hasMore = nextPageParam ? true : false; // Arbitrary limit for demo purposes
      repositories = rawData.map(formatRepodata);
    }

    return {
      repositories,
      nextPageParam,
      hasMore
    };
  } catch (error) {
    console.error(`Error fetching repositories: ${error}`);
    throw error;
  }
}

export function generateMockRepositories(since: number, count: number) {
  const repositories = [];
  for (let i = 0; i < count; i++) {
    const id = since + i + 1;
    repositories.push({
      id,
      name: `repository - ${id}`,
      owner: {
        username: `user - ${Math.floor(id / 10)}`,
        avatar_url: `https://avatars.githubusercontent.com/u/${id}?v=4`,
      },
      full_name: `user - ${Math.floor(id / 10)} / repository - ${id}`,
      description: `This is a description for repository ${id}.It demonstrates various GitHub features and best practices.`,
      stars: Math.floor(Math.random() * 1000),
      repo_url: `https://github.com/user-${Math.floor(id / 10)}/repository-${id}`,
    });
  }
  return repositories;
}

/**
 * Custom hook to fetch GitHub repositories with infinite scrolling capabilities.
 * Uses useInfiniteQuery from @tanstack/react-query.
 */
export function useGithubRepos(searchQuery: string) {
  const isSearch = Boolean(searchQuery && searchQuery.trim());
  return useInfiniteQuery({
    queryKey: ['github-repos-infinite', searchQuery], // Unique key for this infinite query
    queryFn: async ({ pageParam = 0 }) => { // pageParam will be the `since` value

      try {
        const result = await fetchRepositories(pageParam, searchQuery, isSearch);
        return {
          repos: result.repositories,
          nextPage: result.nextPageParam,
          hasMore: result.hasMore
        };
      } catch (error: any) {
        // Handle rate limiting gracefully
        if (error.message.includes('Rate limit')) {
          console.warn('Rate limit hit, retrying after delay...');
          // The fetchRepositories function already handles the delay
          throw error;
        }
        throw error;
      }
    },

    // It receives the last successful result and all pages, and returns the pageParam for the next fetch.
    getNextPageParam: (lastPage) => {
      // lastPage.nextPage is what we returned from queryFn
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    retry: 0,
    initialPageParam: 0, // The initial pageParam when the query first runs
  });
}

/**
 * Fetches and combines repository details from various GitHub API endpoints.
 * Uses Promise.all to fetch data concurrently.
 *
 * @param {string} username The owner's username.
 * @param {string} repoName The repository name.
 * @returns {Promise<RepoDetail>} A promise resolving to a complete RepoDetail object.
 */

export async function fetchRepoDetails(repo: Repository): Promise<RepoDetail> {
  const { name: repoName, owner: { username } } = repo;
  if (!username || !repoName) {
    throw new Error('Invalid repository data provided. Ensure the repository has a valid name and owner.');
  }
  const repoDetailsUrl = `${BASE_GITHUB_API_URL}/${username}/${repoName}`;
  const issuesUrl = `${BASE_GITHUB_API_URL}/${username}/${repoName}/issues?state=open`;
  const contributorsUrl = `${BASE_GITHUB_API_URL}/${username}/${repoName}/contributors?per_page=5`;

  try {
    const [repoResponse, issuesResponse, contributorsResponse] = await Promise.all([
      fetch(repoDetailsUrl),
      fetch(issuesUrl),
      fetch(contributorsUrl)
    ]);

    // --- Handle Repository Details ---
    if (!repoResponse.ok || !issuesResponse.ok || !contributorsResponse.ok) {
      throw new Error(`Failed to fetch details for ${username}/${repoName}`);
    }
    const repoData = await repoResponse.json();
    const issuesData = await issuesResponse.json();
    const contributorsData = await contributorsResponse.json();

    // --- Format the data ---
    const repoDetail = formatRepoDetail(repo, repoData, contributorsData, issuesData);

    return repoDetail;

  } catch (error) {
    console.error(`Error fetching combined repository details for ${username}/${repoName}:`, error);
    throw error;
  }
}

