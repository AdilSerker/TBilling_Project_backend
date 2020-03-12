export type JournalParam = {
    id: string;
    title: string;
    journal: string;
    volume: number;
    pages: string;
    year: number;
    authors: AuthorParam[];
    abstract: string;
    link: string;
    keywords: string[];
    body: string;
};

export type AuthorParam = {
    firstname: string;
    lastname: string;
    institution: string;
    email: string;
};
