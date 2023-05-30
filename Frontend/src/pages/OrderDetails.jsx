import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { token } = useContext(AuthContext);  //getting token
  const navigate = useNavigate(); 
  const { id } = useParams();
  const [order, setMyOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true); // default set to true, changes to false if order fetch was sucessfull
  const [status, setStatus] = useState("");

  const fetchOrder = () => {
    try {
      fetch(`http://localhost:7777/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            setMyOrder(data);
            setIsLoading(false); // data has been fetched - sets isLoading to false
          }
        })
        .catch(error => {
          console.log('Error fetching order', error);
        });
    } catch (error) {
      console.log('Error fetching order', error);
    }
  };
  
  useEffect(() => {
    if (token == null) { //if token is null / user not logged in - redirect to index
      navigate("/");
    }
  
    fetchOrder();   //runs fetchOrder function inside of useEffect hook instead
  }, [id, token]);
  
  const handleStatusChange = () => {
    try {
      fetch(`http://localhost:7777/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: parseInt(status) }) // converts status to number and adds it to body
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            fetchOrder(); // gets the updated order information again
          }
        })
        .catch(error => {
          console.log('Error updating order status', error);
        });
    } catch (error) {
      console.log('Error updating order status', error);
    }
  };

  if (isLoading) {  //checks if order fetch was sucessfull and if not, returns a <p> tag
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='order-container-1'>
        <h1>Order Details</h1>
        <div className='order-container-2' key={order._id}>
            <h3 className='order-orderId'>Order Number: <span>{order._id}</span></h3>
            <h3 className='order-orderId'>user ID: <span>{order.user}</span></h3>
            <h3 className='order-status'>Order Status: <span>{order.status.status}</span></h3>
          {order.orderRows.map(orderRow => (
            <div className='order-productInfo' key={orderRow._id}>
              <p>{orderRow.quantity} {orderRow.product.name}s at {orderRow.product.price}kr per</p>
            </div>
          ))}
            <div className='order-container-2-1'>
                <label htmlFor="status">Select a Status: </label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">-- Status --</option>
                    <option value="1"> pending</option>
                    <option value="2"> in transit</option>
                    <option value="3"> delivered</option>
                </select>
                <button onClick={handleStatusChange}>Update Status</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;