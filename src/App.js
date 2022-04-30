import "./App.css";
import { Table } from "./components/Table";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotFound } from "./components/NotFound";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/equipment/search" element={<Table />} />
          <Route path="/equipment/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
