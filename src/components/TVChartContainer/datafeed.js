
const configurationData = {
    supported_resolutions: ['1D'],
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
  }
  
  var positions = JSON.parse(Get('https://api.option-i.com/aggsector'));
  console.log(positions)
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
  console.log(positions)
 
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
                    description: ts,
                    exchange: ts,
                    full_name: ts,
                    symbol: ts,
                    type: 'ALT',
                }];  
            });
            
            return allSymbols;
        }

export default {
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
        const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('cannot resolve symbol');
            return;
        }
        const symbolInfo = {
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            exchange: symbolItem.exchange,
            supported_resolutions: configurationData.supported_resolutions,
        };

        console.log('[resolveSymbol]: Symbol resolved', symbolInfo);
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
        try {
            const data = await makeApiRequest();
            if (data.Response && data.Response === 'Error') {
                // "noData" should be set if there is no data in the requested period.
                onHistoryCallback([], { noData: true });
                return;
            }
            let bars = [];
            let full_name = symbolInfo.name
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
            
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
            onHistoryCallback(bars, { noData: false });
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
};
