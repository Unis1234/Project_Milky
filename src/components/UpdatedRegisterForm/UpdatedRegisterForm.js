import React, { Component } from 'react';
import './UpdatedRegisterForm.css'; // Import the CSS file

class UpdatedRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        selectedNumber: '1',
        mobileNumber: '9874563013',
        userType: 'Vendor User',
        userName: 'John Doe',
        password: 'password123',
        branchName: 'Main Branch',
        creditLimit: '12000',
        address: '123 Main St\nCity, Country',
        aadharNumber: '1234-5678-9012',
        alternateMobileNumber: '8975064356',
        whatsappNumber: '9874563013',
      },
      loading: false,
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
    this.setState({
      form: {
        ...this.state.form,
        userType: type,
        creditLimit: '',
      },
    });
  };

  validateForm = () => {
    const { form } = this.state;
    if (!form.mobileNumber || !form.userName || !form.password || !form.branchName || !form.creditLimit || !form.address || !form.aadharNumber || !form.whatsappNumber) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  handleSubmit = async () => {
    if (!this.validateForm()) {
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.form),
      });

      const data = await response.json();

      if (response.ok) {
        const successMessage = 'Submission Completed';
        alert(successMessage);

        this.setState({
          form: {
            selectedNumber: '',
            mobileNumber: '',
            userType: '',
            userName: '',
            password: '',
            branchName: '',
            creditLimit: '',
            whatsappNumber: '',
            address: '',
            aadharNumber: '',
            alternateMobileNumber: '',
          },
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      alert(`Error: Something went wrong: ${error.message}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { form, loading } = this.state;
    return (
      <div className="container11">
      <h1 className="title11">User Updated Form</h1>
        <label className="label11">Default Name With Number</label>
        <select
          value={form.selectedNumber}
          onChange={(e) => this.handleInputChange('selectedNumber', e.target.value)}
          className="picker11"
        >
          <option value="1">Adithya - 9874563013</option>
          <option value="2">Deepak - 8975064356</option>
        </select>

        <label className="label11">User Type:</label>
        <div className="radioContainer11">
          <div className="radioButton11" onClick={() => this.handleUserTypeSelection('Vendor User')}>
            <div className={`radioCircle11 ${form.userType === 'Vendor User' ? 'selectedRadioCircle' : ''}`} />
            <span className="radioText11">Vendor User</span>
          </div>
          <div className="radioButton11" onClick={() => this.handleUserTypeSelection('Business User')}>
            <div className={`radioCircle11 ${form.userType === 'Business User' ? 'selectedRadioCircle' : ''}`} />
            <span className="radioText11">Business User</span>
          </div>
        </div>

        <input
          type="text"
          className="input11"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={(e) => this.handleInputChange('mobileNumber', e.target.value)}
          disabled
        />

        <input
          type="text"
          className="input11"
          placeholder="User Name"
          value={form.userName}
          onChange={(e) => this.handleInputChange('userName', e.target.value)}
          disabled
        />

        <input
          type="password"
          className="input11"
          placeholder="Reset Password"
          value={form.password}
          onChange={(e) => this.handleInputChange('password', e.target.value)}
        />

        <input
          type="text"
          className="input11"
          placeholder="Branch Name"
          value={form.branchName}
          onChange={(e) => this.handleInputChange('branchName', e.target.value)}
          disabled
        />

        <label className="label11">Credit Limit:</label>
        <select
          value={form.creditLimit}
          onChange={(e) => this.handleInputChange('creditLimit', e.target.value)}
          className="picker11"
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
          className="input11"
          placeholder="WhatsApp Number"
          value={form.whatsappNumber}
          onChange={(e) => this.handleInputChange('whatsappNumber', e.target.value)}
          disabled
        />

        <input
          type="text"
          className="input11"
          placeholder="Alternate Mobile Number"
          value={form.alternateMobileNumber}
          onChange={(e) => this.handleInputChange('alternateMobileNumber', e.target.value)}
          disabled
        />

        <textarea
          className="input11"
          placeholder="Address"
          value={form.address}
          onChange={(e) => this.handleInputChange('address', e.target.value)}
        />

        <input
          type="text"
          className="input11"
          placeholder="Aadhar Number"
          value={form.aadharNumber}
          onChange={(e) => this.handleInputChange('aadharNumber', e.target.value)}
          disabled
        />

        <div className="buttonContainer11">
          {loading ? (
            <div className="loading11">Loading...</div>
          ) : (
            <button onClick={this.handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    );
  }
}

export default UpdatedRegisterForm;
