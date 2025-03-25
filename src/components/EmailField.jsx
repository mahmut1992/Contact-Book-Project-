import { useEffect, useRef, useState } from "react";

const EmailField = ({ label, name, value }) => {
  const inputFieldRef = useRef();
  const isIncludes = (value) => {
    !value.includes("@") && value.trim()
      ? setIsEmailErr(true)
      : setIsEmailErr(false);
  };
  useEffect(() => {
    isIncludes(inputFieldRef.current.value);
  }, [value]);
  const [isEmailErr, setIsEmailErr] = useState(false);

  return (
    <div className="field">
      <label>{label} </label>
      <input
        ref={inputFieldRef}
        onChange={(e) => {
          isIncludes(e.target.value);
        }}
        type="text"
        name={name}
        defaultValue={value}
      />
      {isEmailErr && "Hatalı giriş yaptınız"}
    </div>
  );
};
export default EmailField;
