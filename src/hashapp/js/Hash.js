import React from 'react';
import { TextArea, Input, Container } from 'semantic-ui-react';

export default class Hash extends React.Component {
	state = {
		data: ''
	};

	onDataChange = (e) => {
		this.setState({
			data: e.target.value,
		});
	};

	render() {
		const style = {width : "100%"};

		return(
			<Container>
				<TextArea autoHeight
					style={style}
					placeholder='Enter data here...'
					value={this.state.data}
					onChange={this.onDataChange}
				/>
				<Input fluid disabled
					type='text'
					placeholder='... and it gets hashed here'
					disabled
				/>
		</Container>
    ); // end of return
  }
}
