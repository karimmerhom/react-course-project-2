import { useState, useEffect } from "react";
import { update, search} from "../BooksAPI";
import "./search.page.style.css";

function SearchPage() {


    const [searchedBooks, setSearchedBooks] = useState([]);

    useEffect(() => {
            
    }, [searchedBooks])

    const handleChangeSearchField = async (e) => {


          const searched = await search(e.target.value , 5);

          if(e.target.value === "")
          {
            setSearchedBooks([]); 
          }

          else if(!searched.error)
          {
             setSearchedBooks(searched);  
          }
          else{
            setSearchedBooks([]);
          }

      }

      const handleSelectChange = async (e,book) => {
           await update(book,e.target.value);
    }

    return(
        <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            href="/"
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={handleChangeSearchField}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {searchedBooks.map( (book) =>
       
                  <li key={book.id}>
                     
                    <div key={book.id} className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            backgroundSize: "fit",
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "../icons/no-image.png"})`,
                            width: 128,
                            height: 193,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                        
                          <select defaultValue={book.shelf ? book.shelf : "none"} onChange={e => handleSelectChange(e,book)}>
                            <option value="moveTo" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors ? book.authors : ""}</div>
                    </div>
                  </li>
                  )}
          </ol>
        </div>
      </div>
    )
}

export default SearchPage;