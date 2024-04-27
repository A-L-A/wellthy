import React from "react";
import AdminDashboard from "../components/AdminDashboard";

const Dashboard = () => {
  return (
    <div>
      {/* Section 1: All Goals */}
      <section
        className="bg-white d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "500px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="display-4">Your Goals</h2>
              <p className="fs-4">User Informatoion</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Dashboard;
