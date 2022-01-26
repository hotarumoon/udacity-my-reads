import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {

  render() {
    console.log(this.props.shelf)
    return (
        <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: this.props.backgroundImage}}></div>
        <div className="book-shelf-changer">
            <select value= {this.props.shelf ? this.props.shelf  : "none"} 
                    onChange={(event) => {
                        this.props.updateShelf(this.props.book, event.target.value)}
                    }>
                <option value="move" disabled >Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors ? this.props.bookAuthors.join(' & ') : "Unknown Author" }</div>
        </div>
          )
        }
    }
    
    export default Book
    