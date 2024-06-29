import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { Box, Card, CardContent, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';

const Transactions = (props) => {
  const { transactionsDetails, page, increment, decrement } = props;
  console.log(props);
  const { transactions, total } = transactionsDetails;

  const[currentpage,setPage]=useState(0);
  const[rowsPerPage,setRowsPerPage]=useState(2)
  const incrementPage = () => {
    increment();
  };
  const decrementPage = () => {
    decrement();
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const renderTableData = () => {
    return (
      <>

        <Card
          variant="outlined"
          sx={{
            width: { xs: "80%", md: "750px", lg: "1500px" },
            margin: "auto",
            marginY: 2,
            cursor: 'default',
            zIndex: 1,
            borderRadius: '20px'

          }}>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              // backgroundColor: '#101010',
              borderRadius: '20px'
            }}
          >
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "space-between", margin: 1, color: 'white' }}
            >

              <TableContainer component={Paper} sx={{ marginBottom: '10px', marginTop: '5px' }}>

                <Table size="small" aria-label="simple table" sx={{ background: '#323232' }}>
                  <TableHead sx={{ padding: '20px', color: 'white' }}>
                    <TableRow sx={{ padding: '20px' }}>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">ID</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Title</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Description</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Price</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Category</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Sold</TableCell>
                      <TableCell sx={{ color: "white", padding: '20px' }} align="center">Images</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {transactions.slice(currentpage * rowsPerPage, currentpage * rowsPerPage + rowsPerPage).map((e, idx) => (
                      <TableRow key={idx} sx={{ backgroundColor: idx % 2 === 0 ? '#343a40' : '#212529' }}>
                        <TableCell align="left" sx={{ color: "white" }}>{e.id}</TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>{e.title}</TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>{e.description}</TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>{e.price.toFixed(2)}</TableCell>
                        <TableCell align="left" sx={{ color: "white" }}>{e.category}</TableCell>
                        {console.log(new Date(e.dateOfSale).getMonth() + 1)}
                        <TableCell align="left">
                          {e.sold ? (
                            <Chip label="Sold" sx={{ background: "green", color: "white", width: "70px" }} />
                          ) : (
                            <Chip label="Unsold" sx={{ background: "red", color: "white", width: "70px" }} />
                          )}


                        </TableCell>
                        <TableCell align="left">


                          <Box component={"img"} src={e.image}
                            sx={{
                              height: "100px",
                              width: "150px",
                              pt: "3px",
                            }} /></TableCell>

                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </TableContainer>


            </Box>

            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={currentpage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </CardContent>



        </Card>

        {/* <div className="table-container shadow mb-1 rounded">
          <table>
            <thead>
              <tr>
                <th className="border-for-table-bottom">ID</th>
                <th className="border-for-table-left">Title</th>
                <th className="border-for-table-left">Description</th>
                <th className="border-for-table-left">Price</th>
                <th className="border-for-table-left">Category</th>
                <th className="border-for-table-left">Sold</th>
                <th className="border-for-table-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((eachData) => (
                <tr key={eachData.id}>
                  <td className="border-for-table-top border-for-table-right">{eachData.id}</td>
                  <td className="border-for-table-top border-for-table-right">{eachData.title}</td>
                  <td className="border-for-table-top border-for-table-right text-start">{eachData.description}</td>
                  <td className="border-for-table-top border-for-table-right">{Math.round(eachData.price * 100) / 100}</td>
                  <td className="border-for-table-top border-for-table-right">{eachData.category}</td>
                  <td className="border-for-table-top border-for-table-right">{eachData.sold ? "True" : "False"}</td>
                  <td className="border-for-table-top ">
                    <img
                      src={eachData.image}
                      alt="product"
                      className="product-img"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <p>Page No: {page}</p>
          <div>
            <button
              type="button"
              onClick={incrementPage}
              disabled={page === Math.ceil(total.total / 10)}
            >
              Next
            </button>
            <span> - </span>
            <button type="button" onClick={decrementPage} disabled={page === 1}>
              Previous
            </button>
          </div>
          <p>Per Page: 10</p>
        </div> */}
      </>
    );
  };
  const renderNoData = () => {
    return (
      <div>
        <h1>No Transactions</h1>
      </div>
    );
  };
  return (
    <div>
      {transactions.length > 0 ? renderTableData() : renderNoData()}
    </div>
  );
};

export default Transactions;