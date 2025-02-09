import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "antd/dist/reset.css";
import clubLogo from "../../assets/logo.png";

const AgeRestrictions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const ageVerified = sessionStorage.getItem("isAgeVerified");
    if (!ageVerified) {
      setIsModalVisible(true);
    } else {
      setIsAllowed(true);
    }
  }, []);

  const handleYes = () => {
    sessionStorage.setItem("isAgeVerified", "true");
    setIsModalVisible(false);
    setIsAllowed(true);
  };

  const handleNo = () => {
    alert("You must be 21 years old to access this website. Redirecting...");
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="relative">
      {isModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-10"></div>
      )}

      <Modal
        title="Age Verification"
        open={isModalVisible}
        closable={false}
        footer={null}
        centered
        className="z-20"
      >
        <div className="py-10">
          <div className="flex items-center justify-center">
            <img className="w-40 h-20 my-5" src={clubLogo} alt="" />
          </div>
          <p className="text-xl text-center">
            To access our website, you must confirm that you are at least 21
            years old.
          </p>
          <p className="text-xl text-center">
            Are you at least{" "}
            <span className="text-[#00863D] font-bold">21</span> years old
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              onClick={handleYes}
            >
              Yes, I'm 21
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              onClick={handleNo}
            >
              No, I'm not 21
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgeRestrictions;
