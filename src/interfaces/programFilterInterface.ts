export interface ProgramFilterInterface {
    type?: string,
    status?: string,
    orderBy?: string,
    ing?: number,
}

export interface PgTypeFilterInterface {
    state: {
        pgType: string;
    }
}