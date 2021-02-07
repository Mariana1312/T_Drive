import React, { Component } from 'react';
import './App.css';
import Content from './components/Content';
import SearchID from './components/SearchID'
import { readString } from "react-papaparse";
import csvFile from './csvFile/taxi100.csv'
import EditRow from './components/EditRow'
import saveFile from 'save-as-file';
import styles from '../src/App.module.css'
import Pagination from "react-js-pagination";


class App extends Component {

  constructor() {
    super()
    this.state = {
      columnDefs: ["Driver_ID", "TimeStamp", "Latitude", "Longtitude", "Notes"],
      rowData: [],
      activePage: 1,
      shownRows: []
    };
    this.insertData("");
  }

  handlechange = (typedText) => {
    console.log(typedText);
  }

  insertData = (id) => {
    let data =
      fetch(csvFile)
        .then((r) => r.text())
        .then((text) => {
          data = readString(text);
          let filteredData = [];
          data.data.forEach(d => {
            if (d.length < 5) d.push("");
            id !== "" && d[0] == id && filteredData.push(d)
          })
          if (id !== "" && filteredData.length == 0) alert("No data found")
          let z = filteredData
          let rowsData = filteredData.length > 0 ? filteredData : data.data.slice(0, data.data.length - 1)
          this.setState({
            rowData: rowsData,
            shownRows: rowsData.slice(0, 50)
          })
        })
  }


  saveExcel = (rowsData) => {
    let csvContent = rowsData.map(e => e.join(",")).join("\n");
    const file = new File([csvContent], { type: 'data:text/csv;charset=utf-8' });
    saveFile(file, '1.csv');
  }


  submitSearch = (id) => {
    this.insertData(id);
  }


  submitNote = (rowNum, valueNote) => {
    let data = this.state.shownRows;
    data[rowNum][4] = valueNote;
    this.saveExcel(data);
    this.setState({ shownRows: data })
  }


  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    if (pageNumber === 1) {
      this.setState({ shownRows: this.state.rowData.slice(0, 50) })
    }
    else {
      this.setState({ shownRows: this.state.rowData.slice((pageNumber - 1) * 50 + 1, (pageNumber * 50)) })
    }
    this.setState({ activePage: pageNumber });
  }



  render() {

    return (

      <div className={styles.App} >
        <div className={styles.searchDiv}>
          <SearchID state={this.state} handlechange={this.handlechange} submitSearch={this.submitSearch} />
        </div>

        <div className={styles.contentDiv} >
          <div className={styles.table}>
            <Content state={this.state} />
          </div>

          <div className={styles.notes}>
            {this.state.shownRows.map((n, index) => <EditRow state={this.state} submitNote={this.submitNote} handlechange={this.handlechange} row={index} />)}
          </div>
        </div>

        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={50}
            totalItemsCount={this.state.rowData.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>


      </div>
    );
  }
}

export default App;
