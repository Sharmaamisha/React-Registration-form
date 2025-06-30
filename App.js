import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    withGuest: "No",
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Email format is invalid.";
    }
    if (!formData.age) {
      errs.age = "Age is required.";
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      errs.age = "Age must be a number greater than 0.";
    }
    if (formData.withGuest === "Yes" && !formData.guestName.trim()) {
      errs.guestName = "Guest name is required.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmittedData(formData);
      showToastMessage();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      withGuest: "No",
      guestName: "",
    });
    setErrors({});
    setSubmittedData(null);
    setShowToast(false);
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  };

  return (
    <div className="form-container">
      <h2>Event Registration Form</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Age*</label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label>Are you attending with a guest?*</label>
          <select
            name="withGuest"
            value={formData.withGuest}
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {formData.withGuest === "Yes" && (
          <div className="form-group">
            <label>Guest Name*</label>
            <input
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              type="text"
            />
            {errors.guestName && (
              <span className="error">{errors.guestName}</span>
            )}
          </div>
        )}

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="summary">
          <h3>Submission Summary:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>With Guest:</strong> {submittedData.withGuest}</p>
          {submittedData.withGuest === "Yes" && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}

      {showToast && <div className="custom-toast">Form submitted successfully! 🎉</div>}
    </div>
  );
};

export default App;
