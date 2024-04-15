import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

const TodoApp = () => {
    const inputRef = useRef(null);
    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState([]);

    useEffect(() => {
        console.log(todoList, "todo lsist");
    }, [todoList]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (input.trim().length === 0) {
            return toast.warn("input can not be blank");
        }
        const values = todoList;
        const id = uuidv4();
        setTodoList([...values, { id, item: input.trim(), created_at: new Date().toString(), updated_at: new Date().toString() }]);
    };

    const editItem = (item) => {
        const editedTodo = prompt('Edit the todo:');
        console.log(editedTodo, "editedtodo");
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodo = { id: item.id, item: editedTodo, created_at: item.created_at, updated_at: new Date().toString() };
            const remainingTodo = todoList.filter(todo => todo.id !== item.id);
            setTodoList([...remainingTodo, updatedTodo]);
        };
    };

    const deleteItem = (item) => {
        Swal.fire({
            title: "Do you want to delete the task?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `Don't delete`
        }).then((result) => {
            if (result.isConfirmed) {
                const items = todoList.filter(todo => todo.id !== item.id);
                setTodoList(items);
            }
        });
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Todo App</h3>

            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <TextField
                        value={input}
                        onChange={event => setInput(event.target.value)}
                        ref={inputRef}
                        label="Todo"
                        fullWidth
                        placeholder="wrtie here something"
                    />

                    <Button type="submit" variant="contained">Submit</Button>
                </div>

                <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#000" }}>
                                <TableCell sx={{ color: "#fff" }}>Id</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Todo</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Created at</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Updated at</TableCell>
                                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todoList && todoList.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.item}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>{row.updated_at}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: "30px" }}>
                                            <Button variant="contained" onClick={() => editItem(row)}>Edit</Button>
                                            <Button variant="contained" onClick={() => deleteItem(row)}>Delete</Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </div>
    )
}

export default TodoApp

