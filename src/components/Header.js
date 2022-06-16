import React, { useState, useEffect } from "react";
// import menuLinksData from "./data/menu_links.json";
const Header = () => {
  const [menuLinksData, setMenuLinksData] = useState([]);
  const loadMenuLinksData = async () => {
    //Query API gateway
    const resp = await fetch(
      "https://hn49yz664f.execute-api.ap-southeast-1.amazonaws.com/Production/menulinks"
    );
    let jsonData = await resp.json();

    //Assign response data to our state variable
    setMenuLinksData(jsonData);
  };
  useEffect(() => {
    //Load the menu links data from the API GATEWAY
    loadMenuLinksData();
  }, []);
  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel Test</h1>
          <p>
            <a href="#welcome">
              <img
                src="https://landonhotel.com/images/misc/arrow.png"
                alt="down arrow"
              />
            </a>
          </p>
          <h2>West London</h2>
        </div>
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand">
            <a href="#welcome">
              Landon <span>Hotel</span>
            </a>
          </div>
          <ul>
            {menuLinksData.map((link) => (
              <li>
                <a className={`icon ${link.class}`} href={`${link.href}`}>
                  <span>{`${link.text}`}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
