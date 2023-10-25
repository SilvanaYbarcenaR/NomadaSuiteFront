import frame from "../../assets/image/Frame.png";
import style from "./filtros.module.css";
const FiltrosSecundarios = () => {
  return (
    <div className={style.container}>
      <div>
        <div>
          <span>
            <img src={frame} alt="frame" />
            Precio
          </span>
        </div>
        <br />
        <div>
          <span>Minimo</span>
          <input type="number" name="minimo" />
        </div>
        <div>
          <span>Maximo</span>
          <input type="number" name="maximo" />
        </div>
      </div>
      <div className={style.container}>
        <div>
          <span>
            <img src={frame} alt="frame" />
            Evaluacion
          </span>
        </div>
        <div>
          <select name="" id="">
            <option value="Dezcendente">Mayor a menor</option>
            <option value="Azcendente">Menor a mayor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosSecundarios;
