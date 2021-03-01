import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import { withBookstoreService } from "../hoc";
import { fetchBooks, bookAddedToCart } from "../../actions";
import compose from "../../utils";
import './book-list.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

const BookList = ({books, onAddedToCart}) => {
  return (
    <ul className="book-list">
      {
        books.map((book, index) => {
          return (
            <li key={index}><BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} /></li>
          )
        })
      }
    </ul>
  )
}

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const {books, isLoading, error, onAddedToCart} = this.props;

    if (isLoading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return (
      <BookList books={books} onAddedToCart={onAddedToCart} /> 
    )
  }
}

const mapStateToProps = ({bookList: {books, isLoading, error}}) => {
  return {
    books,
    isLoading,
    error
  }
}

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
  
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService) ,
    onAddedToCart: bookAddedToCart,
  }, dispatch)
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)