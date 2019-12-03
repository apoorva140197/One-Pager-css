const staging = "rzp_test_PChbEfOPed5cIV";

const prod = "rzp_live_uSbOpxaxtGBKeU";

export default (process.env.REACT_APP_STAGE === "production" ? prod : staging);
