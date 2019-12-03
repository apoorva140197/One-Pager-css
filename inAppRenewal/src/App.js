import React from "react";
import "./App.css";
import axios from "axios";
import Spinner from "./components/UI/Spinner/Spinner";
import MainPanel from "./components/MainPanel/MainPanel";
import SidePanel from "./components/SidePanel/SidePanel";
import AppConfig from "./AppConfig";
import { getQuery } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [
        { time: 12, amount: 0 },
        { time: 6, amount: 0 },
        { time: 3, amount: 0 },
        // { time: 1, amount: 0 }
      ],
      
      loading: true,
      time: 12,
      error: null,
      // random: Math.floor(Math.random() * 10000), //For Carousel
      isVideo: 1,
      isAdv: 0,
      isAndroid: 1,
      isTest: 1
    };
  }
  componentDidMount() {
    this._api(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isAdv != prevState.isAdv ||
      this.state.isTest != prevState.isTest ||
      this.state.isAndroid != prevState.isAndroid ||
      this.state.isVideo != prevState.isVideo
    )
      this._api(this.state);
  }

  reset() {
    this.setState({ time: 12, isVideo: 1, isAndroid: 1, isTest: 1, isAdv: 0 });
  }

  _api = ({ isAdv, isAndroid, isTest, isVideo }) => {
    const promoHeaders = {
      "Api-Version": 3,
      "x-access-token": getQuery()["hash"]
    };

    axios
      .get(
        `${AppConfig.BASE_URL}/premium/plans?adr=${isAndroid}&vid=${isVideo}&cms=${isTest}&ads=${isAdv}`,
        { headers: promoHeaders }
      )
      .then(response => {
        let plans = [];

        for (let key in response.data.data.plans) {
          plans.push({
            time: key,
            amount: response.data.data.plans[key]
          });
        }
        plans = plans.reverse();
        this.setState({ plans, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false, error: "Internal server error" });
      });
  };

  setPayment(payment) {
    this.setState({ payment });
  }

  render() {
    let { error, loading, isTest, isAndroid, isVideo, isAdv } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <div className="App">
        <div className="Container">
          <div className="MainPanel">
            <MainPanel
              plans={this.state.plans}
              time={this.state.time}
              setTime={time => this.setState({ time })}
              random={this.state.random}
              setIsTest={isTest => this.setState({ isTest })}
              setIsAndroid={isAndroid => this.setState({ isAndroid })}
              setIsAdv={isAdv => this.setState({ isAdv })}
              setIsVideo={isVideo => this.setState({ isVideo })}
              isAndroid={isAndroid}
              isVideo={isVideo}
              isAdv={isAdv}
              isTest={isTest}
            />
          </div>
          <div className="SidePanel">
            <SidePanel
              plan={this.state.plans.find(p => p.time == this.state.time)}
              isAndroid={isAndroid}
              isVideo={isVideo}
              isAdv={isAdv}
              isTest={isTest}
              reset={() => this.reset()}
              errorApi={error}
            />
          </div>
        </div>
        {error && (
          <div className="ErrorContainer">
            <span>{error}</span>
            <button
              className="Close"
              onClick={() => this.setState({ error: null })}
            >
              x
            </button>
          </div>
        )}
        {loading && (
          <div className="ErrorContainer">
            <span>Loading prices...</span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
