import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      © 2026 ATLA Universe | Fan Page of{" "}
      <a href="https://www.avatarstudiosofficial.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      >
        Avatar Studios
      </a> 
      {" "} | Designed by nisarpn | All Rights Reserved
    </footer>
  );
}

export default Footer;