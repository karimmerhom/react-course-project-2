import "./home.page.style.css";
import { useState, useEffect } from "react";
import Shelf from "../components/shelf.component";
import {getAll} from "../BooksAPI";

 function HomePage() {

  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [reload, setReload] = useState(false);
  

  useEffect(() => {
    setReload(false);
    const getAllBooks = async () => {

        const response = await getAll();
        const currentlyReading = response.filter(book => "currentlyReading" === book.shelf );
        const wantToRead = response.filter(book => "wantToRead" === book.shelf );
        const read = response.filter(book => "read" === book.shelf );

        setCurrentlyReading(currentlyReading);
        setWantToRead(wantToRead);
        setRead(read);
        
        };
        
      getAllBooks();

  }, [reload]);

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                <Shelf content={currentlyReading} shelfName={"Currently Reading"} defaultValue={"currentlyReading"} setReload={setReload} />
                <Shelf content={wantToRead} shelfName={"Want to Read"} defaultValue={"wantToRead"} setReload={setReload} />
                <Shelf content={read} shelfName={"Read"} defaultValue={"read"}  setReload={setReload} />
            </div>
          </div>
          <div className="open-search">
            <a href="/Search" >Add a book</a>
          </div>
        </div>
    </div>
  );
}

export default HomePage;
