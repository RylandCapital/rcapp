import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library/charting_library.min';
import { Datafeed } from './datafeed.js';
import { indicator } from './indicator_template.js';



function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
  }

const templates_order = ['14', '11', '13', '12']

var i;
const templates = []
for (i = 0; i < templates_order.length; i++) {

	const chart = JSON.parse(Get('http://ec2-18-222-179-255.us-east-2.compute.amazonaws.com/1.1/charts?client=Option-i2&user=RylandCapital&chart='.concat(templates_order[i])))
	const chartt = JSON.parse(chart.data.content)
	const charttt = JSON.parse(chartt.content)
	templates.push(charttt)

}

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

//Financials 0 14
export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'SECTOR_FINANCIALS_NH_NL253',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeed: Datafeed,
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'http://ec2-18-222-179-255.us-east-2.compute.amazonaws.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'Option-i2',
		userId: 'RylandCapital',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},	
	};

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			datafeed: this.props.datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			time_frames: this.props.time_frames,
			custom_indicators_getter: indicator,
			saved_data: templates[0]
			
		};
		
		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}

//Diversified Financials 1 11
export class TVChartContainer2 extends React.PureComponent {
	static defaultProps = {
		symbol: 'SECTOR_FINANCIALS_NH_NL253',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeed: Datafeed,
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'http://ec2-18-222-179-255.us-east-2.compute.amazonaws.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'Option-i2',
		userId: 'RylandCapital',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},	
	};

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			datafeed: this.props.datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			time_frames: this.props.time_frames,
			custom_indicators_getter: indicator,
			saved_data: templates[1]
			
		};
		
		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}

//Capital Markets 2 13 
export class TVChartContainer3 extends React.PureComponent {
	static defaultProps = {
		symbol: 'INDUSTRY CAPITAL MARKETS NH NL253',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeed: Datafeed,
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'http://ec2-18-222-179-255.us-east-2.compute.amazonaws.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'Option-i2',
		userId: 'RylandCapital',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},	
	};

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			datafeed: this.props.datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			time_frames: this.props.time_frames,
			custom_indicators_getter: indicator,
			saved_data: templates[2]
			
		};
		
		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}

//Asset Management $ Custody Banks 3 12
export class TVChartContainer4 extends React.PureComponent {
	static defaultProps = {
		symbol: 'SUBINDUSTRY ASSET MANAGEMENT & CUSTODY BANKS NH NL253',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeed: Datafeed,
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'http://ec2-18-222-179-255.us-east-2.compute.amazonaws.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'Option-i2',
		userId: 'RylandCapital',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},	
	};

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			datafeed: this.props.datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			time_frames: this.props.time_frames,
			custom_indicators_getter: indicator,
			saved_data: templates[3]
			
		};
		
		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}

