import "./styles.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
uuidv4();

export default function App() {
  // logic

  const [udata, setUData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const API = "https://6218c7ed1a1ba20cbaab1b1f.mockapi.io/api/notes";

  const getData = () => {
    const localData = JSON.parse(localStorage.getItem("note"));
    if (localData) {
      setUData(localData);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const udata_object = { id: uuidv4(), title, content };
    console.log(udata_object);
    setUData([...udata, udata_object]);
    localStorage.setItem("note", JSON.stringify([...udata, udata_object]));
    setTitle("");
    setContent("");
  }

  // getData();

  // return
  return (
    <div className="text-center text-xl">
      <h1 className="font-semibold text-4xl">Notes</h1>
      <h2>Keep all your notes here!</h2>
      <div className="flex justify-center my-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-start"
        >
          <label className="text-lg">Title</label>
          <input
            className="border-black border-2 rounded"
            type="text"
            name=""
            id=""
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <label>Content</label>
          <input
            className="border-black border-2 rounded"
            type="text"
            name=""
            id=""
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          />
          <button
            className="bg-green-200 rounded px-2 py-1 my-1 w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <button onClick={filterPinnedData}>filterPinnedData</button> */}
      <div className="flex flex-wrap justify-center border-t-2 py-4 border-gray-300">
        {udata.map((note) => {
          return (
            <div
              className="border-2 m-1 p-2 border-black rounded text-left"
              key={note.id}
            >
              <p>Title: {note.title}</p>
              <p>Content: {note.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
