let BASE_URL = "http://10.5.50.96:8080/v2";

if (process.env.NODE_ENV == "development") {
  BASE_URL = "http://10.5.50.96:8080/v2";
} else {
  if (process.env.REACT_APP_BUILD_ENV == "staging") {
    BASE_URL = "http://dev-testing.classplus.co/v2";
  } else if (process.env.REACT_APP_BUILD_ENV == "production") {
    BASE_URL = "http://dev-testing.classplus.co/v2";
  }
}

export default {
  BASE_URL
};
