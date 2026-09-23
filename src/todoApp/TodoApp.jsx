import { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TbCheck, TbClipboard, TbEdit, TbPlus, TbTrash, TbX } from "react-icons/tb";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import styles from "./styles.module.scss";

const storageKey = "todo-app-items";

function loadTodos() {
  try {
    const savedTodos = window.localStorage.getItem(storageKey);
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function TodoApp() {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState(loadTodos);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingInput, setEditingInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.max(1, Math.ceil(todoList.length / rowsPerPage));
  const visiblePage = Math.min(currentPage, totalPages);
  const firstRowIndex = (visiblePage - 1) * rowsPerPage;
  const visibleTodos = todoList.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(todoList));
  }, [todoList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const todoText = input.trim();

    if (!todoText) {
      toast.warn("Please enter a task first.");
      inputRef.current?.focus();
      return;
    }

    const now = new Date().toISOString();
    setTodoList((currentTodos) => [
      ...currentTodos,
      { id: uuidv4(), item: todoText, createdAt: now, updatedAt: now },
    ]);
    setInput("");
    inputRef.current?.focus();
    toast.success("Task added.");
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingInput(todo.item);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingInput("");
  };

  const saveEdit = (event, todo) => {
    event.preventDefault();
    const updatedText = editingInput.trim();

    if (!updatedText) {
      toast.warn("A task cannot be empty.");
      return;
    }

    setTodoList((currentTodos) =>
      currentTodos.map((currentTodo) =>
        currentTodo.id === todo.id
          ? { ...currentTodo, item: updatedText, updatedAt: new Date().toISOString() }
          : currentTodo
      )
    );
    cancelEditing();
    toast.success("Task updated.");
  };

  const deleteItem = (todo) => {
    Swal.fire({
      title: "Delete this task?",
      text: todo.item,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Keep task",
      confirmButtonColor: "#b42318",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoList((currentTodos) => currentTodos.filter((item) => item.id !== todo.id));
        if (editingId === todo.id) cancelEditing();
        toast.success("Task deleted.");
      }
    });
  };

  return (
    <section className={styles.container} id="todo-list" aria-labelledby="todo-title">
      <div className={styles.intro}>
        <div>
          <span className={styles.eyebrow}>Your daily workspace</span>
          <h1 id="todo-title" className={styles.heading}>Keep your next step clear.</h1>
          <p className={styles.description}>
            Add the tasks that matter, keep them close, and make steady progress one item at a time.
          </p>
        </div>
        <div className={styles.taskCount} aria-label={`${todoList.length} tasks saved`}>
          <TbClipboard aria-hidden="true" />
          <strong>{todoList.length}</strong>
          <span>{todoList.length === 1 ? "task" : "tasks"} saved</span>
        </div>
      </div>

      <form className={styles.addForm} onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          label="New task"
          fullWidth
          placeholder="What needs your attention?"
          inputProps={{ maxLength: 160, "aria-label": "New task" }}
        />
        <Button type="submit" variant="contained" startIcon={<TbPlus aria-hidden="true" />}>
          Add task
        </Button>
      </form>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="Todo list">
          <TableHead>
            <TableRow>
              <TableCell className={styles.idColumn}>ID</TableCell>
              <TableCell>Task</TableCell>
              <TableCell className={styles.dateColumn}>Created</TableCell>
              <TableCell className={styles.dateColumn}>Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={styles.emptyState}>
                  <TbClipboard aria-hidden="true" />
                  <strong>No tasks yet</strong>
                  <span>Add your first task above to get started.</span>
                </TableCell>
              </TableRow>
            ) : (
              visibleTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className={styles.idColumn} title={todo.id}>{todo.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    {editingId === todo.id ? (
                      <form className={styles.editForm} onSubmit={(event) => saveEdit(event, todo)}>
                        <TextField
                          value={editingInput}
                          onChange={(event) => setEditingInput(event.target.value)}
                          size="small"
                          autoFocus
                          inputProps={{ maxLength: 160, "aria-label": `Edit ${todo.item}` }}
                        />
                        <button type="submit" className={styles.iconButton} aria-label="Save task" title="Save task">
                          <TbCheck aria-hidden="true" />
                        </button>
                        <button type="button" className={styles.iconButton} aria-label="Cancel editing" title="Cancel editing" onClick={cancelEditing}>
                          <TbX aria-hidden="true" />
                        </button>
                      </form>
                    ) : (
                      <span className={styles.taskText}>{todo.item}</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.dateColumn}>{formatDate(todo.createdAt)}</TableCell>
                  <TableCell className={styles.dateColumn}>{formatDate(todo.updatedAt)}</TableCell>
                  <TableCell align="right">
                    <div className={styles.actions}>
                      <Button size="small" variant="outlined" startIcon={<TbEdit aria-hidden="true" />} onClick={() => startEditing(todo)} disabled={editingId === todo.id}>
                        Edit
                      </Button>
                      <Button size="small" color="error" variant="outlined" startIcon={<TbTrash aria-hidden="true" />} onClick={() => deleteItem(todo)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {todoList.length > 0 && (
        <div className={styles.paginationBar}>
          <span className={styles.paginationSummary}>
            Showing {firstRowIndex + 1}-{Math.min(firstRowIndex + rowsPerPage, todoList.length)} of {todoList.length} tasks
          </span>
          <div className={styles.paginationControls}>
            <FormControl size="small" className={styles.rowsControl}>
              <InputLabel id="rows-per-page-label">Rows</InputLabel>
              <Select
                labelId="rows-per-page-label"
                value={rowsPerPage}
                label="Rows"
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
              >
                {[5, 10, 25].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Pagination
              count={totalPages}
              page={visiblePage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="small"
              showFirstButton
              showLastButton
              aria-label="Todo list pages"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default TodoApp;
