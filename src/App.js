import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Table from "./components/tables/table";
import { NavBar } from "./components/nav/navBar";
import { createContext, useState } from "react";
import DetailsView from "./components/tables/details";

export const myContext = createContext();
export const App = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [filterText, setFilterText] = useState("");

  return (
    <myContext.Provider
      value={{ selectedObject, setSelectedObject, filterText, setFilterText }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Table />}></Route>
          <Route path="/details" element={<DetailsView />} />
        </Route>
      </Routes>
    </myContext.Provider>
  );
};
