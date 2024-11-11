import React, { useState, useEffect } from "react";
import {
  getFinances,
  deleteFinance,
  updateFinance,
} from "../components/services/api";
import FinanceForm from "./FinanceForm"; // Assuming you have a FinanceForm component
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mu/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Styled components for the MUI Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FinanceListWithTable = () => {
  const [finances, setFinances] = useState([]);
  const [selectedFinance, setSelectedFinance] = useState(null); // To hold the finance item to be edited
  const [openModal, setOpenModal] = useState(false); // For controlling modal visibility

  useEffect(() => {
    const fetchFinances = async () => {
      const response = await getFinances();
      setFinances(response.data);
    };
    fetchFinances();
  }, []);

  const handleDelete = async (id) => {
    await deleteFinance(id);
    setFinances(finances.filter((finance) => finance._id !== id)); // Update the list after deletion
  };

  const handleEdit = (finance) => {
    setSelectedFinance(finance); // Set selected finance to pre-fill modal
    setOpenModal(true); // Open modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close modal
    setSelectedFinance(null); // Clear selected finance
  };

  const handleFormSubmit = async (updatedFinanceData) => {
    await updateFinance(selectedFinance._id, updatedFinanceData);
    const updatedFinances = finances.map((finance) =>
      finance._id === selectedFinance._id
        ? { ...finance, ...updatedFinanceData }
        : finance
    );
    setFinances(updatedFinances); // Create a new array reference

    console.log(
      "🚀 ~ handleFormSubmit ~ updatedFinances:",
      updatedFinances,
      updatedFinanceData
    );
    handleModalClose(); // Close modal after update
  };

  return (
    <div>
      <h2>Finance Applications</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Income</StyledTableCell>
              <StyledTableCell align="center">Expenses</StyledTableCell>
              <StyledTableCell align="center">Assets</StyledTableCell>
              <StyledTableCell align="center">Liabilities</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finances.map((finance) => (
              <StyledTableRow key={finance._id}>
                <StyledTableCell component="th" scope="row">
                  {finance.personalDetails.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {finance.income}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {finance.expenses}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {finance.assets}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {finance.liabilities}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {finance.status}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleEdit(finance)} color="primary">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(finance._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing a finance item */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Finance Application
          </Typography>
          <FinanceForm
            financeData={selectedFinance}
            onFormSubmit={handleFormSubmit}
          />
          <Button onClick={handleModalClose} color="secondary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default FinanceListWithTable;
