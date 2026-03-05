interface TableProps {
  data: Data[];
}

export interface Data {
  ticker: string;
  price: number;
  assetClass: string;
}

/**
 * Utility component to display a row of the table
 * 
 * @param props Data
 */
function Row(props: Data) {
  const { ticker, price, assetClass } = props;
  return (
    <tr>
      <td>{assetClass}</td>
      <td>{price}</td>
      <td>{ticker}</td>
    </tr>
  );
}

/**
 * Table to display financial data
 * 
 * @param props TableProps
 */
export default function Table(props: TableProps) {
  const { data } = props;

  if (!data.length) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <table>
      <tr>
        <th>Asset Class</th>
        <th>Price</th>
        <th>Ticker</th>
      </tr>
      {data.map((row) => (
        <Row {...row} />
      ))}
    </table>
  );
}
