import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list of todos header', () => {
  render(<App />);
  const headerElement = screen.getByText(/List of TODOs/i);
  expect(headerElement).toBeInTheDocument();
});
