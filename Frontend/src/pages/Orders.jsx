import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Orders = () => {
  const { token } = useContext(AuthContext);  //getting token
  const navigate = useNavigate(); 
  
  const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      if(token == null){ //if token is null / user not logged in - redirect to index
        navigate("/");
      }

        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:7777/api/orders/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data) {
                    setOrders(data);
                }
            } catch (error){
                console.log('Error fetching orders', error);
            }
        };
        fetchOrders ()
    }, [token]);
  return (
    <>
      <div className='order-container-1'>
        <h1>Orders</h1>
          {orders.map(order => (  //using map to go through the array and display items within html elements
            <div className='order-container-2' key={order._id}>
              <h3 className='order-orderId'>Order Number: <span>{order._id}</span></h3>
              <h3 className='order-orderId'>user ID: <span>{order.user}</span></h3>
              <h3 className='order-status'>Order Status: <span>{order.status.status}</span></h3>
            <h4><Link to={`/orders/${order._id}`}>Details</Link></h4>
            </div>
          ))}
      </div>
    </>
  );
  }
  
  export default Orders