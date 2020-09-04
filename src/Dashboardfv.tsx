import React from "react";
import { FairValueData } from "./panels/ContractHistoryEnterprise";
import { TVChartContainer } from './components/TVChartContainer/index';


export default function Dashboardch() {
  return (
    <div className="panels" >
      <div >
        <TVChartContainer />
      </div>
      <div >
        <FairValueData  />
      </div>
    </div>
  )
  }