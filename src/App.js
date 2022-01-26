import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import ReactLoading from 'react-loading';
import Book from './Book'
import {Link, Route, Routes}  from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    //currentlyReadingBooks : [],
    //readBooks: [],
    //wantToReadBooks: [],
    books: [],
    loading : true,
    searchResult: [],
  }

  async componentDidMount(){
    const books = await BooksAPI.getAll();
    this.setState({books});
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.books !== prevState.books){
      this.setState({loading: false})
    }
  }


  updateShelf = (book,shelf) => {  
    debugger;

    BooksAPI.update(book,shelf).then( () => {
      const updatedBooks = this.state.books.filter(b => b.id !== book.id);
      if(shelf !== null || shelf === ""){
        book.shelf = shelf
        updatedBooks.push(book)
      }
      this.setState({ books: updatedBooks })
      alert("Bookshelf change is successfull")
    })
   
  }

  searchBook = (bookName) =>{
    debugger;
    if(bookName === null ||  bookName === ""){
      this.setState({searchResult: [] } );
    }else{
      this.setState({searchResult: [] } );
      BooksAPI.search(bookName).then((books) => {
        debugger;
        console.log(books)
        for(let searchedBook of books){
          for(let shelvedBook of this.state.books){
            if(searchedBook.id === shelvedBook.id){
              searchedBook.shelf = shelvedBook.shelf
            }
          }
        }
        this.setState({searchResult: books })
      }
      ).catch((error) => console.log("Could not get the searched books from API", error))
    }
  }

  render() {
    console.log(this.state.books)
    if(this.state.loading){
      
      return ( 
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}>
              <ReactLoading  type={"spin"} color={"black"} height={'6%'} width={'6%'} />
          </div>)
    }else{
      const curr = this.state.books.filter(book => book.shelf === "currentlyReading")
      const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")
      const read = this.state.books.filter(book => book.shelf === "read")

      console.log(curr)
      return (
        <div className="app">
      <Routes>
        <Route exact path='/search' element={ (
        
          
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/'>
                <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" onKeyUp={event => {this.searchBook(event.target.value)}}/>
  
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.searchResult.map((book) => {
                    return (<li key={book.id}>
                        <Book 
                            backgroundImage={book.imageLinks? "url("+book.imageLinks.thumbnail+")": null}
                            bookTitle={book.title}                        
                            shelf={book.shelf}
                            book={book}
                            bookAuthors={book.authors}
                            updateShelf={this.updateShelf}
                        />
                    </li>)
                })}
                </ol>
              </div>
            </div>
        )}/>
          
        <Route exact path='/' element={(
        
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf shelfTitle={"Currently Reading"} books={curr} updateShelf={this.updateShelf}/>
                  <Bookshelf shelfTitle={"Want to Read"} books={wantToRead} updateShelf={this.updateShelf}/>
                  <Bookshelf shelfTitle={"Read"} books={read} updateShelf={this.updateShelf}/>
                </div>
              </div>
              <div className="open-search">
              <Link to='/search'>
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </Link>
              </div>
            </div>
        
      )}/>
          </Routes>
        </div>
      )
    }
    
  }
}

export default BooksApp
