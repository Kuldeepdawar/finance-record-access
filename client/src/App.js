import React from "react";
import FinanceForm from "./components/FinanceForm";
import FinanceList from "./components/FinanceList";

const App = () => {
  return (
    <div>
      <h1>Finance Application</h1>
      <FinanceForm onFormSubmit={() => window.location.reload()} />
      <FinanceList />
    </div>
  );
};

export default App;
