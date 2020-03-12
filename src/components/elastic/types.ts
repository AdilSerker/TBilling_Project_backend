export type IndexType = {
    index: IndexParams
};

export type IndexParams = {
    _index: string,
    _type: string,
    _id: number | string
};
