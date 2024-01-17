import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

const PaypalPayment = () => {
  const serverUrl = "http://localhost:5000"; // Update the port to 5000

  const createOrder = (data, actions) => {
    // Order is created on the server and the order id is returned
    return fetch(`${serverUrl}/api/paypal/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: {
          title: "Getting the complete code",
          price: "500.00",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.jsonResponse.id);
  };

  const onApprove = (data, actions) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${serverUrl}/api/paypal/capture-order/${data.orderID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => {
        console.log("payment was successfully");
        response.json();
      })
      .then((data) => {
        // Capture the order on the client side
        if (data.jsonResponse.status === "COMPLETED") {
          return actions.order.capture();
        }
      })
      .catch((error) => {
        console.error("Error capturing order:", error);
        // Handle the error appropriately
      });
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypalPayment;
