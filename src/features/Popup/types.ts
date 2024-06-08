export type TodoItemType = {
    id: string;
    title: string;
    completed: boolean;
};

export type LocalStorageType = {
    [key: string]: TodoItemType[];
};
