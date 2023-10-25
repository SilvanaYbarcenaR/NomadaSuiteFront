import footerInc from "../../assets/image/footerIcons/NomadaInc.png";
import world from "../../assets/image/footerIcons/world.png";
import facebook from "../../assets/image/footerIcons/facebook-svg.svg";
import twitter from "../../assets/image/footerIcons/twitter.svg";
import instagram from "../../assets/image/footerIcons/instagram.svg";
const Footer = () => {
  return (
    <div>
      <div>
        <img src={footerInc} alt="footerInc" />
      </div>
      <div>
        <div>
          <img src={world} alt="world" />
        </div>
        <span>Español</span>
      </div>
      <div>
        <span>$</span>
        <span>USD</span>
      </div>
      <div>
        <img src={facebook} alt="facebook" width="18px" height="18px" />
      </div>
      <div>
        <img src={twitter} alt="twitter" width="18px" height="18px" />
      </div>
      <div>
        <img src={instagram} alt="instagram" width="18px" height="18px" />
      </div>
    </div>
  );
};

export default Footer;
