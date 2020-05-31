import React, { Component } from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

   state = {
    books: [],
    lowInd: 0,
    highInd: 10,
    isDisabled: false
   }

  componentDidMount() {
    fetch('https://servicepros-test-api.herokuapp.com/api/v1/books')
    .then(res => res.json())
    .then((data) => {
    this.setState({ books: data.sort(sortLetters("title"))})
      console.log(this.state.books)
    })
    .catch(console.log)
  } 

  handleTitle = () => {
    this.setState({ 
      books: this.state.books.sort(sortLetters("title")),
      lowInd: 0,
      highInd: 10
    })
  }

  handleAuthor = () => {
    this.setState({ 
      books: this.state.books.sort(sortLetters("author")),
      lowInd: 0,
      highInd: 10
    })
  }

  handleISBN = () => {
    this.setState({ 
      books: this.state.books.sort(function(a, b){return a.isbn-b.isbn}),
      lowInd: 0,
      highInd: 10
    })
  }

  //Sorts by oldest.
  handleYearOld = () => {
    this.setState({
      books: this.state.books.sort(function(a, b){return a.year-b.year}),
      lowInd: 0,
      highInd: 10
    })
  }

  //Sorts by newest.
  handleYearNew = () => {
    this.setState({
      books: this.state.books.sort(function(a, b){return b.year-a.year}),
      lowInd: 0,
      highInd: 10
    })
  }

  handleLoadMore = () => {
    this.setState({
      highInd: this.state.highInd + 10,
    })
    var count = Object.keys(this.state.books).length;
    if(this.state.highInd >= (count - 10)){
      console.log("higher than count");
        this.setState({
          isDisabled: true
        })
    }
  }

  render() {
    return(
      <div>
          <center><h1>Levi's Library</h1></center>
          <center>
              <p>Sort by:</p>
              <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary" onClick={ this.handleTitle }>Title</Button>
                  <Button variant="secondary" onClick={ this.handleAuthor }>Author</Button>
                  <Button variant="secondary" onClick={ this.handleISBN }>ISBN</Button>
                  <Button variant="secondary" onClick={ this.handleYearOld }>Oldest</Button>
                  <Button variant="secondary" onClick={ this.handleYearNew }>Newest</Button>
              </ButtonGroup>
          </center>
          <br />
          {this.state.books.slice(this.state.lowInd, this.state.highInd).map((book) => (
            <center>
              <Card style={{ width: '21rem'}} key={book.title}>
                  <center>
                      <Card.Body>
                          <Card.Img src={"http://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg"}/>
                          <Card.Title>{book.title}</Card.Title>
                          <Card.Subtitle>{book.author}</Card.Subtitle>
                          <Card.Text>Published: {book.year}, ISBN: {book.isbn}</Card.Text>
                          <a href= {"https://www.amazon.com/s?k=" + book.title.replace(' ', '+') + " by " + book.author + "&ref=nb_sb_noss_1"}>
                            <Button variant="secondary">Order Book</Button>
                          </a>
                      </Card.Body>
                  </center>
              </Card>
              <br />
            </center>
          ))}
          <center>
            <Button variant="secondary" onClick={ this.handleLoadMore } disabled={ this.state.isDisabled }>Load more</Button> <Button variant="secondary" onClick={scrollToTop}>To top</Button>
          </center>
          <br />
      </div>    
    );
  }
}

function sortLetters(property) {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder === -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

export default App;