import api from "../api";
import { FaHome } from "react-icons/fa";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";

function App() {
  // fetch("http://localhost:3000/contact")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  //! Yukarısı fetch() aşağısı axios

  // const eleman = {
  //   name: "Fırat ŞABAHAT",
  //   company: "Udemig Akademi",
  //   phone: "+90331 271 89 98",
  //   email: "frts@gmail.com",
  // };

  // api
  //   .get("/contact")
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    api.get("/contact").then((res) => setContacts(res.data));
  }, []);

  // Formun gönderildiğinde çalışacak fonksiyom

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target[1].value;

    const params = {
      q: query,
    };

    api.get("/contact", { params }).then((res) => setContacts(res.data));
  };
  //Silme işlemi
  const handleDelete = (id) => {
    const res = confirm("Kişiyi Silmek İstediğinizden eminmisiniz...?");

    if (res) {
      api.delete(`/contact/${id}`).then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id != id);
        setContacts(updatedContacts);
      });
    }
  };

  // Update ikonuna tıklandığında çalışacak fonk.

  const handleEdit = (contact) => {
    setIsModalOpen(true);
    setEditItem(contact);
  };

  return (
    <div className="app">
      <header>
        <h1>Rehber</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <IoIosSearch />
            </button>
            <input type="search" placeholder="Kişi aratınız..." />
          </form>
          <button className="ns">
            <IoIosMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="add">
            <IoPersonAddSharp />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      <main>
        {contacts.map((contact) => (
          <Card
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            contact={contact}
            key={contact.id}
          />
        ))}
      </main>
      <Modal
        setEditItem={setEditItem}
        editItem={editItem}
        setContacts={setContacts}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
