import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the table after a timeout', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  }, { timeout: 5000 });
});
