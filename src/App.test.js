import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Snapshot da Lista", () => {
	const div = document.createElement('div');
  const component = ReactDOM.render(<App />, div);

  expect(component).toMatchSnapshot();
  // Ativando modal Add
  component.toggleModal();
  // re-rendering
  expect(component).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);

  // Ativando modal Remove
  ReactDOM.render(<App />, div);
  component.toggleModalDelete();
  // re-rendering
  expect(component).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});