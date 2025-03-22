import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container py-5">
      <h1 className="text-center text-dark fw-bold mb-4">User Management</h1>
      
      <div className="row g-4">
        {/* Users List (More commonly accessed, so placed at the top) */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center text-danger">Users List</h2>
            <ReadDeleteUsers refresh={refresh} buttonClass="btn btn-danger w-100 mt-3" />
          </div>
        </div>

        {/* Create User */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center text-primary">Create User</h2>
            <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-primary w-100 mt-3" />
          </div>
        </div>

        {/* Update User */}
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center text-warning">Update User</h2>
            <UpdateUser onUserUpdated={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-warning w-100 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
