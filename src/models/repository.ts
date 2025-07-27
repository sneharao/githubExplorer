import { Contributor } from "./contributor";
import { OpenIssues } from "./openIssues";
import { User } from "./user";

export interface Repository {
    id: number;
    name: string;
    owner: User
    description: string;
    stars: number;
    repo_url: string;
}


export interface RepoDetail extends Repository {
    contributors: Contributor[];
    language: string;
    openIssues: OpenIssues[];
    watchers: number;
    forks: number;
}

