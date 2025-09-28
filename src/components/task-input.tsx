/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./button";

type TaskInputProps = {
  onAdd: (title: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const Input = styled.input`
  flex: 1;
  padding: ${(p) => p.theme.spacing(1)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
`;

export const TaskInput = (p: TaskInputProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    p.onAdd(value);
    setValue("");
  };

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите задачу"
      />
      <Button label="Добавить" onClick={handleAdd} />
    </Wrapper>
  );
};
const ErrorText = styled.p`
  color: ${(p) => p.theme.colors.error};
  font-size: 14px;
  margin-top: ${(p) => p.theme.spacing(0.5)};
`;

export const TaskInput = (p: TaskInputProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setError("Название задачи не может быть пустым");
      return;
    }

    if (trimmed.length > 50) {
      setError("Название задачи слишком длинное (макс. 50 символов)");
      return;
    }

    p.onAdd(trimmed);
    setValue("");
    setError(null);
  };

  return (
    <div>
      <Wrapper>
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder="Введите задачу"
        />
        <Button label="Добавить" onClick={handleAdd} />
      </Wrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { Task, makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
`;

const List = styled.ul`
  margin-top: ${(p) => p.theme.spacing(2)};
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: ${(p) => p.theme.spacing(1)};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <TaskInput onAdd={handleAddTask} />
      <ul>
        {tasks.map((t) => ( // Подробная работа с массивами будет рассмотрена в следующем уроке
          <li key={t.id} style={{ fontWeight:index === 0 ? "bold" : "normal"}}>{t.title}</li>
        ))}
      </ul>
    <p>Всего задач: {tasks.length}</p>
    </Wrapper>
  );
};

