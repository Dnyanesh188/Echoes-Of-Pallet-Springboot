
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);
  const [walletRequest, setWalletRequest] = useState({
    id: user.id,
    walletAmount: "",
  });

  useEffect(() => {
    const getMyWallet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/fetch/user-id?userId=${user.id}`
        );
        if (response.data && response.data.users.length > 0) {
          setWalletAmount(response.data.users[0].walletAmount);
        }
      } catch (error) {
        console.error("Error fetching wallet data", error);
        toast.error("Failed to fetch wallet details");
      }
    };
    getMyWallet();
  }, []);

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const amount = parseInt(walletRequest.walletAmount) * 100; // Convert to paise
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const options = {
      key: "rzp_test_9C5DF9gbJINYTA",
      amount: amount,
      currency: "INR",
      name: "MyWallet App",
      description: "Add Money to Wallet",
      handler: async function (response) {
        try {
          const updateResponse = await axios.put(
            "http://localhost:8080/api/user/update/wallet",
            {
              id: user.id,
              walletAmount: parseFloat(walletRequest.walletAmount),
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (updateResponse.data.success) {
            toast.success("Money added successfully!");
            setWalletAmount(updateResponse.data.updatedWalletAmount);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error(updateResponse.data.responseMessage || "Failed to update wallet.");
          }
        } catch (error) {
          console.error("Error updating wallet", error);
          toast.error(error.response?.data?.responseMessage || "Transaction successful, but wallet update failed.");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="admin-container">
      <div className="mt-2 mb-4 d-flex aligns-items-center justify-content-center">
        <div className="card form-card custom-bg" style={{ width: "25rem" }}>
          <div
            className="card-header bg-color text-center custom-bg-text mb-3"
            style={{ borderRadius: "1em", height: "50px" }}
          >
            <h3>Pay Balance</h3>
          </div>
          <h4 className="ms-3 text-color text-center">
            Pay Balance: ₹ {walletAmount}
          </h4>
          <hr />
          <div
            className="card-header bg-color text-center custom-bg-text"
            style={{ borderRadius: "1em", height: "50px" }}
          >
            <h4 className="card-title">Add Money In Wallet</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label className="form-label">
                  <b>Amount</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="walletAmount"
                  onChange={handleInput}
                  value={walletRequest.walletAmount}
                  required
                />
              </div>
              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="button"
                  className="btn bg-color custom-bg-text"
                  onClick={handlePayment}
                >
                  Add Money
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
