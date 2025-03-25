import { AiFillEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi2";
import { MdPhoneEnabled } from "react-icons/md";
import { GrMail } from "react-icons/gr";

const Card = ({ contact, handleDelete, handleEdit }) => {
  const [name = "", surname = ""] = contact.name.split(" ");

  return (
    <div className="card">
      <div className="buttons">
        <button onClick={() => handleEdit(contact)}>
          <AiFillEdit />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <HiOutlineTrash />
        </button>
      </div>
      <h1>
        {name[0] || ""} {surname[0] || ""}
      </h1>
      <h3>{contact.name} </h3>
      <p>{contact.position}</p>
      <p>{contact.company} </p>

      <div className="bottom">
        <div>
          <span>
            <MdPhoneEnabled />
          </span>
          <span>0{contact.phone}</span>
        </div>
        <div>
          <span>
            <GrMail />
          </span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
