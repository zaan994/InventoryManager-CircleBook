import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </div>
  );
}

export default App;