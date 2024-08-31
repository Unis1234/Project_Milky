import React, { Component } from 'react';
import './UserRegisterForm.css';
import { Paper } from '@mui/material';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        selectedNumber: '',
        mobileNumber: '',
        userType: '',
        userName: '',
        password: '',
        confirmPassword: '',
        branchName: '',
        creditLimit: '',
        address: '',
        aadharNumber: '',
        alternateMobileNumber: '',
        whatsappNumber: '',
      },
      submissionStatus: '', // To store the submission status
    };
  }

  handleInputChange = (field, value) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  handleUserTypeSelection = (type) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        userType: type,
        creditLimit: '', // Reset credit limit when user type changes
      },
    }));
  };

  handleSubmit = async () => {
    const { form } = this.state;

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ submissionStatus: 'Submission Completed' });
      } else {
        this.setState({ submissionStatus: `Error: Submission failed: ${data.message}` });
      }
    } catch (error) {
      this.setState({ submissionStatus: `Error: Something went wrong: ${error.message}` });
    }
  };

  render() {
    const { form, submissionStatus } = this.state;

    return (
        <Paper>
      <div className="container01">
      <h1 className="title01">User Registration Form</h1>
        <label className="label01">Default Name With Number</label>
        <select
          value={form.selectedNumber}
          onChange={(e) => this.handleInputChange('selectedNumber', e.target.value)}
          className="picker01"
        >
          <option value="1">Adithya - 9875463523 </option>
          <option value="2">Deepak - 8750482951 </option>
        </select>

        <label className="label01">User Type:</label>
        <div className="radioContainer01">
          <div className="radioButton01" onClick={() => this.handleUserTypeSelection('Vendor User')}>
            <div className={`radioCircle01 ${form.userType === 'Vendor User' ? 'selectedRadioCircle' : ''}`} />
            <span className="radioText01">Vendor User</span>
          </div>
          <div className="radioButton01" onClick={() => this.handleUserTypeSelection('Business User')}>
            <div className={`radioCircle01 ${form.userType === 'Business User' ? 'selectedRadioCircle' : ''}`} />
            <span className="radioText01">Business User</span>
          </div>
        </div>

        <input
          type="text"
          className="input01"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={(e) => this.handleInputChange('mobileNumber', e.target.value)}
        />
        <input
          type="text"
          className="input01"
          placeholder="User Name"
          value={form.userName}
          onChange={(e) => this.handleInputChange('userName', e.target.value)}
        />
        <input
          type="password"
          className="input01"
          placeholder="Password"
          value={form.password}
          onChange={(e) => this.handleInputChange('password', e.target.value)}
        />
        <input
          type="password"
          className="input01"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => this.handleInputChange('confirmPassword', e.target.value)}
        />
        <input
          type="text"
          className="input01"
          placeholder="Branch Name"
          value={form.branchName}
          onChange={(e) => this.handleInputChange('branchName', e.target.value)}
        />

        <label className="label01">Credit Limit:</label>
        <select
          value={form.creditLimit}
          className="picker01"
          onChange={(e) => this.handleInputChange('creditLimit', e.target.value)}
        >
          <option value="">Select Credit Limit</option>
          {form.userType === 'Business User' && (
            <>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
            </>
          )}
          {form.userType === 'Vendor User' && (
            <>
              <option value="12000">12,000</option>
              <option value="15000">15,000</option>
              <option value="20000">20,000</option>
            </>
          )}
        </select>

        <input
          type="text"
          className="input01"
          placeholder="WhatsApp Number"
          value={form.whatsappNumber}
          onChange={(e) => this.handleInputChange('whatsappNumber', e.target.value)}
        />
        <input
          type="text"
          className="input01"
          placeholder="Address"
          value={form.address}
          onChange={(e) => this.handleInputChange('address', e.target.value)}
        />
        <input
          type="text"
          className="input01"
          placeholder="Aadhar Number"
          value={form.aadharNumber}
          onChange={(e) => this.handleInputChange('aadharNumber', e.target.value)}
        />
        <input
          type="text"
          className="input01"
          placeholder="Alternate Mobile Number"
          value={form.alternateMobileNumber}
          onChange={(e) => this.handleInputChange('alternateMobileNumber', e.target.value)}
        />

        <button className="submitButton01" onClick={this.handleSubmit}>Submit</button>

        {submissionStatus && <p className="submissionStatus01">{submissionStatus}</p>}
      </div>
      </Paper>
    );
  }
}

export default App;