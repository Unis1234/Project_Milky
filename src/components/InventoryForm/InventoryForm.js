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
    const {selectedImage} =this.state
    const file = event.target.files[0];
    
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     this.setState({ selectedImage: reader.result });
    //   };
    //   reader.readAsDataURL(file);
    // }
    this.setState({ selectedImage: URL.createobjectURL(file)});
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

    try {
      const postResponse = await fetch(url, options);
      const data = await postResponse.json();
      if (postResponse.status === 201) {
        console.log("Successfully Added");
        alert(
          `Form Data:\nid: ${inventoryData.proId}\nimage: ${inventoryData.proImage}\nBrand Name: ${inventoryData.brand}\nProduct Type: ${inventoryData.proType}\nProduct Name: ${inventoryData.proName}\nProduct Volume: ${inventoryData.proVolume}\nDescription: ${inventoryData.proDiscription}\nProduct Price: ${inventoryData.price}`
        );
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Failed to submit data. Please try again later.");
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

    // Validation
    if (
      !BrandName ||
      !ProductType ||
      !ProductVolume ||
      !productDescription ||
      !ProductName ||
      !selectedImage ||
      !productPrice
    ) {
      alert("Please fill in all required fields.");
      return;
    }

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
    this.setState({
      uniqId: '',
      BrandName: '',
      ProductType: '',
      ProductVolume: '',
      productDescription: '',
      productPrice: '',
      ProductName: '',
      selectedImage: null,
    });
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
      <div className="container33">
        <div className="scroll-container33">
          <h1 className="title33">Inventory Form</h1>

          <label className="label33">Brand Name:</label>
          <select
            value={BrandName}
            required
            className="picker33"
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

          <label className="label33">Product Type:</label>
          <select
            value={ProductType}
            className="picker33"
            onChange={(e) => this.setState({ ProductType: e.target.value })}
          >
            <option value="">Select Product Type</option>
            {['Milk', 'Curd', 'Ghee', 'Buttermilk', 'Paneer', 'Yogurt', 'Cheese', 'Butter'].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label className="label33">Product Name:</label>
          <select
            value={ProductName}
            className="picker33"
            onChange={(e) => this.setState({ ProductName: e.target.value })}
          >
            <option value="">Select Product Name</option>
            {['Gold', 'Thick', 'Cream', 'Honey', 'Ready to Drink'].map((value) => (
              <option key={value} value={value}>
                {`${value} ${ProductType}`}
              </option>
            ))}
          </select>

          <label className="label33">Product Volume:</label>
          <select
            value={ProductVolume}
            className="picker33"
            onChange={(e) => this.setState({ ProductVolume: e.target.value })}
          >
            <option value="">Select Product Volume</option>
            {dataType.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label className="label33">Product Description:</label>
          <textarea
            className="text-area33"
            value={productDescription}
            onChange={(e) => this.setState({ productDescription: e.target.value })}
            placeholder="Enter product description here"
          />

          <label className="label33">Price:</label>
          <input
            type="text"
            className="text-two33"
            value={productPrice}
            onChange={(e) => this.setState({ productPrice: e.target.value })}
          />

          {/* Image Picker Button Above Submit Button */}
          <button className="image-picker-button33" onClick={this.handleSelectImage}>
            Add Image
          </button>

          {selectedImage && <img src={selectedImage} alt="Selected" className="image33" />}

          <input
            id="imagePicker"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={this.handleImageChange}
          />

          <button className="button33" onClick={this.handleSubmit}>
            Submit Data
          </button>
        </div>
      </div>
    );
  }
}

export default InventoryForm;