export interface Document {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
}

export interface DocumentList<T> {
    documents: T[];
    total: number;
}