import React from "react";
/*import SignalData from "./panels/SignalDataEnterprise";*/
import { TVChartContainer,
   TVChartContainer2,
   TVChartContainer3,
   TVChartContainer4,} from './components/TVChartContainer/index';

//Financials
export  function Dashboard() {
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
//Diversified Financials 
  export function Dashboard2() {
    return (
      <div className="panels" >
        <div >
          <TVChartContainer2 />
        </div>
        <div >
   
        </div>
      </div>
    )
    }
//Capital Markets
export  function Dashboard3() {
  return (
    <div className="panels" >
      <div >
        <TVChartContainer3 />
      </div>
      <div >
 
      </div>
    </div>
  )
  }
//Asset Management $ Custody Banks
  export function Dashboard4() {
    return (
      <div className="panels" >
        <div >
          <TVChartContainer4 />
        </div>
        <div >
   
        </div>
      </div>
    )
    }