import React from "react";
import MaterialTable from "@material-table/core";
import useAxios from "axios-hooks";

const Table = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://2zqzf5jn07.execute-api.eu-west-1.amazonaws.com/prod/equipment"
  );

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
            onClick: (event) => alert("You want to add a new row"),
          },
        ]}
      />
    </div>
  );
};

export { Table };
