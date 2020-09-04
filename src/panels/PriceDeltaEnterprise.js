import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import dyvolsheet from '../data/dyvolsheet.js';
import { AllModules } from 'ag-grid-enterprise';

function getColdefs() {

  let  coldefs = [{
    headerName: "Date", field: "index", type: ['dateColumn', 'nonEditableColumn'], valueFormatter: dateFormatter,
    enablePivot: true
    }]
  const product_keys = Object.keys(dyvolsheet[0]).filter(function(number){
    return number !== 'index'
  });

  product_keys.slice(18,17).forEach((key) => {

    coldefs = [...coldefs, {
      headerName: key,
      field: key,
      aggFunc: 'sum',
      enablePivot: true
      }];
    
  });
  return coldefs
}

const colarray = getColdefs()
console.log(colarray)

class ContractHistoryData extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        gridOptions : {
        enableCharts: true,
        enableRangeSelection: true,
        rowGroup: true,
        navigator: { enabled: true },
        columnDefs: colarray,

      rowData: dyvolsheet,
    
      // default ColDef, gets applied to every column
      defaultColDef: {

        sortable: true,
        // set the default column width
        // make every column editable
        editable: false,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter',
        // enable floating filters by default
        floatingFilter: true,
        // make columns resizable
        resizable: true,
      },
    
      // default ColGroupDef, get applied to every column group
      defaultColGroupDef: {
        marryChildren: true,
      },
      autoGroupColumnDef: { minWidth: 250 },
      sideBar: 'columns',
      // define specific column types
      columnTypes: {
        numberColumn: { filter: 'agNumberColumnFilter' },
        nonEditableColumn: { editable: false },
        dateColumn: {
          // specify we want to use the date filter
          filter: 'agDateColumnFilter',
    
          // add extra parameters for the date filter
          filterParams: {
          }
        
        },
        },
        
      }, 
    }
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        
    }

      processChartOptions = params => {
        var options = params.options;
        var dateFormatter = function(params) {
          return params.value.value && params.value.value.toLocaleDateString
            ? params.value.value.toLocaleDateString()
            : params.value;
        };
        options.seriesDefaults.tooltip.renderer = function(params) {
          var value = params.datum[params.xKey];
          return value && value.toLocaleDateString
            ? value.toLocaleDateString()
            : null;
        };
        if (['line'].indexOf(params.type) < 0) {
          if (options.xAxis && options.yAxis) {
            options.xAxis.label.formatter = dateFormatter;
            options.yAxis.label.formatter = dateFormatter;
          }
        } else {
          options.xAxis.type = 'time';
          options.xAxis.label.format = '%d %B';
        }
        return options;
      };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '400px',
         }}
      >
        <AgGridReact
          gridOptions={this.state.gridOptions}
          onGridReady={this.onGridReady}
          modules={AllModules}
          sideBar={true}
          processChartOptions={this.processChartOptions}
        >
        </AgGridReact>
      </div>
    );
  }
}


function dateFormatter(params) {
    var split = params.value.toISOString().split('T')[0].split('-');
    return split[1] + '/' + split[2] + '/' + split[0]
  }

export default ContractHistoryData;