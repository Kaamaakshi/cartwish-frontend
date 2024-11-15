import React, { useContext, useMemo } from "react";

import userContext from "../../context/userContext";

import "./CartPage.css";
import config from "../../config.json";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import cartContext from "../../context/cartontext";
import { checkoutAPI } from "../../services/orderService";
import { toast } from "react-toastify";

const CartPage = () => {
  // const [subTotal, setSubTotal] = useState(0);
  const user = useContext(userContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(cartContext);

  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order Placed Successfully!!");
      })
      .catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
  };
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>

      {/* Cart Table */}

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  CartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove_icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>SubTotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        CheckOut
      </button>
    </section>
  );
};

export default CartPage;
