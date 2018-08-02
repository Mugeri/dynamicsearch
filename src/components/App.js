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

    this.displayResults = this.displayResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const searchQuery = window.location.search.replace('?q=', '');
    if (searchQuery) {
      this.setState({
        searchQuery: searchQuery
      },
      this.props.search(searchQuery));
    }
    window.addEventListener('popstate', this.handleChange);
  }

  componentWillMount() {
    window.removeEventListener('popstate', this.handleChange);
  }

  displayResults(results) {
    if(results) {
      return results.map((result) => {
        return <p className="list" key={result.id}> {result.name}<span className='username'>{result.username}</span> </p>
      });
    }
  }

  handleChange(e) {
    let inputValue = e.target.value;
    const searchQuery = window.location.search.replace('?q=', '');

    if (searchQuery === this.state.searchQuery && searchQuery !== '') {
      return this.setState({
        searchQuery: inputValue
      }, () => {
        // update on typing in input
        if(inputValue) {
          window.history.pushState({path:inputValue},'',`?q=${inputValue}`);
        }
        // clear on delete in input
        if(!inputValue && this.state.searchQuery === '') {
          window.history.pushState({path:inputValue},'','/');
        }
          return this.props.search(inputValue);

      });
    }
    //when using the back and front browser buttons
    if(!inputValue) {
      inputValue = searchQuery;
      return this.setState({
        searchQuery: inputValue
      }, () => {
        return this.props.search(inputValue);
      });
    }

    //first search
    this.setState({
      searchQuery: inputValue
    }, () => {
      if(inputValue !== ''){
        window.history.pushState({path:inputValue},'',`?q=${inputValue}`);
        this.props.search(inputValue);
      }
    });
  }

  handleClear() {
    this.setState({
      searchQuery: ''
    },() => {
      window.history.pushState({},'','/');
      this.props.search('');
    })
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
          {this.state.searchQuery !== '' &&
           <img
            className="icon"
            src={clear}
            onClick={this.handleClear}
            alt='clear icon'
            />}
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
  error: state.error,
  isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => ({
  search: (searchQuery) => {
    dispatch(search(searchQuery));
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
