import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './components/App';
import Paginator from './components/Paginator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Paginator container', () => {
  const props = {
    page: 2,
    totalPages: 5,
    handlePageChange: () => true,
  };

  test('renders properly', () => {
    const wrapper = shallow(<Paginator {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('paginator has "<-Prev" btn', () => {
    const wrapper = shallow(<Paginator {...props} />);
    expect(
      wrapper
        .find('Button')
        .first()
        .text()
    ).toEqual('<-Prev');
  });

  test('paginator buttons quantity', () => {
    const nextProps = {
      ...props,
      page: 3,
    };
    const wrapper = shallow(<Paginator {...nextProps} />);
    expect(wrapper.find('Button').length).toBe(3);
  });

  test('onclick dispatches "handlePageChange", it\'s gotten from props', () => {
    const mockHandlePageChange = jest.fn();
    const newProps = {
      ...props,
      handlePageChange: mockHandlePageChange,
    };
    const wrapper = shallow(<Paginator {...newProps} />);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
  });
});
