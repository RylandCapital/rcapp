import { positions } from './datafeed.js';
//import { positions2 } from './datafeedgroup.js';



const product_keys = Object.keys(positions[0]).filter(function(number){
    return number !== 'index'
  });


export const indicator = function(PineJS) {
    const indicators = []
    product_keys.forEach((key) => {
            const oneindy = {
               name: key.replaceAll('_', ' '),
               metainfo: {
                   "_metainfoVersion": 40,
                   "id": key.replaceAll('_', ' ').concat("@tv-basicstudies-1"),
                   "scriptIdPart": "",
                   "name": key.replaceAll('_', ' '),
                   "description": key.replaceAll('_', ' '),
                   "shortDescription": key.replaceAll('_', ' '),
           
                   "is_hidden_study": false,
                   "is_price_study": true,
                   "isCustomIndicator": true,
           
                   "plots": [{"id": "plot_0", "type": "line"}],
                   "defaults": {
                       "styles": {
                           "plot_0": {
                               "linestyle": 0,
                               "visible": true,
           
                               // Make the line thinner
                               "linewidth": 1,
           
                               // Plot type is Line
                               "plottype": 2,
           
                               // Show price line
                               "trackPrice": true,
           
                               "transparency": 40,
           
                               // Set the plotted line color to dark red
                               "color": "#880000"
                           }
                       },
           
                       // Precision is set to one digit, e.g. 777.7
                       "precision": 1,
           
                       "inputs": {}
                   },
                   "styles": {
                       "plot_0": {
                           // Output name will be displayed in the Style window
                           "title": key.replaceAll('_', ' ').concat(" Indicator"),
                           "histogramBase": 0,
                       }
                   },
                   "inputs": [],
               },
           
               constructor: function() {
                   this.init = function(context, inputCallback) {
                       this._context = context;
                       this._input = inputCallback;
           
                       var symbol = key;
                       this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
                   };
           
                   this.main = function(context, inputCallback) {
                       this._context = context;
                       this._input = inputCallback;
           
                       this._context.select_sym(1);
           
                       var v = PineJS.Std.close(this._context);
                       return [v];
                   }
               }
           }

           indicators.push(oneindy)
     
    })
    
    return Promise.resolve(indicators)

}