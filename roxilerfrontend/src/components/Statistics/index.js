import "./index.css";

const Statistics = (props) => {
  const { statisticsDetails, selectMonth } = props;
  const { totalSaleAmount, soldItems, notSoldItems } = statisticsDetails;
  return (
    <div className="statistics-container">
      <h1>
        Statistics -{" "}
        {selectMonth.displayText === "Select Month" ? "Overall" : selectMonth.displayText}
      </h1>
      <table className="statistics-table shadow">
        <tbody>
          <tr>
            <td className="text-start">Total sale</td>
            <td>{Math.round(totalSaleAmount.total * 100) / 100}</td>
          </tr>
          <tr>
            <td className="text-start">Total sold item</td>
            <td>{soldItems.count}</td>
          </tr>
          <tr>
            <td className="text-start">Total not sold item</td>
            <td>{notSoldItems.count}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;