import { Container, Row, Col } from "react-bootstrap";
import { FaTools } from "react-icons/fa";

const UnderConstruction = () => {
  return (
        <div className="glass-effect">
        <FaTools className="icon-construction" />
        <h2 className="header2">Page Under Construction</h2>
      </div>
  );
};

export default UnderConstruction;
