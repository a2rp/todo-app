import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the todo workspace", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /keep your next step clear/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
});
