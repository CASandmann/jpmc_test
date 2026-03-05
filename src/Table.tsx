import { useCallback, useState } from "react";

interface TableProps {
  data: Data[];
}

enum SortType {
  AssetClass = "assetClass",
  Price = "price",
  Ticker = "ticker"
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
    <tr className={`row asset-${assetClass}`}>
      <td>{assetClass}</td>
      <td className={price >= 0 ? "positive-price" : "negative-price"}>{price}</td>
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
  const [ sort, setSort ] = useState<SortType>();

  const clickAssetClass = useCallback(() => {
    setSort(SortType.AssetClass);
  }, []);
  const clickPrice = useCallback(() => {
    setSort(SortType.Price);
  }, []);
  const clickTicker = useCallback(() => {
    setSort(SortType.Ticker);
  }, []);

  if (!data.length) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  const sortedData = sort ? data.sort((a, b) => {
    if (sort === SortType.AssetClass) {
      if (a.assetClass === "Credit") return 1;
      else if (b.assetClass === "Credit") return -1;
      else if (a.assetClass === "Macro") return 1;
      else if (b.assetClass === "Macro") return -1;
    } else if (sort === SortType.Price) {
      return b.price - a.price;
    }// (sort === SortType.Ticker)
    return a.ticker > b.ticker ? 1 : -1;
  }) : data;

  return (
    <table className="data-table">
      <tr className="header row">
        <th onClick={clickAssetClass}>Asset Class</th>
        <th onClick={clickPrice}>Price</th>
        <th onClick={clickTicker}>Ticker</th>
      </tr>
      {sortedData.map((row) => (
        <Row {...row} />
      ))}
    </table>
  );
}
