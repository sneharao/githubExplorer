import { Contributor } from "./contributor";
import { OpenIssues } from "./openIssues";
import { Repository } from "./repository";

export interface RepoDetail extends Repository {
    contributors: Contributor[];
    language: string;
    openIssues: OpenIssues[];
    watchers: number;
    forks: number;
}