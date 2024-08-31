import React, { Component } from 'react';
import './UpdateInventoryForm.css'; // Import the CSS file

class UpdateInventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        brandName: '',
        productType: '',
        productName: '',
        productVolume: '',
        price: '',
        discount: '',
        stock: '',
        additionalInfo: '',
      },
      productData: {
        productNameOptions: [],
        productVolumeOptions: [],
      },
    };

    this.productOptions = {
      Milk: {
        names: ['Full Cream Milk', 'Low Fat Milk'],
        volumes: ['250ml', '500ml', '1L', '2L'],
      },
      Cheese: {
        names: ['Cheddar Cheese', 'Mozzarella Cheese'],
        volumes: ['100g', '200g', '500g'],
      },
      Butter: {
        names: ['Salted Butter', 'Unsalted Butter'],
        volumes: ['100g', '200g'],
      },
      Yogurt: {
        names: ['Plain Yogurt', 'Flavored Yogurt'],
        volumes: ['250ml', '500ml', '1L'],
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { productType } = this.state.form;
    if (productType && prevState.form.productType !== productType) {
      this.setState({
        productData: {
          productNameOptions: this.productOptions[productType].names,
          productVolumeOptions: this.productOptions[productType].volumes,
        },
        form: {
          ...this.state.form,
          productName: '',
          productVolume: '',
        },
      });
    }
  }

  handleInputChange = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value,
      },
    });
  };

  handleSubmit = async () => {
    const { form } = this.state;
    try {
      const response = await fetch('https://your-api-endpoint.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get('content-type');

      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        alert('submitted successfully!');
        this.setState({
          form: {
            brandName: '',
            productType: '',
            productName: '',
            productVolume: '',
            price: '',
            discount: '',
            stock: '',
            additionalInfo: '',
          },
        });
      } else {
        alert(`Submission failed: ${data.message || data}`);
      }
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
  };

  render() {
    const { form, productData } = this.state;

    return (
      <div className="container22">
        <h1 className='mainhead22'>Update Inventory Form</h1>
        <label className="label22">Brand Name:</label>
        <select
          value={form.brandName}
          onChange={(e) => this.handleInputChange('brandName', e.target.value)}
          className="picker22"
        >
          <option value="">Select Brand</option>
          <option value="Dairy Gold">Dairy Gold</option>
          <option value="Amul">Amul</option>
          <option value="Mother Dairy">Mother Dairy</option>
          <option value="Nestlé">Nestlé</option>
        </select>

        <label className="label22">Product Type:</label>
        <select
          value={form.productType}
          onChange={(e) => this.handleInputChange('productType', e.target.value)}
          className="picker22"
        >
          <option value="">Select Product Type</option>
          <option value="Milk">Milk</option>
          <option value="Cheese">Cheese</option>
          <option value="Butter">Butter</option>
          <option value="Yogurt">Yogurt</option>
        </select>

        <label className="label22">Product Name:</label>
        <select
          value={form.productName}
          onChange={(e) => this.handleInputChange('productName', e.target.value)}
          className="picker22"
        >
          <option value="">Select Product Name</option>
          {productData.productNameOptions.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label className="label22">Product Volume:</label>
        <select
          value={form.productVolume}
          onChange={(e) => this.handleInputChange('productVolume', e.target.value)}
          className="picker22"
        >
          <option value="">Select Volume</option>
          {productData.productVolumeOptions.map((volume, index) => (
            <option key={index} value={volume}>
              {volume}
            </option>
          ))}
        </select>

        <label className="label22">Price:</label>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => this.handleInputChange('price', e.target.value)}
          className="input22"
        />

        <label className="label22">Discount:</label>
        <input
          type="number"
          placeholder="Discount"
          value={form.discount}
          onChange={(e) => this.handleInputChange('discount', e.target.value)}
          className="input22"
        />

        <label className="label22">Stock:</label>
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => this.handleInputChange('stock', e.target.value)}
          className="input22"
        />

        <label className="label22">Additional Info:</label>
        <input
          type="text"
          placeholder="Additional Info"
          value={form.additionalInfo}
          onChange={(e) => this.handleInputChange('additionalInfo', e.target.value)}
          className="input22"
        />

        <button onClick={this.handleSubmit} className="button22">
          Submit
        </button>
      </div>
    );
  }
}

export default UpdateInventoryForm;