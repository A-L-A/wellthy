import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faInbox, faLocationPin, faPersonRunning, faPhone, faSpa } from "@fortawesome/free-solid-svg-icons";


const AboutUs = () => {
  return (
    <div>
      <section
        className="bg-white d-flex flex-column align-items-center justify-content-center pt-5 pb-5"
        style={{
          minHeight: "800px",
          backgroundImage: `url("https://images.pexels.com/photos/3933508/pexels-photo-3933508.jpeg?auto=compress&cs=tinysrgb&w=800")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6 py-5 text-white">
              <h1 className="display-4 text-center">AGB Ltd</h1>
              <p className=" text-center fs-3">
                A balanced life is a happy life
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-white d-flex flex-column align-items-center justify-content-center px-5 "
        style={{ minHeight: "800px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center pb-5">
              <h1>Our Wellness Program</h1>
              <p className=" text-center fs-4 pt-5">
                Holistic wellness facilitated
              </p>
            </div>
          </div>

          <div className="row mt-4 text-center">
            <div className="col-md-4">
              <FontAwesomeIcon
                icon={faPersonRunning}
                style={{ fontSize: "600%" }}
              />

              <h3 className="pt-3">Fitness</h3>
              <p className="fs-5 pt-4">
                Goal Tracker allows you to set goals for various physical
                activities. It helps you to monitor your progress
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i
                className="bi bi-apple display-4 text-primary"
                style={{ fontSize: "4rem" }}></i>
              <FontAwesomeIcon icon={faCarrot} style={{ fontSize: "600%" }} />

              <h3 className="pt-3">Nutrition</h3>
              <p className="fs-5 pt-4">
                The Nutrition Planner helps you plan and track your meals so you
                can find nutritious food options while on the road
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i
                className="bi bi-heart-pulse display-4 text-primary"
                style={{ fontSize: "4rem" }}></i>
              <FontAwesomeIcon icon={faSpa} style={{ fontSize: "600%" }} />
              <h3 className="pt-3">Mental Health</h3>
              <p className="fs-5 pt-4">
                The Mental Wellbeing Support feature promotes mindfulness,
                stress management, and overall emotional wellbeing
              </p>
            </div>
          </div>
          {/* See More Button */}
          <div className="row mt-5 text-center">
            <div className="col-lg-12 ">
              <Link to="/goals" className="btn btn-secondary">
                See More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-light d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "800px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center ">
              <h3 className="pb-5">Contact Us</h3>
              <br />
              <address>
                <FontAwesomeIcon
                  icon={faLocationPin}
                  style={{ fontSize: "200%" }}
                />

                <p className="fs-5 pt-2">Pamplemousses, Mauritius</p>
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: "200%" }} />
                <p className="fs-5 pt-2">+230551234555</p>
                <FontAwesomeIcon icon={faInbox} style={{ fontSize: "200%" }} />
                <p className="fs-5 pt-2">l.aneze@alustudent.com</p>
              </address>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
