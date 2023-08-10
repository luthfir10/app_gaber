import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse } from "react-bootstrap";

import useLogout from "../../services/hooks/useLogout";

const SettingAkun = () => {
  const [navdownMenu, setnavdownMenu] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <li className="nav-item dropdown">
        <Button
          variant="link"
          className="nav-link dropdown-toggle"
          aria-controls="navbarDropdown"
          aria-expanded={navdownMenu}
          onClick={() => {
            setnavdownMenu(!navdownMenu);
          }}
        >
          <FontAwesomeIcon icon={faUserAlt} />
        </Button>
        <Collapse in={navdownMenu}>
          <ul
            id="navbarDropdown"
            className="dropdown-menu dropdown-menu-end"
            style={{ right: "5px" }}
          >
            <li>
              <button className="dropdown-item" onClick={signOut}>
                Logout
              </button>
            </li>
          </ul>
        </Collapse>
      </li>
    </>
  );
};

export default SettingAkun;
