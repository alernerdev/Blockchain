import React from 'react';

export default class List extends React.Component {
	state = {
		data: ''
	};

	onDataChange = (e) => {
		this.setState({
			data: e.target.value,
		});
	};

	render() {
		return(
			<div className='ui text container' id='list'>
								<div className='ui input focus'>
									<textarea
										placeholder='Enter data here...'
										value={this.state.item}
										onChange={this.onDataChange}
									/>
								</div>
								<div className='field'>
									<input
										className='prompt'
										type='text'
										placeholder='... and it gets hashed here'
										disabled
									/>
								</div>
		</div>
    ); // end of return
  }
}
