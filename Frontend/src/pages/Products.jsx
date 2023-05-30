import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    imageURL: '',
    description: '',
    price: 0
  });

  useEffect(() => {
    if (token == null) { //if token is null / user not logged in - redirect to index
      navigate("/");
    }

    fetch("http://localhost:7777/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:7777/api/products/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({
          name: '',
          imageURL: '',
          description: '',
          price: 0
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className='products-container-1'>
        <div className='products-container-1-1'>
          <div className='products-container-1-1-1'>
                <h4>Add a product</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    />

                    <label htmlFor="imageURL">Image URL:</label>
                    <input
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    value={newProduct.imageURL}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    ></textarea>

                    <label htmlFor="price">Price:</label>
                    <input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
        <div className='products-container-1-2'>
            {products.map((product) => (
                <div className='products-container-1-2-2' key={product._id}>
                    <p>_id: <span>{product._id}</span></p>
                    <p>name: <span>{product.name}</span></p>
                    <div className='products-container-1-2-1'>
                        <h4><Link to={`/products/${product._id}`}>Details</Link></h4>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;