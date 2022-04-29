import React from "react";
import MaterialTable from "@material-table/core";
import useAxios from "axios-hooks";
import { Modal, Box, TextField, Button, Typography } from "@material-ui/core";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalForm = ({ openModal, setOpenModal }) => {
  const [equipNum, setEquipNum] = useState("");
  const [address, setAddress] = useState("");
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = () => {
    setEquipNum("");
    setAddress("");
    setContractStart("");
    setContractEnd("");
    setStatus("");
  };
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Submit a new equipment
        </Typography>
        <Typography>
          <TextField
            onChange={(event) => setEquipNum(event.target.value)}
            value={equipNum}
            label={"Equipment Number"}
          />
        </Typography>
        <Typography>
          <TextField
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            label={"Address"}
          />
        </Typography>
        <Typography>
          <TextField
            onChange={(event) => setContractStart(event.target.value)}
            value={contractStart}
            label={"Contract Start Date"}
          />
        </Typography>
        <Typography>
          <TextField
            onChange={(event) => setContractEnd(event.target.value)}
            value={contractEnd}
            label={"Contract End Date"}
          />
        </Typography>
        <Typography>
          <TextField
            onChange={(event) => setStatus(event.target.value)}
            value={status}
            label={"Status"}
          />
        </Typography>

        <Typography>
          <Button>Submit</Button>
        </Typography>
        <Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Typography>
      </Box>
    </Modal>
  );
};

const Table = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://2zqzf5jn07.execute-api.eu-west-1.amazonaws.com/prod/equipment"
  );
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { title: "Equipment Number", field: "equipNum" },
    { title: "Address", field: "address" },
    { title: "Contract Start Date", field: "contractStart" },
    { title: "COntract End Date", field: "contractEnd" },
    { title: "Status", field: "status" },
  ];

  if (loading) {
    return <p>Loading equipment data</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={data}
        title="Demo Title"
        actions={[
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: () => setOpenModal(true),
          },
        ]}
      />
      <ModalForm openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export { Table };
