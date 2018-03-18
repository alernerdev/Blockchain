import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  state = {
    active: this.props.active
  };

  onMenuClick = ((evt)=> {
    const menu = evt.target;
    this.setState({active: menu.name});
  });

  render() {
    let activeName = this.state.active;

    let choices = [];
    choices.push({name: 'main', value: 'Main', className: 'blue item', href: '/'});
	choices.push({name: 'hash', value: 'SHA256', className: 'green item', href: '/hashapp'});
    choices.push({name: 'block', value: 'Block', className: 'red item', href: '/blockapp'});
    choices.push({name: 'basicrouting', value: 'Basic Routing', className: 'teal item', href: '/basicroutingapp'});

    /* go over the array of menus, and which ever one is active now, mark it as such */
    return (
      <div className="ui inverted segment">
        <div className="ui menu inverted secondary pointing">
          {choices.map(({name, value, className, href}, index) => {
            return (
              <a key={index}
                className={(name == activeName) ? className + " active" : className}
                name={name}
                href={href}
                onClick={this.onMenuClick}>{value}</a>
              );
          })}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
	active: PropTypes.string
  };
