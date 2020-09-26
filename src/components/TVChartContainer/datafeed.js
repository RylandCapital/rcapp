
const configurationData = {
    supported_resolutions: ['1D'],
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
  }
  
  var positions = JSON.parse(Get('http://18.216.242.3/agggroup'));
  const product_keys = Object.keys(positions[0]).filter(function(number){
    return number !== 'date'
  });
  
  
  product_keys.forEach((key) => {
    positions.forEach((item) => {
      item.date = new Date(item.date)
      item[key] = Number(Number(item[key]).toFixed(3))
      item.time = item.date.getTime()/1000
      
    })
  });
 
export async function makeApiRequest() {
    try {
        return positions;
    } catch(error) {
        throw new Error(`request error: ${error.status}`);
    }
}

async function getAllSymbols() {
            let allSymbols = [];
            let products = Object.keys(positions[0])
            products.forEach(ts => {
                allSymbols = [...allSymbols, {
                    description: ts.replaceAll('_', ' '),
                    exchange: '',
                    full_name: ts.replaceAll('_', ' '),
                    full_name2: ts,
                    symbol: ts.replaceAll('_', ' '),
                    type: 'ALT',
                }];  
            });
            
            return allSymbols;
        }

const Datafeed = {
    onReady: (callback) => {
        
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData))
    },
    searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
        const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        const symbols = await getAllSymbols();
        const symbolItem = symbols.find(({ full_name }) => full_name === symbolName.replaceAll('_',' '));
        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName.replaceAll('_',' '));
            onResolveErrorCallback('cannot resolve symbol');
            return;
        }
        const symbolInfo = {
            name: symbolItem.symbol,
            name2: symbolItem.full_name2,
            description: symbolItem.description,
            type: symbolItem.type,
            exchange: symbolItem.exchange,
            supported_resolutions: configurationData.supported_resolutions,
        };

        console.log('[resolveSymbol]: Symbol resolved', symbolInfo);
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback,
         firstDataRequest) => {
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
        try {
            const data = await makeApiRequest();
            
            let bars = []; 
            let full_name = symbolInfo.name2
            data.forEach(bar => {
                if (bar.time >= from && bar.time < to) {
                    bars = [...bars, {
                        time: bar.date,
                        low: bar[full_name],
                        high: bar[full_name],
                        open: bar[full_name],
                        close: bar[full_name],
                    }];
                }
            });

            onHistoryCallback(bars, { noData: false })
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
            if (bars.length === 0) {
                onHistoryCallback(bars, { noData: true });
            }
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },

    calculateHistoryDepth : (resolution, resolutionBack, intervalBack) => {
        if (resolution === "D") {
            console.log('here')
            return {
                resolutionBack: 'M',
                intervalBack: 5000
            };
        }
    }
};


export {
    Datafeed,
    positions
}
