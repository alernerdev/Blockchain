import React from 'react';
import { TextArea, Input, Container, Label} from 'semantic-ui-react';
import * as CryptoJS from 'crypto-js';

export default class Hash extends React.Component {
	state = {
		data: '',
		encoded: ''
	};

	constructor() {
		super();
	}

	componentDidMount() {
		let hash = CryptoJS.SHA256(this.state.data).toString(CryptoJS.enc.Hex);
		this.setState({
			encoded: hash
		});
	}

	onDataChange = (e) => {
		let data = e.target.value;
		let hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);

		this.setState({
			data: data,
			encoded: hash
		});
	};

	render() {
		const style = {width : "100%"};

		return(
			<Container>
				<Label pointing='below'>As you type, data is encrypted and produces a unique signature</Label>
				<TextArea autoHeight
					style={style}
					placeholder='Enter data here...'
					value={this.state.data}
					onChange={this.onDataChange}
				/>
				<Input fluid
					type='text'
					value={this.state.encoded}
					readOnly
				/>
				{
					this.state.data.length === 0 ? <Label pointing='above'>... and even no data has a unique signature</Label> : null
				}
			</Container>
    ); // end of return
  }
}
