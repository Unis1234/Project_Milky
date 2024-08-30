import React, { Component } from 'react';
import './InventoryForm.css';

class InventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqId: '',
      BrandName: '',
      ProductType: '',
      ProductVolume: '',
      productDescription: '',
      productPrice: '',
      ProductName: '',
      selectedImage: null,
    };
  }

  handleSelectImage = () => {
    document.getElementById('imagePicker').click();
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ selectedImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  postApiData = async (inventoryData) => {
    const url = 'http://localhost:4000/addInventories';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(inventoryData),
    };

    const postResponse = await fetch(url, options);
    const data = await postResponse.json();
    if (postResponse.status === 201) {
        console.log("Successfully Added")
      alert(
        `Form Data:\nid: ${inventoryData.proId}\nimage: ${inventoryData.proImage}\nBrand Name: ${inventoryData.brand}\nProduct Type: ${inventoryData.proType}\nProduct Name: ${inventoryData.proName}\nProduct Volume: ${inventoryData.proVolume}\nDescription: ${inventoryData.proDiscription}\nProduct Price: ${inventoryData.price}`
      );
    }
  };

  handleSubmit = () => {
    const {
      BrandName,
      ProductType,
      ProductVolume,
      productDescription,
      ProductName,
      selectedImage,
      productPrice,
    } = this.state;

    const inventoryData = {
      proId: BrandName + ProductType + '0001',
      brand: BrandName,
      proType: ProductType,
      proVolume: ProductVolume,
      proName: ProductName,
      proImage: selectedImage,
      proDiscription: productDescription,
      price: productPrice,
    };

    

    const alertMessage = `
    Submitted Inventory Details:
    - ID: ${inventoryData.proId}
    - Brand Name: ${inventoryData.brand}
    - Product Type: ${inventoryData.proType}
    - Product Name: ${inventoryData.proName}
    - Product Volume: ${inventoryData.proVolume}
    - Description: ${inventoryData.proDiscription}
    - Price: ${inventoryData.price}
  `;

   
    alert(alertMessage);

    this.postApiData(inventoryData);
    this.setState({uniqId: '',
        BrandName: '',
        ProductType: '',
        ProductVolume: '',
        productDescription: '',
        productPrice: '',
        ProductName: '',
        selectedImage: null,})
  };

  render() {
    const {
      BrandName,
      ProductType,
      ProductVolume,
      productDescription,
      productPrice,
      ProductName,
      selectedImage,
    } = this.state;

    const dataType =
      ProductType === 'Milk' || ProductType === 'Curd' || ProductType === 'Ghee'
        ? ['1L', '5L', '10L', '100ML', '500ML', '250ML']
        : ['1KG', '10KG', '100gm', '500gm', '250gm'];

    return (
      <div className="container">
        <div className="scroll-container">
          <h1 className="title">Inventory Form</h1>

          <label className="label">Brand Name:</label>
          <select
            value={BrandName}
            className="picker"
            onChange={(e) => this.setState({ BrandName: e.target.value })}
          >
            <option value="">Select Brand Name</option>
            {['Amul', 'Mother Dairy', 'Britannia', 'Nandini', 'Jersey', 'Dhodla', 'Gangadhar', 'Ganaga'].map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            )}
          </select>

          <label className="label">Product Type:</label>
          <select
            value={ProductType}
            className="picker"
            onChange={(e) => this.setState({ ProductType: e.target.value })}
          >
            <option value="">Select Product Type</option>
            {['Milk', 'Curd', 'Ghee', 'Buttermilk', 'Paneer', 'Yogurt', 'Cheese', 'Butter'].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label className="label">Product Name:</label>
          <select
            value={ProductName}
            className="picker"
            onChange={(e) => this.setState({ ProductName: e.target.value })}
          >
            <option value="">Select Product Name</option>
            {['Gold', 'Thick', 'Cream', 'Honey', 'Ready to Drink'].map((value) => (
              <option key={value} value={value}>
                {`${value} ${ProductType}`}
              </option>
            ))}
          </select>

          <label className="label">Product Volume:</label>
          <select
            value={ProductVolume}
            className="picker"
            onChange={(e) => this.setState({ ProductVolume: e.target.value })}
          >
            <option value="">Select Product Volume</option>
            {dataType.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label className="label">Product Description:</label>
    <textarea
      className="text-area"
      value={productDescription}
      onChange={(e) => this.setState({ productDescription: e.target.value })}
      placeholder="Enter product description here"
    />

    <label className="label">Price:</label>
    <input
      type="text"
      className="text-two"
      value={productPrice}
      onChange={(e) => this.setState({ productPrice: e.target.value })}
    />

    {/* Image Picker Button Above Submit Button */}
    <button className="image-picker-button" onClick={this.handleSelectImage}>
      Add Image
    </button>

    {selectedImage && <img src={selectedImage} alt="Selected" className="image" />}

    <input
      id="imagePicker"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={this.handleImageChange}
    />

    <button className="button" onClick={this.handleSubmit}>
      Submit Data
    </button>

        </div>
      </div>
    );
  }
}

export default InventoryForm;
