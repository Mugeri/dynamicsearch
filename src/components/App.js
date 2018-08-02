import React, { Component } from 'react';
import './App.css';
import clear from '../assets/clear.svg';
import { search } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }

  componentDidMount() {
      const searchQuery = window.location.search.replace('?q=', '');
      if (searchQuery) {
        this.setState({
          searchQuery: searchQuery
        });
        this.props.search(searchQuery);
      }
      window.addEventListener('popstate', this.handleChange);
  }
  componentWillMount() {
      window.removeEventListener('popstate', this.handleChange);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.results !== prevProps.results) {
      this.displayResults(this.props.results);;
    }
  }
  handleChange(e) {
    const query = e.target.value;
    const searchQuery = window.location.search.replace('?q=', '');

    if (searchQuery === this.state.searchQuery) {
      return this.setState({
        searchQuery: query
      }, () => {
        if(query) {
          window.history.pushState({path:query},'',`?q=${query}`);
        }
        if(!query && this.state.searchQuery === '') {
          window.history.pushState({path:query},'','/');
        }
          return this.props.search(searchQuery);

      });
    }

    this.setState({
      searchQuery: searchQuery
    }, this.props.search(searchQuery));
  }

  displayResults(results) {
    if(results) {
      return results.map((result) => {
        return <p className="list" key={result.id}> {result.name} </p>
      });
    }
  }
  render() {
    const {
      results
    } = this.props;

    return (
      <div className="App">
        <div className="input-box">
          <input
              type='string'
              name='searchQuery'
              className='input'
              placeholder='Search friends...'
              onChange={this.handleChange}
              value={this.state.searchQuery}
          />
          <img className="icon" src={clear} />
        </div>
        <div className="results">
          {this.state.searchQuery !== '' && this.displayResults(results)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  results: state.results,
  error: state.index,
  isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => ({
  search: (query) => {
    dispatch(search(query));
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
