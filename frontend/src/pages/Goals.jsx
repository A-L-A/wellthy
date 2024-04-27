import React from "react";
import GoalForm from "../components/GoalForm";
import AllGoals from "../components/AllGoals";

const Goals = () => {
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
              <p className="fs-4">Track your wellness progress</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <AllGoals />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Goal Form */}
      <section
        className="bg-light d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "500px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="display-4">Set a New Goal</h2>
              <p className="fs-4">Define what you want to achieve</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <GoalForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Goals;
