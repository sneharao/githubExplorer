import { User } from "./user";

export interface Contributor extends User {
    id: number;
    contributions: number;
    html_url: string;
}