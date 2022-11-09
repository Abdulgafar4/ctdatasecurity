import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import {
	Nav,
	NavbarContainer,
	NavLogo,
	NavIcon,
	MobileIcon,
	NavMenu,
	NavLinks,
	NavItem,
} from './NavbarStyles.js';
import { useLocation, useHistory } from 'react-router-dom';
import { data, datas } from '../../data/NavbarData';

const Navbar = () => {
	const [show, setShow] = useState(false);
	const [items, setData] = useState("");

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem("dataKey"));
      if (items) {
        setData(items);
      }
    }, []);

	// const res = items.map(item => item.response)
	// console.log(res)

	let history = useHistory();
	let location = useLocation();

	const handleClick = () => {
		setShow(!show);
	};

	const scrollTo = (id) => {
		const element = document.getElementById(id);

		element.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const closeMobileMenu = (to, id) => {
		if (id && location.pathname === '/') {
			scrollTo(id);
		}

		history.push(to);
		setShow(false);
	};

	return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src="./assets/logo.png" alt="logo" />
            Clevertag
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
          <NavMenu show={show}>
            {(window.location.pathname === "/" &&
              items.description === "Success") ||
            (window.location.pathname === "/pricing" &&
              items.description === "Success")
              ? datas.map((el, index) => (
                  <NavItem key={index}>
                    <NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
                      {el.text}
                    </NavLinks>
                  </NavItem>
                ))
              : data.map((el, index) => (
                  <NavItem key={index}>
                    <NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
                      {el.text}
                    </NavLinks>
                  </NavItem>
                ))}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
