import "./shelf.component.style.css";
import {update} from "../BooksAPI"

function Shelf({content, shelfName, defaultValue, setReload}) {

    const handleSelectChange = async (e,book) => {

           await update(book,e.target.value);
           setReload(true);
        
    }

    return(       
    <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfName}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { content.map( (book) =>
        <li key={book.id}>
          <div  className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "../icons/no-image.png"})`,
                  width: 128,
                  height: 193,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select defaultValue={defaultValue} onChange={e => handleSelectChange(e,book)}>
                  <option disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading"> Currently Reading </option>
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
  </div>)
}

export default Shelf;