import React, { Component } from "react";
import "./styles.css";
import Item from "./item";

class Search extends Component {
  state = { searchValue: "", gameItems: [], dropDownValue: "All" };
  allData = [];
  allPlatforms = new Set();
  options = [];

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.search(this.state.searchValue);
  };

  handleDropDown = (event) => {
    this.setState({ dropDownValue: event.target.value });
    this.filterPlatform(event.target.value);
  };

  sortScoreAsc = false;
  sortByScore = () => {
    let temp = this.state.gameItems;

    if (this.sortScoreAsc) {
      temp.sort((a, b) => {
        return a.score - b.score;
      });
    } else {
      temp.sort((a, b) => {
        return b.score - a.score;
      });
    }
    this.sortScoreAsc = !this.sortScoreAsc;
    this.setState({ gameItems: temp });
  };

  search = (searchInput) => {
    let temp = [];
    if (searchInput) temp = this.state.gameItems;
    else temp = this.allData;
    let temp2 = [];

    for (let i = 0; i < temp.length; i++) {
      let wo = "" + temp[i].title;
      if (wo.toLowerCase().includes(searchInput.toLowerCase())) {
        temp2.push(temp[i]);
      }
    }
    this.setState({ gameItems: temp2 });
  };

  filterPlatform = (platformName) => {
    if (platformName === "All") {
      this.setState({ gameItems: this.allData });
    } else {
      let temp2 = this.allData.filter((item) => {
        return item.platform === platformName;
      });
      this.setState({ gameItems: temp2 });
    }
  };

  componentDidMount() {
    var gamesUrl = "http://starlord.hackerearth.com/gamesext";
    fetch(gamesUrl)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        // console.log(jsonData);
        this.allData = jsonData;
        jsonData.forEach((val) => {
          this.allPlatforms.add(val.platform);
        });
        this.setState({ gameItems: jsonData });
        // console.log(this.allPlatforms);
        this.allPlatforms.forEach(val => this.options.push(val));
      });
  }

  

  render() {
    return (
      <div>

        <h1>Sapient Games Arena</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.sortByScore}>
          Sort By Score
          {this.sortScoreAsc ? (
            <i className="fontIcon fa fa-caret-down" aria-hidden="true"></i>
          ) : (
            <i className="fontIcon fa fa-caret-up" aria-hidden="true"></i>
          )}
        </button>

        <div className="select-container">
          <span className="select-header">Select Platform</span>
          <select
            className="select-box"
            value={this.state.dropDownValue}
            onChange={this.handleDropDown}
          >
            <option defaultValue value="All">
              All
            </option>

            <option value="PlayStation Vita">PlayStation Vita</option>
            <option value="iPad">iPad</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="Macintosh">Macintosh</option>

            <option value="PC">PC</option>
            <option value="iPhone">iPhone</option>
            <option value="Nintendo DS">Nintendo DS</option>
            <option value="Nintendo 3DS">Nintendo 3DS</option>
            <option value="Android">Android</option>

            <option value="Wii">Wii</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="Wii U">Wii U</option>
            <option value="Linux">Linux</option>
            <option value="PlayStation Portable">PlayStation Portable</option>

            <option value="PlayStation">PlayStation</option>
            <option value="Nintendo 64">Nintendo 64</option>
            <option value="Saturn">Saturn</option>
            <option value="Lynx">Lynx</option>
            <option value="Game Boy">Game Boy</option>

            <option value="Game Boy Color">Game Boy Color</option>
            <option value="NeoGeo Pocket Color">NeoGeo Pocket Color</option>
            <option value="Game.Com">Game.Com</option>
            <option value="Dreamcast">Dreamcast</option>
            <option value="Dreamcast VMU">Dreamcast VMU</option>

            <option value="WonderSwan">WonderSwan</option>
            <option value="Arcade">Arcade</option>
            <option value="Nintendo 64DD">Nintendo 64DD</option>
          </select>
        </div>


        {this.state.gameItems ? (
          <div className="container">
            <div className="card">
              <div className="card-item">
                <p>Title</p>
              </div>
              <div className="card-item">
                <p>Platform</p>
              </div>
              <div className="card-item">
                <p>Score</p>
              </div>
              <div className="card-item">
                <p>Genre</p>
              </div>
              <div className="card-item">
                <p>Editors Choice</p>
              </div>
              <div className="card-item">
                <p>Release Year</p>
              </div>
            </div>

            {this.state.gameItems.map((game, index) => (
              <Item key={index} data={game} />
            ))}
          </div>
        ) : (
          <p />
        )}
      </div>
      
    );
  }
}
export default Search;
