import { React, Component } from "react";
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import App from '../App';

export default class Book extends Component{

    state = {
        books: [],
        lowInd: 0,
        highInd: 10
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

    render(){
        return( 
            this.state.books.slice(this.state.lowInd, this.state.highInd).map((book) => (
            <center>
              <Card style={{ width: '21rem' }} key={book.title}>
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
          ))
        )
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