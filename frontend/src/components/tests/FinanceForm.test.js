// testing
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FinanceForm from "../components/FinanceForm";

test("renders FinanceForm and submits data", () => {
  const handleFormSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <FinanceForm onFormSubmit={handleFormSubmit} />
  );

  fireEvent.change(getByPlaceholderText("Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.click(getByText(/Create Finance/i));

  expect(handleFormSubmit).toHaveBeenCalled();
});
