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
  const [ sort, setSort ] = useState<SortType | null>(null);

  const clickAssetClass = useCallback(() => {
    if (sort === SortType.AssetClass) {
      setSort(null);
    } else {
      setSort(SortType.AssetClass);
    }
  }, [sort]);
  const clickPrice = useCallback(() => {
    if (sort === SortType.Price) {
      setSort(null);
    } else {
      setSort(SortType.Price);
    }
  }, []);
  const clickTicker = useCallback(() => {
    if (sort === SortType.Ticker) {
      setSort(null);
    } else {
      setSort(SortType.Ticker);
    }
  }, []);

  if (!data.length) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  const sortedData = sort ? data.slice().sort((a, b) => {
    if (sort === SortType.AssetClass) {
      if (a.assetClass === "Credit") return 1;
      else if (b.assetClass === "Credit") return -1;
      else if (a.assetClass === "Macro") return 1;
      else if (b.assetClass === "Macro") return -1;
    } else if (sort === SortType.Price) {
      return b.price - a.price;
    } // (sort === SortType.Ticker)
    return a.ticker > b.ticker ? 1 : -1;
  }) : data;

  return (
    <table className="data-table" data-testid="data-table">
      <thead>
        <tr className="header row">
          <th onClick={clickAssetClass}>Asset Class{sort === SortType.AssetClass ? " ↓" : ""}</th>
          <th onClick={clickPrice}>Price{sort === SortType.Price ? " ↓" : ""}</th>
          <th onClick={clickTicker}>Ticker{sort === SortType.Ticker ? " ↓" : ""}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <Row key={row.ticker} {...row} />
        ))}
      </tbody>
    </table>
  );
}
