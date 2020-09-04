import React from "react";
/*import { ContractHistoryData } from "./panels/ContractHistoryEnterprise";*/
import { TVChartContainer } from './components/TVChartContainer/indexgroup';


export default function DashboardGroup() {
  return (
    <div className="panels" >
      <div >
        <TVChartContainer />
      </div>
      <div >

      </div>
    </div>
  )
  }