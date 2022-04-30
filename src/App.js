import "./App.css";
import { Table } from "./components/Table";
import { Routes, Switch, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
