import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    if (token == null) {    //if token is null / user not logged in - redirect to index
      navigate("/");
    }

    fetch(`http://localhost:7777/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const updatePrice = () => {
    const updatedProduct = { ...product, price: newPrice };
    fetch(`http://localhost:7777/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setNewPrice('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteProduct = () => {
    fetch(`http://localhost:7777/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(() => {
        navigate('/products');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='products-d-container-1'>
      <div className='products-d-container-2' key={product._id}>
        <p>_id: <span>{product._id}</span></p>
        <p>name: <span>{product.name}</span></p>
        <p>imageURL: <span>{product.imageURL}</span></p>
        <p>description: <span>{product.description}</span></p>
        <p>price: <span>{product.price} kr</span></p>
        <div className='products-d-container-2-1'>
          <label htmlFor="product-price">Type in a new price:</label>
          <input type="text" id="product-price" name="product-price" value={newPrice} onChange={handlePriceChange} />
          <p>kr</p>
          <button onClick={updatePrice}>Update Price</button>
          <button className='deletebtn' onClick={deleteProduct}>Delete Product</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;