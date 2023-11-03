import React, { useState, useEffect } from 'react';

function App() {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4005/mergedData')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  useEffect(() => {
    const updatedFilteredStocks = stocks.filter((stock) => {
      return stock.name && stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredStocks(updatedFilteredStocks);
  }, [searchTerm, stocks]);

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(filteredStocks.length / stocksPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredStocks.length / stocksPerPage); i++) {
    pageNumbers.push(i);
  }

  const displayPageNumbers = () => {
    if (pageNumbers.length <= 7) {
      return pageNumbers.map((number) => (
        <li key={number}>
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ));
    }

    const firstPage = pageNumbers[0];
    const lastPage = pageNumbers[pageNumbers.length - 1];

    if (currentPage <= 4) {
      return [
        ...pageNumbers.slice(0, 5),
        <li key="ellipsis1">...</li>,
        lastPage,
      ].map((number) => (
        <li key={number}>
          {number === '...' ? (
            <span>{number}</span>
          ) : (
            <button onClick={() => paginate(number)}>{number}</button>
          )}
        </li>
      ));
    } else if (currentPage >= lastPage - 3) {
      return [
        firstPage,
        <li key="ellipsis2">...</li>,
        ...pageNumbers.slice(-5),
      ].map((number) => (
        <li key={number}>
          {number === '...' ? (
            <span>{number}</span>
          ) : (
            <button onClick={() => paginate(number)}>{number}</button>
          )}
        </li>
      ));
    } else {
      return [
        firstPage,
        <li key="ellipsis3">...</li>,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        <li key="ellipsis4">...</li>,
        lastPage,
      ].map((number) => (
        <li key={number}>
          {number === '...' ? (
            <span>{number}</span>
          ) : (
            <button onClick={() => paginate(number)}>{number}</button>
          )}
        </li>
      ));
    }
  };

  return (
    <div>
      <center>
        <input
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "30%" }}
        />
      </center>

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Icon</th>
              <th>$USD</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((stock, index) => (
              <tr key={stock._id}>
                <td>{index + 1 + indexOfFirstStock}</td>
                <td>{stock.name}</td>
                <td>
                  {stock.iconData.map((icon, iconIndex) => (
                    <li key={iconIndex} style={{listStyle:"none"}}>
                      <img src={icon.url} alt={`Icon ${iconIndex}`} />
                    </li>
                  ))}
                </td>
                <td>{stock.volume_1day_usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <ul className="pagination">
  <li>
    <button
      className="pagination-button"
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
  </li>
  {displayPageNumbers()}
  <li>
    <button
      className="pagination-button"
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === Math.ceil(filteredStocks.length / stocksPerPage)}
    >
      Next
    </button>
  </li>
</ul>

      </div>
    </div>
  );
}

export default App;
