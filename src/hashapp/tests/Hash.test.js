import React from 'react';
import { shallow } from 'enzyme';
import { TextArea, Input } from 'semantic-ui-react';

import Hash from '../js/Hash';

/* expect works, but eslint is complaining */
/* eslint-disable no-undef */

describe('HashApp', () => {
	let wrapper;

	beforeEach(() =>
	{
		wrapper = shallow(
			<Hash />
		);
	});

	it('should have a TextArea element', () => {
		expect(wrapper.containsMatchingElement(
			<TextArea></TextArea>
		)).toBe(true);
	});

	it('should have a Input element', () => {
		expect(wrapper.containsMatchingElement(
			<Input></Input>
		)).toBe(true);
	});

	describe('user empties data area', () => {
		const data = '';
		beforeEach(() =>
		{
			const textArea = wrapper.find('TextArea').first();
			textArea.simulate('change', {
				target: {value: data}
			});
		});

		it('should update state property `data`', () => {
			expect(wrapper.state().data).toEqual(data);
		});

		it('it should populate the input element with hash of empty data', () => {
			const input = wrapper.find('Input').first();
			expect(input.props().value).toEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
		});
	});

	describe('user enters data', () => {
		const data = 'hello';
		beforeEach(() =>
		{
			const textArea = wrapper.find('TextArea').first();
			textArea.simulate('change', {
				target: {value: data}
			});
		});

		it('should update state property `data`', () => {
			expect(wrapper.state().data).toEqual(data);
		});

		it('it should populate the input element with hash of data', () => {
			const input = wrapper.find('Input').first();
			expect(input.props().value).toEqual('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
		});
	});
});

