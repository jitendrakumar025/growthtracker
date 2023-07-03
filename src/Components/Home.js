import React, { useState } from "react";
import PieChart from "../Chart/pie";

const Home = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);

  const [returnRate, setReturnRate] = useState(1);
  const [timePeriod, setTimePeriod] = useState(1);
  const [activeLumpsum, setActiveLumpsum] = useState(false);
  const [activeSIP, setActiveSIP] = useState(true);

  const SIP = () => {
    setActiveSIP(true);
    setActiveLumpsum(false);
    // console.log(activeSIP);
    // console.log(activeLumpsum);
  };

  const LumpSum = () => {
    setActiveSIP(false);
    setActiveLumpsum(true);
    // console.log(activeSIP);
    // console.log(activeLumpsum);
  };

  const calculateLumpsum = () => {
    const investedAmount = monthlyInvestment;
    let MaturityAmount = 0;

    MaturityAmount = Math.round(
      investedAmount * Math.pow(1 + returnRate / 100, timePeriod)
    );

    const estimatedReturns = MaturityAmount - investedAmount;
    const totalValue = MaturityAmount;
    return {
      investedAmount,
      estimatedReturns,
      totalValue,
    };
  };

  const calculateSIP = () => {
    const monthlyReturnRate = returnRate / (100 * 12);
    const totalMonths = timePeriod * 12;

    let estimatedReturns = 0;
    let maturityAmmount = 0;

    const investedAmount = monthlyInvestment * totalMonths;

    maturityAmmount =
      monthlyInvestment *
      ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) *
      (1 + monthlyReturnRate);

    maturityAmmount = Math.round(maturityAmmount);

    estimatedReturns = maturityAmmount - investedAmount;
    const totalValue = maturityAmmount;
    return {
      investedAmount,
      estimatedReturns,
      totalValue,
    };
  };

  const handleMonthlyInvestmentChange = (e) => {
    const value = parseInt(e.target.value);
    setMonthlyInvestment(value);
    if (activeSIP) {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  };

  const handleReturnRateChange = (e) => {
    const value = parseFloat(e.target.value);
    setReturnRate(value);
    if (activeSIP) {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  };

  const handleTimePeriodChange = (e) => {
    const value = parseInt(e.target.value);
    setTimePeriod(value);
    if (activeSIP) {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  };

  const dataSet = [
    {
      id: "ammount",
      label: "Invested ammount",
      value: `${
        activeSIP
          ? calculateSIP().investedAmount
          : calculateLumpsum().investedAmount
      }`,
      color: "#0abb92",
    },
    {
      id: "returns",
      label: "Est. returns",
      value: `${
        activeSIP
          ? calculateSIP().estimatedReturns
          : calculateLumpsum().estimatedReturns
      }`,
      color: "#0abb92",
      
    },
  ];

  return (
    <>
      <div className="MainContainer">
        <div className="Details">
          {activeSIP ? (
            <>
              <h2>How can a SIP return calculator help you?</h2>
              <p>
                According to some mutual fund experts, SIP is a more profitable
                investment than a lump sum. It helps you become financially
                disciplined and create savings habits that can benefit you in
                the future. 
                <br />
                <br/>
                A SIP calculator online is a beneficial tool, which shows the
                estimated returns you will earn after the investment tenure.
                <br /> <br/>
                Few of the benefits of SIP calculators include – <br /> <br/>
                1.It assists you to determine the amount you want to invest in.{" "}
                <br /> <br/>
                2.It tells you the total amount you have invested.
                <br /> <br/>
                3.It gives an estimated value of the returns.
                <br />
              </p>
            </>
          ) : (
            <>
              {" "}
              <h2>How can a Lumpsum return calculator help you?</h2>
              <p>
                Mutual fund investors can use this calculator to figure out the
                estimated returns on their investments.
                <br />
                <br/>
                Few of benefits of Lumpsum calculators are– <br /> <br/>
                1.This calculator gives you an estimated return for the entire
                investment period. You can calculate your investment return in 1
                year, 3 years and 5 years using this calculator. <br /> <br/>
                2.It is extremely convenient and easy to use. Even a layman can
                use this calculator with ease. <br/> <br/>
                3.It provides a reasonably
                accurate estimate. Note that mutual fund investments are subject
                to market risk and cannot be predicted with extreme accuracy.{" "}
                <br /> <br/>
                4.Mutual fund <strong>Lumpsum</strong> calculators allow
                investors to better plan their finances based on the estimated
                return they are most likely to receive at the end of an
                investment period. 
                <br />
              </p>
            </>
          )}
        </div>

        <div className="container">
          <h2 className="h2">
            {" "}
            {activeSIP ? "SIP Calculator" : "LumpSum Calculator"}{" "}
          </h2>
          <div className="mainBox ">
            <div className="toggle">
              <button className={activeSIP ? "active" : ""} onClick={SIP}>
                SIP
              </button>
              <button
                className={activeLumpsum ? "active" : ""}
                onClick={LumpSum}
              >
                Lumpsum
              </button>
            </div>
            <div className="contents" id="sip">
              <div className="inputBox container">
                <div className="inputBox ">
                  <div className="box1">
                    <div className="label">
                      {" "}
                      {activeSIP ? "Monthly investment" : "Total investment"}
                    </div>
                    <div className="d-flex align-item-center ">
                      <div className="head">
                        <span>
                          <span className="ruppeSym">₹</span>
                        </span>
                        <input
                          type="text"
                          name="rupee"
                          id="rupee"
                          placeholder="0"
                          min="500"
                          max={activeSIP ? "100000" : "1000000"}
                          value={monthlyInvestment}
                          onChange={handleMonthlyInvestmentChange}
                        />
                        <span></span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="range"
                    className="form-range"
                    id="investment_range"
                    min="500"
                    step="500"
                    max={activeSIP ? "100000" : "1000000"}
                    defaultValue={monthlyInvestment}
                    onChange={handleMonthlyInvestmentChange}
                  />
                </div>

                <div className="inputBox ">
                  <div className="box1">
                    <div className="label">Expected return rate (p.a)</div>
                    <div className="d-flex align-item-center ">
                      <div className="head">
                        <span></span>
                        <input
                          type="text"
                          name="rate"
                          id="rate"
                          placeholder="0"
                          min="1"
                          max="30"
                          value={returnRate}
                          onChange={handleReturnRateChange}
                        />
                        <span>
                          <span className="Symbol">%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    id="rate_range"
                    min="1"
                    step="0.1"
                    max="30"
                    defaultValue={returnRate}
                    onChange={handleReturnRateChange}
                  />
                </div>

                <div className="inputBox ">
                  <div className="box1">
                    <div className="label">Time period</div>
                    <div className="d-flex align-item-center pr-1 ">
                      <div className="head">
                        <span></span>
                        <input
                          type="text"
                          name="time"
                          id="time"
                          placeholder="0"
                          min="1"
                          max="40"
                          value={timePeriod}
                          onChange={handleTimePeriodChange}
                        />
                        <span className="Symbol">Yr</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    id="time_range"
                    min="1"
                    step="1"
                    max="40"
                    defaultValue={timePeriod}
                    onChange={handleTimePeriodChange}
                  />
                </div>

                <div className="result">
                  <div className="resText">Invested amount</div>
                  <div className="">
                    <span className="res">
                      ₹
                      <span>
                        {" "}
                        {activeSIP
                          ? `${calculateSIP().investedAmount.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`
                          : `${calculateLumpsum().investedAmount.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`}{" "}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="result">
                  <div className="resText">Est. returns</div>
                  <div className="">
                    <span className="res">
                      ₹
                      <span>
                        {" "}
                        {activeSIP
                          ? `${calculateSIP().estimatedReturns.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`
                          : `${calculateLumpsum().estimatedReturns.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`}{" "}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="result">
                  <div className="resText">Total value</div>
                  <div className="">
                    <span className="res">
                      ₹
                      <span>
                        {" "}
                        {activeSIP
                          ? `${calculateSIP().totalValue.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`
                          : `${calculateLumpsum().totalValue.toLocaleString(
                              "en-IN",
                              { minimumFractionDigits: 0 }
                            )}`}{" "}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="chart">
                <PieChart data={dataSet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
