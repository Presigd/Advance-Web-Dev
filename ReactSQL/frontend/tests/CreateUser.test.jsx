import React from "react"; // Ensure React is imported
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CreateUser from "../src/components/CreateUser";

vi.mock("axios");

describe("CreateUser Component", () => {
  it("renders the form and initial elements", () => {
    render(<CreateUser />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("successfully creates a user", async () => {
    axios.post.mockResolvedValue({
      data: { name: "Alice" },
    });

    render(<CreateUser />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "alice@example.com" },
    });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() =>
      expect(screen.getByText("User created successfully: Alice")).toBeInTheDocument()
    );

    expect(screen.getByPlaceholderText("Name").value).toBe("");
    expect(screen.getByPlaceholderText("Email").value).toBe("");
  });


  it("calls the onUserAdded callback after successful creation", async () => {
    const mockOnUserAdded = vi.fn();
    axios.post.mockResolvedValue({
      data: { name: "Alice" },
    });

    render(<CreateUser onUserAdded={mockOnUserAdded} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "alice@example.com" },
    });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => expect(mockOnUserAdded).toHaveBeenCalled());
  });
});
