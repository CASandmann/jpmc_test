import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from './Table';
import data from './sampleData.json';

it("Can be sorted by asset class", async () => {
  render(<Table data={data} />);
  const dataTable = screen.getByTestId('data-table');
  expect(dataTable).toBeInTheDocument();
  await userEvent.click(screen.getByText(/asset class/i));
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(0);
  const lastEqIndex = screen.getAllByText(/equities/i).length - 1;
  const lastMacroIndex = screen.getAllByText(/macro/i).length - 1;
  expect(screen.getAllByText(/equities/i)[lastEqIndex].compareDocumentPosition(screen.getAllByText(/macro/i)[0])).toEqual(Node.DOCUMENT_POSITION_FOLLOWING)
  expect(screen.getAllByText(/macro/i)[lastMacroIndex].compareDocumentPosition(screen.getAllByText(/credit/i)[0])).toEqual(Node.DOCUMENT_POSITION_FOLLOWING)
})
