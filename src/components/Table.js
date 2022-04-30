import React from "react";
import MaterialTable from "@material-table/core";
import useAxios from "axios-hooks";
import { useState } from "react";
import { Button, Modal, Form, Toast } from "react-bootstrap";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const ModalForm = ({ openModal, setOpenModal, refetchDB }) => {
  const [equipNum, setEquipNum] = useState("");
  const [address, setAddress] = useState("");
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [status, setStatus] = useState("Running");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleClose = () => setOpenModal(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEquipNum("");
    setAddress("");
    setContractStart("");
    setContractEnd("");
    setStatus("Running");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/equipment`, {
        equipNum,
        address,
        contractStart,
        contractEnd,
        status,
      });
      await refetchDB();
    } catch (err) {
      if (err.response.data === "Duplicate data") {
        setToastMsg("Duplicate record: equipment number must be unique");
      }
      setShowToast(true);
      console.log(err);
    }

    console.log({
      equipNum,
      address,
      contractStart,
      contractEnd,
      status,
    });
  };
  return (
    <Modal show={openModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit a new equipment record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="equipmentForm">
          <Form.Group className="mb-3">
            <Form.Label>Equipment Number</Form.Label>
            <Form.Control
              type="text"
              required
              value={equipNum}
              onChange={(event) => setEquipNum(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contract Start Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={contractStart}
              onChange={(event) => setContractStart(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contract End Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={contractEnd}
              min={contractStart}
              onChange={(event) => setContractEnd(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Running">Running</option>
              <option value="Stopped">Stopped</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={"danger"}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
        <Button variant="primary" type="submit" form="equipmentForm">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Table = () => {
  const equipID = useParams().id;
  const searchLimit = new URLSearchParams(useLocation().search).get("limit");
  let dbURL = `${process.env.REACT_APP_API_URL}/equipment`;
  if (equipID) {
    dbURL = `${process.env.REACT_APP_API_URL}/equipment/${equipID}`;
  } else if (searchLimit) {
    dbURL = `${process.env.REACT_APP_API_URL}/equipment/search?limit=${searchLimit}`;
  }

  const [{ data, loading, error }, refetch] = useAxios(dbURL);
  const [openModal, setOpenModal] = useState(false);
  const handleDelete = async (event, rowData) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/equipment/${rowData.equipNum}`);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { title: "Equipment Number", field: "equipNum", defaultSort: "asc" },
    { title: "Address", field: "address", searchable: false },
    { title: "Contract Start Date", field: "contractStart", searchable: false },
    { title: "Contract End Date", field: "contractEnd", searchable: false },
    { title: "Status", field: "status", searchable: false },
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
        title="Equipment records"
        actions={[
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: () => setOpenModal(true),
          },
          {
            icon: "delete",
            tooltip: "Delete Record",
            onClick: handleDelete,
          },
        ]}
      />
      <ModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetchDB={refetch}
      />
    </div>
  );
};

export { Table };
