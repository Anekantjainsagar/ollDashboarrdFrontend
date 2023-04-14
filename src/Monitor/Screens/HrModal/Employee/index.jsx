import React, { useContext } from "react";
import Sidebar from "../../../Components/Sidebar/index";
import "./style.module.css";
import EmployeeHeader from "../../../Components/Employee/EmployeeHeader/index";
import EmployeeNav from "../../../Components/Employee/EmployeeNav";
import EmployeeBar from "../../../Components/Employee/EmployeeBar";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Employee = () => {
  const context = useContext(B2BContext);
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <EmployeeHeader />
        <div>
          <EmployeeNav />
          <div className={styles.users}>
            {context?.employee?.employees?.map((e) => {
              return <EmployeeBar data={e} />;
            })}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {context.employee.noOfEmps > context.employee.empPage * 10 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    context.employee.setEmpPage(context.employee.empPage + 1);
                  }}
                >
                  Load more..
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
