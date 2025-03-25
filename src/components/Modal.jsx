import { IoClose } from "react-icons/io5";
import Field from "./Field";
import EmailField from "./EmailField";
import api from "../../api";
import { useState } from "react";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  setContacts,
  editItem,
  setEditItem,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData.entries());
    if (!editItem) {
      const response = await api.post("/contact", newContact);

      setContacts((contacts) => [...contacts, response.data]);
    } else {
      const response = await api.put(`/contact/${editItem.id}`, newContact);
      //Güncellenecek kişiyi contacts stati içerisinde de güncelle
      setContacts((contacts) =>
        contacts.map((contact) =>
          contact.id === editItem.id ? response.data : contact
        )
      );
      //editItem state ini null a çek
      setEditItem(null);
    }

    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Oluştur"} </h2>
            <button
              onClick={() => {
                setEditItem(null), setIsModalOpen(false);
              }}
            >
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />
            <Field
              value={editItem?.position}
              label="Pozisyon"
              name="position"
            />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <EmailField value={editItem?.email} label="Email" name="email" />
            <div className="buttons">
              <button
                onClick={() => {
                  setEditItem(null), setIsModalOpen(false);
                }}
              >
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default Modal;
