
import React from 'react'
import Book from './Book'
import './App.css'

class Bookshelf extends React.Component {
  state = {
    
  }


  render() {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {this.props.books.map((book) => {
                    return (<li key={book.id}>
                        <Book 
                            backgroundImage={"url("+book.imageLinks.thumbnail+")"}
                            bookTitle={book.title}
                            bookAuthors={book.authors}
                            updateShelf={this.props.updateShelf}
                            shelf={book.shelf}
                            book={book}
                        />
                    </li>)
                })}
            </ol>
            </div>
        </div>
    )
    }
}

export default Bookshelf
