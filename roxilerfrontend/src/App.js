import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import './App.css';
import BarChartComponent from './components/BarChart';
import PieChartComponent from './components/PieChart';
import Statistics from './components/Statistics';
import Transactions from './components/Transactions';
import { Box, Card, CircularProgress } from '@mui/material';

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL'
};

const months = [
  { value: "", displayText: "Select Month" },
  { value: "01", displayText: "January" },
  { value: "02", displayText: "February" },
  { value: "03", displayText: "March" },
  { value: "04", displayText: "April" },
  { value: "05", displayText: "May" },
  { value: "06", displayText: "June" },
  { value: "07", displayText: "July" },
  { value: "08", displayText: "August" },
  { value: "09", displayText: "September" },
  { value: "10", displayText: "October" },
  { value: "11", displayText: "November" },
  { value: "12", displayText: "December" },
];

const limit = 10;

function App() {
  const [month, setMonth] = useState(months[3].value);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)

  const [apiData, setApiData] = useState({
    apiStatus: apiStatusConstants.initial,
    transactions: [],
    statistics: [],
    barChart: [],
    pieChart: [],
  });

  useEffect(() => {
    if(isLoading){
      getProductTransactionData();
    }
  }, [month, page,isLoading]);

  const getProductTransactionData = async () => {
    setApiData((prevData) => ({
      ...prevData,
      apiStatus: apiStatusConstants.inProgress
    }));
    const offset = (page - 1) * limit
    const apiUrl = `https://roxiler-systems-assignment.onrender.com/combined-response?month=${month}&s_query=${search}&limit=${limit}&offset=${offset}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    setIsLoading(false)
    if (response.ok) {
      const fetchedData = await response.json();
      setApiData((prevData) => ({
        ...prevData,
        apiStatus: apiStatusConstants.success,
        transactions: fetchedData.listTransactions,
        statistics: fetchedData.statistics,
        barChart: fetchedData.barChart,
        pieChart: fetchedData.pieChart
      }));
    }

    else {
      setApiData((prevData) => ({
        ...prevData,
        apiStatus: apiStatusConstants.failure,
      }));
    }

  };

  const onChangeMonth = event => {
    setPage(1)
    setMonth(event.target.value);
    setIsLoading(true)
  }

  const onChangeSearch = event => {
    setSearch(event.target.value);
  }

  const onKeyDownSearch = async (event) => {
    if (event.key === 'Enter') {
      setPage(1);
      await getProductTransactionData();
    }
  }

  const incrementPage = () => {
    setPage((prev) => (prev += 1));
  }

  const decrementPage = () => {
    setPage((prev) => (prev -= 1));
  }

  const renderSuccessView = () => {
    const currentMonth = months.find((each) => each.value === month);
    return (
      <Card
        variant='outlined'
        sx={{
          width: { xs: "80%", md: "750px", lg: "1500px" },
          marginY: 2,
          cursor: 'default',
          zIndex: 1,
          borderRadius: '20px'

        }}
      >
        {isLoading ? (
          <Box sx={{width:"inherit",height:"200px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress  />
          </Box>

        ) : (<>

          <Transactions
            transactionsDetails={apiData.transactions}
            page={page}
            increment={incrementPage}
            decrement={decrementPage}
          />
          <Statistics statisticsDetails={apiData.statistics} selectMonth={currentMonth} />
          <BarChartComponent barChartData={apiData.barChart} selectMonth={currentMonth} />
          <PieChartComponent pieChartData={apiData.pieChart} selectMonth={currentMonth} />
        </>)}


      </Card>
    );
  };

  const renderFailureView = () => {
    return (
      <div>
        <h1>Failed To Fetch The Data</h1>
        <button type="button" onClick={getProductTransactionData}>ReTry</button>
      </div>
    )
  }

  const renderLoadingView = () => {
    <div className='view-cotainer'>
      <TailSpin
        height="80"
        width="80"
        radius="1"
        color="blue"
        ariaLabel="tail-spin-loading"
        visible={true}
      />
    </div>
  }

  const renderApiStatus = () => {
    switch (apiData.apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.initial:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="nav-container">
        <h1 className="nav-heading">Dashboard</h1>
      </nav>
      <div className='App'>
        <div className='heading-container shadow p-3'>
          <h1>Transactions Dashboard</h1>
        </div>
        <div className='filter-container'>
          <input onChange={onChangeSearch}
            onKeyDown={onKeyDownSearch}
            value={search}
            placeholder='search transaction'
            type='search'
          />
          <select value={month} onChange={onChangeMonth}>
            {months.map(eachMonth => (
              <option key={eachMonth.value} value={eachMonth.value}>{eachMonth.displayText}</option>
            ))}
          </select>
        </div>
        {renderApiStatus()}
      </div>
    </div>
  )
}

export default App;
