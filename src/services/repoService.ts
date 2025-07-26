import { Repository } from "../models/repository";
import { useQuery } from '@tanstack/react-query'
import { formatRepodata } from "../utils/formatRepoData";


const reposurl = `https://api.github.com/repositories`;
//const openIssue = `https://api.github.com/repos/${username}/${repo}/issues?state=open`;
//const repoDetailsUrl = `https://api.github.com/repos/${username}/${repo}`;
//const contributorsUrl = `https://api.github.com/repos/${username}/${repo}/contributors?per_page=5`;

export async function fetchRepositories(): Promise<Repository[] | undefined> {
  return fetch(reposurl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.statusText}`);
      }
      const rawData = response.json();
      return rawData
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}


export function useGithubRepos() {
  return useQuery({
    queryKey: ['github-repos-detailed', 'repo'],
    queryFn: async () => {
      // Step 1: Get public repo list
      const repoList = await fetchRepositories();
      console.log('Repo List Response:', repoList);

      if (!repoList || repoList.length === 0) {
        console.error('No repositories found');
        return [];
      }
      // Step 2: Fetch details for each repo
      await Promise.allSettled(
        repoList.map((repo: any) =>
          fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`, {
          }).then(async (res) => {
            if (!res.ok) {
              console.error(`Failed to fetch details for repo ${repo.name}`);
              return null;
            }
            const repoDetail = await res.json();
            repo = formatRepodata(repoDetail);
            console.log('Formatted Repo Detail:', repo);
            return;
          }))
      )
      console.log('Final Repo List:', repoList);

      return repoList
    },
    staleTime: 1000 * 60 * 10, // 10 min caching
    retry: 1,
  })
}


