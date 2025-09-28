export type Task = {
    readonly id: string;     // уникальный идентификатор
    title: string;           // текст задачи
    completed: boolean;      // статус выполнения
    createdAt: Date;         // дата создания
};
export type Filter = "all" | "active" | "completed";
export function makeTask(title: string): Task {
    return {
        id: Math.random().toString(36).slice(2, 9), // простая генерация id
        title: title.trim(),
        completed: false,
        createdAt: new Date()
    };
}
