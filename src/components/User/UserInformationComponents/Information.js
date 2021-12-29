import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import { toast } from "react-toastify";
import EmployeeService from "../../../services/EmployeeService";

export default function Information() {
  const employeeId = Number(localStorage.getItem("employeeId"));
  const [employee, setEmployee] = useState({
    id: employeeId,
    fullname: "",
    dob: "",
    mobileNo: "",
    email: "",
    gender: "",
    nationality: "",
    tCountry: "",
    tProvince: "",
    tDistrict: "",
    tMunicipality: "",
    tTole: "",
    tWard: "",
    pCountry: "",
    pProvince: "",
    pDistrict: "",
    pMunicipality: "",
    pTole: "",
    pWard: "",
    grandfatherName: "",
    grandmotherName: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    medicalCondition: "",
    isAllergic: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const getEmployee = async () => {
    try {
      const response = await EmployeeService.getEmployee(employeeId);
      if (response) {
        const { data } = response;
        console.log(data);
        const {
          personalInformation: {
            fullname,
            dob,
            mobileNo,
            email,
            gender,
            nationality,
          },
          healthInformation: { medicalCondition, isAllergic },
          familyInformation: {
            grandfatherName,
            grandmotherName,
            fatherName,
            motherName,
            spouseName,
          },
          temporaryAddressInformation: {
            country: tCountry,
            province: tProvince,
            district: tDistrict,
            municipality: tMunicipality,
            tole: tTole,
            ward: tWard,
          },
          permanentAddressInformation: {
            country: pCountry,
            province: pProvince,
            district: pDistrict,
            municipality: pMunicipality,
            tole: pTole,
            ward: pWard,
          },
        } = data;
        const newData = {
          fullname,
          dob: dateformat(dob, "yyyy-mm-dd"),
          mobileNo,
          email,
          gender,
          nationality,
          tCountry,
          tProvince,
          tDistrict,
          tMunicipality,
          tTole,
          tWard,
          pCountry,
          pProvince,
          pDistrict,
          pMunicipality,
          pTole,
          pWard,
          grandfatherName,
          grandmotherName,
          fatherName,
          motherName,
          spouseName,
          medicalCondition,
          isAllergic,
        };
        setEmployee(newData);
        setIsLoading(false);
        setIsError(false);
        console.log(data);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employeeId,
      personalInformation: {
        fullname: employee.fullname,
        dob: employee.dob,
        mobileNo: employee.mobileNo,
        email: employee.email,
        gender: employee.gender,
        nationality: employee.nationality,
      },
      familyInformation: {
        grandfatherName: employee.grandfatherName,
        grandmotherName: employee.grandmotherName,
        fatherName: employee.fatherName,
        motherName: employee.motherName,
        spouseName: employee.spouseName,
      },
      healthInformation: {
        medicalCondition: employee.medicalCondition,
        isAllergic: employee.isAllergic,
      },
      permanentAddressInformation: {
        country: employee.pCountry,
        province: employee.pProvince,
        district: employee.pDistrict,
        municipality: employee.pMunicipality,
        tole: employee.pTole,
        ward: employee.pWard,
      },
      temporaryAddressInformation: {
        country: employee.tCountry,
        province: employee.tProvince,
        district: employee.tDistrict,
        municipality: employee.tMunicipality,
        tole: employee.tTole,
        ward: employee.tWard,
      },
    };
    await EmployeeService.updateEmployee(newEmployee, employeeId);
    toast.success("Employee has been updated successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleEditMode = () => {
    const formControls = document.getElementsByClassName("form-control");
    [...formControls].forEach((item) => {
      if (isEditMode) {
        item.disabled = true;
        setIsEditMode(false);
      } else {
        item.disabled = false;
        setIsEditMode(true);
      }
    });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  if (isLoading) {
    return (
      <>
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border"
            role="status"
            style={{ width: "5rem", height: "5rem", borderWidth: ".7rem" }}
          >
            <span class="sr-only"></span>
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1>Error...</h1>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/user/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div>
      <h1 className="page-title">Your Employee Information</h1>
      <button className="btn btn-primary" onClick={toggleEditMode}>
        {isEditMode ? "Enable View Mode" : "Enable Edit Mode"}
      </button>
      <form onSubmit={handleSubmit} class="form">
        <h1 className="page-subtitle">Personal Information</h1>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="fullname">Fullname</label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              value={employee.fullname}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="mobileNo">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="mobileNo"
              value={employee.mobileNo}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="mobileNo">DOB</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={employee.dob}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="gender">Gender</label>
            <select
              name="gender"
              className="form-control"
              value={employee.gender}
              onChange={handleInputChange}
              required
              disabled
            >
              <option value="" disabled selected></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label for="nationality">Nationality</label>
            <input
              type="text"
              className="form-control"
              name="nationality"
              value={employee.nationality}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>
        <h1 className="page-subtitle">Permanent Address Information</h1>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="pCountry">Country</label>
            <input
              type="text"
              className="form-control"
              name="pCountry"
              value={employee.pCountry}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="pProvince">Province</label>
            <input
              type="text"
              className="form-control"
              name="pProvince"
              value={employee.pProvince}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="pDistrict">District</label>
            <input
              type="text"
              className="form-control"
              name="pDistrict"
              value={employee.pDistrict}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="pMunicipality">Municipality</label>
            <input
              type="text"
              className="form-control"
              name="pMunicipality"
              value={employee.pMunicipality}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="pTole">Tole</label>
            <input
              type="text"
              className="form-control"
              name="pTole"
              value={employee.pTole}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="pWard">Ward</label>
            <input
              type="text"
              className="form-control"
              name="pWard"
              value={employee.pWard}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>
        <h1 className="page-subtitle">Temporary Address Information</h1>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="tCountry">Country</label>
            <input
              type="text"
              className="form-control"
              name="tCountry"
              value={employee.tCountry}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="tProvince">Province</label>
            <input
              type="text"
              className="form-control"
              name="tProvince"
              value={employee.tProvince}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="tDistrict">District</label>
            <input
              type="text"
              className="form-control"
              name="tDistrict"
              value={employee.tDistrict}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="tMunicipality">Municipality</label>
            <input
              type="text"
              className="form-control"
              name="tMunicipality"
              value={employee.tMunicipality}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="tTole">Tole</label>
            <input
              type="text"
              className="form-control"
              name="tTole"
              value={employee.tTole}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="tWard">Ward</label>
            <input
              type="text"
              className="form-control"
              name="tWard"
              value={employee.tWard}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>
        <h1 className="page-subtitle">Family Information</h1>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="grandfatherName">Grand Father name</label>
            <input
              type="text"
              className="form-control"
              name="grandfatherName"
              value={employee.grandfatherName}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="grandmotherNamee">Grand Mother name</label>
            <input
              type="text"
              className="form-control"
              name="grandmotherName"
              value={employee.grandmotherName}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="fatherName">Father name</label>
            <input
              type="text"
              className="form-control"
              name="fatherName"
              value={employee.fatherName}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="motherName">Mother name</label>
            <input
              type="text"
              className="form-control"
              name="motherName"
              value={employee.motherName}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="spouseName">Spouse Name (If only married)</label>
            <input
              type="text"
              className="form-control"
              name="spouseName"
              value={employee.spouseName}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>
        <h1 className="page-subtitle">Health Information</h1>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="medicalCondition">Medical Condition (If any)</label>
            <input
              type="text"
              className="form-control"
              name="medicalCondition"
              value={employee.medicalCondition}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="isAllergic">Are you allergic to medicine?</label>
            <select
              name="isAllergic"
              className="form-control"
              value={employee.isAllergic}
              onChange={handleInputChange}
              required
              disabled
            >
              <option value="" disabled selected></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        {isEditMode && (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        )}
      </form>
    </>
  );
}
