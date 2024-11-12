// testing here for List
import React from "react";
import { render } from "@testing-library/react";
import FinanceList from "../components/FinanceList";

test("renders FinanceList component", () => {
  const { getByText } = render(<FinanceList />);
  expect(getByText(/Finance Applications/i)).toBeInTheDocument();
});
