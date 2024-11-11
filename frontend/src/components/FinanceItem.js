// Single finance item component
import React from "react";
import { deleteFinance } from "../components/services/api";

const FinanceItem = ({ finance }) => {
  const handleDelete = async () => {
    await deleteFinance(finance._id);
    // Add logic to update list after deletion if needed
  };

  return (
    <div>
      <h3>{finance.personalDetails.name}</h3>
      <p>Income: {finance.income}</p>
      <p>Expenses: {finance.expenses}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FinanceItem;
