import React, { Component, Fragment } from "react";
import axios from "axios";
// import parseError from "../UI/parseError";
//import { toastr } from 'react-redux-toastr';
import razorPayKey from "../RazorPay/RazorPay.js";
import close from "../../assets/images/close.svg";
import success from "../../assets/images/success.svg";
import fail from "../../assets/images/fail.svg";
import classes from "./SidePanel.module.css";
import Modal from "../UI/Modal/Modal";
import FormatModal from "../UI/FormatModal/FormatModal";
import webLoginLogo from "../../assets/images/web-login-logo.png";
import AppConfig from "../../AppConfig";
import { getQuery } from "../../utils";
import failure from "../../assets/images/failure.svg";

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userNumber: "",
      userMail: "",
      tutorId: "",
      orgId: "",
      appliedPromo: undefined,
      applyingPromo: false,
      inputPromo: "",
      expiryDate: "",
      gstInput:"",
      error: null,
      isPayment: false,
      isPaymentFailure: false
    };
  }

  handlePromo = () => {
    this.setState({ applyingPromo: true });
    const promoHeaders = {
      "Api-Version": 3,
      "x-access-token": getQuery()["hash"]
    };
    axios
      .post(
        `${AppConfig.BASE_URL}/premium/coupon`,
        { couponCode: this.state.inputPromo },
        { headers: promoHeaders }
      )
      .then(response => {
        this.setState({
          appliedPromo: response.data.data.coupon,
          applyingPromo: false
        });
      })
      .catch(error => {
        this.setState({ error: "PromoCode API Failure", applyingPromo: false });
      });
  };

  handlePromoInput = e => {
    this.setState({ inputPromo: e.target.value });
  };

  handleGstInput= e =>{
    this.setState({ gstInput : e.target.value});
  };

  handleClose = () => {
    this.setState({ appliedPromo: undefined, inputPromo: "" });
  };

  handleModalContinue = () => {
    this.props.reset();
    this.setState({
      isPayment: false,
      isPaymentFailure: false,
      inputPromo: "",
      appliedPromo: undefined
    });
  };

  handlePayment = finalAmount => {
    let discount = this.state.appliedPromo
      ? this.state.appliedPromo.discount
      : 0;

    const { isVideo, isAndroid, isTest, isAdv, plan } = this.props;
    const {
      appliedPromo,
      userMail,
      userNumber,
      inputPromo,
      tutorId,
      orgId,
      expiryDate
    } = this.state;
    const _this = this;
    const options = {
      key: razorPayKey,
      amount: finalAmount * 100,
      image: webLoginLogo,
      currency: "INR",
      notes: {
        orgId: orgId,
        tutorId: tutorId,
        amount: 100 * plan.amount * (1 - discount / 100),
        video: isVideo,
        android: isAndroid,
        ads: isAdv,
        cms: isTest,
        couponCode: inputPromo,
        duration: plan.time,
        deviceType: /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? "ANDROID"
          : /iPhone|iPad|iPod/i.test(navigator.userAgent)
          ? "IOS"
          : "WEB"
      },
      handler(response) {

        // _this.setState({ isPayment: true });

        const promoHeaders = {
          "Api-Version": 3,
          "x-access-token": getQuery()["hash"]
        };
        axios
          .post(
            `${AppConfig.BASE_URL}/premium/purchase`,
            {
              transactionId: response.razorpay_payment_id,
              amount: 100 * plan.amount * (1 - discount / 100),
              video: isVideo,
              android: isAndroid,
              ads: isAdv,
              cms: isTest,
              couponCode: inputPromo,
              duration: plan.time,
              gstin:_this.state.gstInput
            },
            { headers: promoHeaders }
          )
          .then(response => {
            _this.setState({
              expiryDate: response.data.data.payment.premiumExpiry,
              loading: false,
              isPayment: true
            });
          })
          .catch(error => {
            _this.setState({
              loading: false,
              error: "Purchase API Failure",
              isPaymentFailure: true
            });
          });
      },
      prefill: {
        contact: userNumber,
        email: userMail
      }
    };
    const instance = new window.Razorpay(options);
    instance.open();
  };

  handleBuy = finalAmount => {
    const { isAndroid, isVideo, isAdv, isTest, plan } = this.props;
    const promoHeaders = {
      "Api-Version": 3,
      "x-access-token": getQuery()["hash"]
    };
    let discount = this.state.appliedPromo
      ? this.state.appliedPromo.discount
      : 0;
    axios
      .post(
        `${AppConfig.BASE_URL}/premium/verify`,
        {
          amount: 100 * plan.amount * (1 - discount / 100),
          video: isVideo,
          android: isAndroid,
          ads: isAdv,
          cms: isTest,
          couponCode: this.state.inputPromo,
          duration: plan.time,
          gstin:this.state.gstInput
        },
        { headers: promoHeaders }
      )
      .then(response => {
        this.setState({
          userNumber: response.data.data.payment.userDetail.mobile,
          userMail: response.data.data.payment.userDetail.email,
          tutorId: response.data.data.payment.userDetail.tutorId,
          orgId: response.data.data.payment.userDetail.orgId
        });
        this.handlePayment(finalAmount);
      })
      .catch(error => {
        this.setState({ error: "Buy Now API Failure", loading: false });
      });
  };

  render() {
    const { plan, errorApi } = this.props;
    let {
      applyingPromo,
      appliedPromo,
      inputPromo,
      gstInput,
      isPayment,
      isPaymentFailure,
      expiryDate,
      loading,
      error
    } = this.state;

    let finalAmount = (
      parseFloat(plan.amount) -
      (((appliedPromo && appliedPromo.discount) || 0) / 100) * plan.amount
    ).toFixed(2);
    return plan ? (
      <div className={classes.SideContainer}>
        <div
          className={classes.Upper}
          style={{ opacity: applyingPromo ? ".5" : "1" }}
        >

                      {!appliedPromo ? (
              <div className={classes.ApplyContainer}>
                <input
                  disabled={applyingPromo}
                  name="inputPromo"
                  value={inputPromo}
                  onChange={this.handlePromoInput}
                  type="text"
                  placeholder="Have a promo code ?"
                  className={classes.ApplyInput}
                />
                <button
                  className={errorApi ? classes.DisableApply : classes.ApplyBtn}
                  disabled={applyingPromo}
                  onClick={errorApi ? "" : this.handlePromo}
                >
                  <span>APPLY</span>
                </button>
              </div>
            ) : appliedPromo.isValid ? (
              <div className={classes.PromoSuccessContainer}>
                <span className={classes.PromoSuccess}>
                  Promo code {inputPromo} applied ! You are Saving &#x20b9;{" "}
                  {parseFloat(
                    (appliedPromo.discount / 100) * plan.amount
                  ).toFixed(0)}
                </span>
                <span className={classes.CloseImage} onClick={this.handleClose}>
                  <img src={close} alt="" />
                </span>
              </div>
            ) : (
              <div className={classes.PromoSuccessContainer}>
                <span className={classes.PromoSuccess}>
                  Promo code invalid or used already.Please retry!
                </span>
                <span className={classes.CloseImage} onClick={this.handleClose}>
                  <img src={close} alt="" />
                </span>
              </div>
            )}
          <span
            style={{
              fontSize: "16px",
              lineHeight: "19px",
              padding: "16px 0 0 16px",

              display: "flex"
            }}
          >
            Bill Details
          </span>
          <div className={classes.Listing}>
            <div className={classes.Item}>
              <span>Item Total</span>
              <span>
                {plan.time} X &#x20b9;
                {parseFloat(plan.amount / plan.time).toFixed(2)}
              </span>
            </div>

            <div className={classes.MultipliedAmount}>
              <span> &#x20b9;{plan.amount}</span>
            </div>
            {appliedPromo && appliedPromo.isValid ? (
              <Fragment>
                <div className={classes.Item}>
                  <span>Promo Code</span>
                  <span>{appliedPromo.discount}%</span>
                </div>
                <div className={classes.Item}>
                  <span>Discount</span>
                  <span style={{ color: "#52B062" }}>
                    - &#x20b9;
                    {parseFloat(
                      (appliedPromo.discount / 100) * plan.amount
                    ).toFixed(0)}
                  </span>
                </div>
              </Fragment>
            ) : (
              ""
            )}
            <div className={classes.Item}>
              <span style={{ color: "black", fontWeight: "bold" }}>To Pay</span>
              <span style={{ color: "black", fontWeight: "bold" }}>
                &#x20b9;
                {(
                  parseFloat(plan.amount) -
                  (((appliedPromo && appliedPromo.discount) || 0) / 100) *
                    plan.amount
                ).toFixed(0)}
              </span>
            </div>
            <div className={classes.Gst}>
                  <p>GSTIN :</p>
                <input type="text" placeholder="Enter Your GSTIN" 
                className={classes.GstInput} required maxLength="15"
                value={gstInput} 
                name="gstInput"
                onChange={this.handleGstInput}
                />

            </div>

          </div>
          <div className={classes.ButtonContainerDesktop}>
            <button
              className={errorApi ? classes.DisableButton : classes.OkeyButton}
              onClick={() => (errorApi ? "" : this.handleBuy(finalAmount))}
            >
              <span>
                {" "}
                Buy Now for &#x20b9;{parseFloat(finalAmount).toFixed(0)}
                /-
              </span>
            </button>
          </div>

          <Modal toggle={this.handleModalContinue} hidden={!isPayment}>
            <FormatModal>
              <div className={classes.SuccessModalContainer}>
                <img src={success} alt="" />
                <p className={classes.SuccessModalEndDate}>
                  You have successfully extended your pro subscription till{" "}
                  {expiryDate.slice(0, 10)}
                </p>

                <div>
                  <button
                    className={classes.SuccessModalOkButton}
                    onClick={this.handleModalContinue}
                  >
                    <p className={classes.SuccessModalButtonText}>Continue</p>
                  </button>
                </div>
              </div>
            </FormatModal>
          </Modal>

          <Modal toggle={this.handleModalContinue} hidden={!isPaymentFailure}>
            <FormatModal>
              <div className={classes.SuccessModalContainer}>
                <img src={failure} alt="" />
                <p className={classes.SuccessModalEndDate}>
                  Failed to extend your subscription
                </p>

                <div>
                  <button
                    className={classes.SuccessModalOkButton}
                    onClick={this.handleModalContinue}
                  >
                    <p className={classes.SuccessModalButtonText}>Continue</p>
                  </button>
                </div>
              </div>
            </FormatModal>
          </Modal>
        </div>
        <div className={classes.LowerMobileView}>
          <div className={classes.TnC}>
            <span className={classes.Heading}>Terms and Conditions</span>
            <span className={classes.TnCText}>
              {" "}
              This section contains the necessary terms and conditions complying
              with the guidelines of Appstore
            </span>
          </div>
        </div>

        <div className={classes.ButtonContainerMobile}>
          <button
            disabled={applyingPromo}
            className={errorApi ? classes.DisableButton : classes.OkeyButton}
            onClick={() => (errorApi ? "" : this.handleBuy(finalAmount))}
          >
            <span>
              {" "}
              Buy Now for &#x20b9;{parseFloat(finalAmount).toFixed(0)} /-
            </span>
          </button>
        </div>
      </div>
    ) : (
      loading && (
        <div className="ErrorContainer">
          <span>{error}</span>
        </div>
      )
    );
  }
}

export default SidePanel;
