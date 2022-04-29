import React from "react";
import MaterialTable from "@material-table/core";
import useAxios from "axios-hooks";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const ModalForm = ({ openModal, setOpenModal }) => {
  const [equipNum, setEquipNum] = useState("");
  const [address, setAddress] = useState("");
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [status, setStatus] = useState("");

  const handleClose = () => setOpenModal(false);
  const handleReset = () => {
    setEquipNum("");
    setAddress("");
    setContractStart("");
    setContractEnd("");
    setStatus("");
  };
  return (
    <Modal show={openModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
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
