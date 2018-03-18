import React from 'react';
import { TextArea, Input, Container, Label, Table} from 'semantic-ui-react';
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
				<Table>
					<Table.Body>
						<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
								<Label>Data:</Label>
							</Table.Cell>

							<Table.Cell>
								<TextArea autoHeight
									style={style}
									placeholder='Enter data here...'
									value={this.state.data}
									onChange={this.onDataChange}
								/>
							</Table.Cell>
						</Table.Row>

						<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
								<Label>Hash:</Label>
							</Table.Cell>
							<Table.Cell>
								<Input fluid
									type='text'
									value={this.state.encoded}
									readOnly
								/>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
    ); // end of return
  }
}
