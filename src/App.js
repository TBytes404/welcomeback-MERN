import React, { useState, useEffect } from "react";
import "./styles.css";
import GuestsSelection from "./components/GuestsSelection";


import {
  FaUserAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function App() {
  const [hotels, setHotels] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [showAdditionalHotels, setShowAdditionalHotels] = useState(false);

  useEffect(() => {
    fetchHotels();
    fetchFeaturedHotels();
  }, []);

  

  const fetchHotels = () => {
    fetch("hotels.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  };

  const fetchFeaturedHotels = () => {
    fetch("hotels.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeaturedHotels(data);
      })
      .catch((error) => {
        console.error("Error fetching featured hotels:", error);
      });
  };

  const handleShowAdditionalHotels = () => {
    setShowAdditionalHotels(!showAdditionalHotels);
  };

  

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header>
      <div className="MyComponent">
          <div className="container">
            <img
              src="https://i.postimg.cc/Wb8YRJWM/wbreactlogo.png"
              alt="logo"
              className="logo-img"
            />
            <div className="logo">welcomeback.com</div>
            <nav style={{ position: "relative", justifyContent: "flex-end" }}>
              <ul>
                <li>
                  <a href="#">
                    <FaUserAlt /> Login
                  </a>
                </li>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">Hotels</a>
                </li>
                <li>
                  <a href="#rooms">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact us</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <section className="hero">
        <div className="hero-content">
            <h1 style={{ color: "white" }}>Find Your Perfect Hotel</h1>
            <p style={{ color: "rgb(255, 186, 10)" }}>
              Explore hotels around North Bengal
            </p>
            <div class="group">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>

              <input
                id="query"
                class="input"
                type="search"
                placeholder="Search hotels..."
                name="searchbar"
              />
            </div>
            <div className="glass">
              <div className="dob-container">
                <h4 className="dob-label">Check in:</h4>
                <input
                  type="datetime-local"
                  id="checkin"
                  className="dob-input"
                />
              </div>
              <div className="bod-container">
                <h4 className="bod-label">Check out:</h4>
                <input
                  type="datetime-local"
                  id="checkout"
                  className="bod-input"
                />
              </div>
              <GuestsSelection />
            </div>
            <br></br>
            <button id="search" className="button-77">
              Search
            </button>
          </div>
        </section>

        <section id="about" className="about">
        <div className="container-about">
            <h2>About Us</h2>
            <p>
              welcomeback.com helps you find the best hotels at the best prices
              around North Bengal.
              <br />
              Your comfort is our priority.
            </p>
          </div>
        </section>

        <section id="rooms" className="rooms">
          <div className="container-fh">
            <h2 style={{ color: "white" }}>Featured Hotels</h2>
            <div className="room-list">
              {featuredHotels.map((hotel) => (
                <div key={hotel._id} className="room">
                  <img src={hotel.imageUrl} alt={hotel.name} />
                  <h3>{hotel.name}</h3>
                  <p>{hotel.description}</p>
                  <button className="button-77">Book now!</button>
                </div>
              ))}
            </div>
          </div>
          <div className="additional-hotels-container">
            <br />
            <br />
            <br />
            <button
              className="button-77"
              role="button"
              onClick={handleShowAdditionalHotels}
              style={{
                display: "block",
                margin: "0 auto",
              }}
            >
              Load more Hotels
            </button>
            {showAdditionalHotels && (
              <div className="container-fh">
                <h2 style={{ color: "white" }}>More Hotels in your Area</h2>
                <div className="room-list">
                  {hotels.map((hotel) => (
                    <div key={hotel._id} className="room">
                      <img src={hotel.imageUrl} alt={hotel.name} />
                      <h3>{hotel.name}</h3>
                      <p>{hotel.description}</p>
                      <button className="button-77">Book now!</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
      <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon_item">
            <a className="social-icon_link" href="#">
              <FaFacebookF />
            </a>
          </li>
          <li className="social-icon_item">
            <a className="social-icon_link" href="#">
              <FaTwitter />
            </a>
          </li>
          <li className="social-icon_item">
            <a className="social-icon_link" href="#">
              <FaLinkedinIn />
            </a>
          </li>
          <li className="social-icon_item">
            <a className="social-icon_link" href="#">
              <FaInstagram />
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu_item">
            <a className="menu_link" href="#">
              Home
            </a>
          </li>
          <li className="menu_item">
            <a className="menu_link" href="#">
              About wc
            </a>
          </li>
          <li className="menu_item">
            <a className="menu_link" href="#">
              Services
            </a>
          </li>
          <li className="menu_item">
            <a className="menu_link" href="#">
              Team
            </a>
          </li>
          <li className="menu_item">
            <a className="menu_link" href="#">
              Contact
            </a>
          </li>
        </ul>
        <p>&copy;2024 welcomeback.com | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;