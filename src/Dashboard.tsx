import React from "react";
/*import SignalData from "./panels/SignalDataEnterprise";*/
import { TVChartContainer } from './components/TVChartContainer/index';

export default function Dashboard() {
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