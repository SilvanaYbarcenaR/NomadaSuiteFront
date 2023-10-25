import { useState } from "react";
import menuL from "../../assets/image/menuList.svg";

const CardList = ({ lista }) => {
  const [cliket, setCliket] = useState(false);
  const handleClick = () => {
    setCliket(!cliket);
  };
  return (
    <div>
      <div>
        <button onClick={handleClick}>
          <img
            src={menuL}
            alt="menuList"
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            fill="none"
          />
        </button>
      </div>
      {cliket ? (
        <div>
          {lista.map((elemento, index) => (
            <div key={index}>
              {" "}
              {elemento.link ? (
                <a href={elemento.link}>{elemento.name}</a>
              ) : (
                <span>{elemento.name}</span>
              )}{" "}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardList;
