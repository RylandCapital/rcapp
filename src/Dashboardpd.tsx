import React from "react";
import { PriceDeltaData } from "./panels/ContractHistoryEnterprise";
import { TVChartContainer } from './components/TVChartContainer/index';


export default function Dashboardch() {
  return (
    <div className="panels" >
      <div >
        <TVChartContainer />
      </div>
      <div >
        <PriceDeltaData  />
      </div>
    </div>
  )
  }