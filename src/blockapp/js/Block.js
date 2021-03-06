import React from 'react';
import { TextArea, Input, Container, Label, Table, Button} from 'semantic-ui-react';
import * as CryptoJS from 'crypto-js';

export default class Block extends React.Component {

	state = {
		data: '',
		block: 1,
		nonce: 72608,
	};

	constructor() {
		super();

		this.difficulty = 4;        // number of zeros required at front of hash
		this.maximumNonce = 500000; // limit the nonce to this so we don't mine too long

		// number of leading zeroes in the hash we need to generate
		this.pattern = '';
		for (var x=0; x < this.difficulty; x++) {
			this.pattern += '0';
		}
	}

	componentDidMount() {
		this.doHash();
	}

	doHash = () => {
		let message = this.makeMessage();
		return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
	}

	onDataChange = (e) => {
		this.setState({data: e.target.value});
	};

	onBlockNumberChange = (e) => {
		this.setState({block: e.target.value});
	};

	onNonceChange = (e) => {
		this.setState({nonce: e.target.value});
	};

	// the total message consists of user data, but also block number and nonce
	makeMessage = ()  => {
		// if this was a blockchain, the hash of the previous block would be included as well
		return `${this.state.block}${this.state.nonce}${this.state.data}`;
	}

	handleMineClick = () => {
		console.log("mine click");
	}

	render() {
		const style = {width : "100%"};
		let encodedBlock = this.doHash();

		return(
			<Container>
				<Table basic='very'>
					<Table.Body>
					<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
								<Label basic>Block:</Label>
							</Table.Cell>

							<Table.Cell>
								<Input fluid label='#'
									type='text'
									value={this.state.block}
									onChange={this.onBlockNumberChange}
								/>
							</Table.Cell>
						</Table.Row>

						<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
								<Label basic>Nonce:</Label>
							</Table.Cell>

							<Table.Cell>
								<Input fluid
									type='text'
									value={this.state.nonce}
									onChange={this.onNonceChange}
								/>
							</Table.Cell>
						</Table.Row>

						<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
								<Label basic>Data:</Label>
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
								<Label basic>Hash:</Label>
							</Table.Cell>
							<Table.Cell>
								<div>{encodedBlock}</div>
							</Table.Cell>
						</Table.Row>
						<Table.Row verticalAlign='top'>
							<Table.Cell textAlign='right'>
							</Table.Cell>
							<Table.Cell>
								<Button primary
									onClick={this.handleMineClick}
								>Mine</Button>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
    ); // end of return
  }
}
