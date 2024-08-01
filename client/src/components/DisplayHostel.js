import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import backgroundImg from "../photos/frontpage.jpg"; // Replace with your background image path

import '../App.css'

const DisplayHostel = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectoption, setoption] = useState("Select Location");
  const filterHostelsByLocation = () => {
    if (selectedLocation === "All") {
      return hostels;
    } else {
      return hostels.filter((hostel) => hostel.location.toUpperCase() === selectedLocation.toUpperCase());
    }
  };
  

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setoption(location)
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostels/gethostels")
      .then((response) => {
        // Assuming hostels is nested, use flat to flatten the structure
        const flattenedHostels = response.data.hostels.flat();
        // console.log("Fetched hostels:", flattenedHostels);
        setHostels(flattenedHostels);
      })
      .catch((error) => {
        console.error("Error fetching hostels:", error);
      });
  }, []);
  console.log(hostels);
  if (!Array.isArray(hostels)) {
    console.error("Hostels is not an array:", hostels);
    return <p>No hostels to display</p>;
  }

  return (
    <>
    
    <div className="hostel-page-container">
      <div className="dropdown ml-auto">
        <Link
          className="btn btn dropdown-toggle drophere"
          to="#"
          role="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {selectoption.toUpperCase()}
        </Link>

        <ul className="dropdown-menu">
        <li>
            <Link className="dropdown-item" to="#" onClick={() => handleLocationChange("All")}>
              All
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#" onClick={() => handleLocationChange("gandipet")}>
              Gandipet
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#" onClick={() => handleLocationChange("kokapet")}>
              Kokapet
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#" onClick={() => handleLocationChange("narsingi")}>
              Narsingi
            </Link>
          </li>
        </ul>
      </div>

      {filterHostelsByLocation().map((hostel) => (
        <div className="card" key={hostel._id}>
          <img src="https://th.bing.com/th/id/R.4ea09ba2f98b50bcb6a3e6a41228e23c?rik=SE%2bWLxSCvy%2b%2fXQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-smiling-face-smiley-png-3896.png&ehk=ehhp4tikofs%2bKrhhZyjeE4KYEIBls%2fZMPPvDkgpflzs%3d&risl=&pid=ImgRaw&r=0" 
          className="card-img-left cardimage" alt="..."
          style={{ width: '10%', height: 'auto' }} />
          <div className="card-body">
            <h5 className="card-title">{hostel.hostelName}</h5>
            <p className="card-text">{hostel.description.slice(0, 10)}</p>
            <Link to={`/hostelpage/${hostel._id}`} className="btn btn-primary">
              Explore
            </Link>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default DisplayHostel;
