import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library/charting_library.min';
import { Datafeed } from './datafeed.js';
import { indicator } from './indicator_template.js';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

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
		time_frames: [
			{ text: "50y", resolution: "6M", description: "50 Years" },
			{ text: "3y", resolution: "1D", description: "3 Years", title: "3yr" },
			{ text: "8m", resolution: "1D", description: "8 Month" },
			{ text: "3d", resolution: "5", description: "3 Days" },
			{ text: "1000y", resolution: "1W", description: "All", title: "All" },
		]
	};

	tvWidget = null;

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			/*datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),*/
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
			custom_indicators_getter: indicator
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
