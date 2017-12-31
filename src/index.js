import React, { Component} from 'react';
import {
	View,
	ListView,
	Dimensions,
} from 'react-native';

import PHOTOS from './Services/FakeApi';
import { processImages, buildRows, normalizeRows } from './Utils';
import PhotoGallery from './Components/PhotoGallery';
import GridItem from './Components/GridItem';

const maxWidth = Dimensions.get('window').width;

export default class App extends  Component {
	constructor() {
		super();
		const ds = this._getDataSource();
		const rows = this._getRows();

		this.state = {
			dataSource: ds.cloneWithRows(rows)
		};
	}


	_getRows = () => {
		const processedImages = processImages(PHOTOS);
		let rows = buildRows(processedImages, maxWidth);
		rows = normalizeRows(rows, maxWidth);
		return rows;
	}

	_getDataSource = () => {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		return ds;
	}

	renderRow = (onPhotoOpen, row) =>
		<View
			style={{
				flexDirection: 'row',
				marginBottom: 5,
				justifyContent: 'space-between'
			}}
		>
			{row.map(item =>
				<GridItem item={item} key={item.id} onPhotoOpen={onPhotoOpen} />
			)}
		</View>;

	render() {
		return (
			<PhotoGallery
				renderContent={({ onPhotoOpen }) =>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this, onPhotoOpen)}
					/>}
			/>
		);
	}
}
