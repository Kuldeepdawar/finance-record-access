import React, { useEffect, useState } from "react";
import { createFinance, updateFinance } from "./services/api";

const InputField = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  );
};

const FinanceForm = ({ financeData, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    personalDetails: { name: "", age: "" },
    income: "",
    expenses: "",
    assets: "",
    liabilities: "",
    status: "pending",
  });

  useEffect(() => {
    if (financeData) {
      setFormData({
        personalDetails: {
          name: financeData.personalDetails.name,
          age: financeData.personalDetails.age,
        },
        income: financeData.income,
        expenses: financeData.expenses,
        assets: financeData.assets,
        liabilities: financeData.liabilities,
        status: financeData.status || "pending",
      });
    }
  }, [financeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "personalDetails.name" || name === "personalDetails.age") {
        const key = name.replace("personalDetails.", "");
        return {
          ...prevData,
          personalDetails: {
            ...prevData.personalDetails,
            [key]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (financeData) {
      await updateFinance(financeData._id, formData);
    } else {
      await createFinance(formData);
    }
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Details */}
      <InputField
        name="personalDetails.name"
        value={formData.personalDetails.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <InputField
        name="personalDetails.age"
        type="number"
        value={formData.personalDetails.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />

      {/* Financial Information */}
      <InputField
        name="income"
        type="number"
        value={formData.income}
        onChange={handleChange}
        placeholder="Income"
        required
      />
      <InputField
        name="expenses"
        type="number"
        value={formData.expenses}
        onChange={handleChange}
        placeholder="Expenses"
        required
      />
      <InputField
        name="assets"
        type="number"
        value={formData.assets}
        onChange={handleChange}
        placeholder="Assets"
        required
      />
      <InputField
        name="liabilities"
        type="number"
        value={formData.liabilities}
        onChange={handleChange}
        placeholder="Liabilities"
        required
      />

      {/* Status */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <button type="submit">{financeData ? "Update" : "Create"} Finance</button>
    </form>
  );
};

export default FinanceForm;
