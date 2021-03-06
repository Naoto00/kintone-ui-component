import {Component} from 'react';
import PropTypes from 'prop-types';

export default class AbstractSingleSelection extends Component {
    static propTypes = {
      value: PropTypes.string,
      items: PropTypes.array,
      isVisible: PropTypes.bool,
      isDisabled: PropTypes.bool,
      onClick: PropTypes.func,
      onChange: PropTypes.func,
    }

    static defaultProps = {
      onChange: f => f
    };

    constructor(props) {
      super(props);
      this.state = {
        items: this.props.items
      };
    }

    componentWillReceiveProps({items}) {
      this.setState({items});
    }
    _getValue() {
      return this.props.value;
    }

    _getItems() {
      return this.props.items;
    }

    _setDisabledItem(value, isDisabled) {
      this.setState(prevState => {
        const newItems = [...prevState.items];
        newItems.forEach((item, i) => {
          if (item.value === value) {
            newItems[i].isDisabled = isDisabled;
          }
        });
        return {items: newItems};
      });
    }

    _handleItemClick = (item) => {
      const value = item.value;
      // eslint-disable-next-line react/no-unused-state
      this.setState({value: value});
      this.props.onChange(value);
    }

    _hasDuplicatedItems() {
      const unique = {};
      let isUnique = true;
      if (this.props.items) {
        this.props.items.forEach((val, i) => {
          if (typeof (unique[val.value]) !== 'undefined') {
            isUnique = false;
          }
          unique[val.value] = 0;
        });
      }

      return isUnique;
    }

    _hasValidValue() {
      if (this.props.value === undefined) {
        return true;
      }

      return this.props.items && this.props.items.some(item => {
        return item.value === this.props.value;
      });

    }
}