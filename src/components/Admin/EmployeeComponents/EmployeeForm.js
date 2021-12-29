const EmployeeForm = ({ employee, handleInputChange, action, actionType }) => {
  return (
    <>
      <form onSubmit={action} class="form">
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
            >
              <option value="" disabled selected></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {actionType}
        </button>
      </form>
    </>
  );
};

export default EmployeeForm;
