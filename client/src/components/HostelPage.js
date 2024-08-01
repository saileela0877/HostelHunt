import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../App.css'
import todisplay from '../photos/smile.png'

const HostelPage = () => {
  const { id } = useParams();
  const [hostel, setHostels] = useState(null);
  useEffect(() => {
    // if (!id) {
    //   console.error("No ID provided for HostelPage");
    //   return;
    // }

    axios
      .get(`http://localhost:5000/api/hostels/hosteldetails/${id}`)

      .then((response) => {
        // console.log(response.data);
        const HostelDetails = response.data.hostel;
        console.log("Fetched hostels:", HostelDetails);
        setHostels(HostelDetails);
        console.log("In HostePage");
      })
      .catch((error) => {
        console.error("Error fetching hostels:", error);
      });
  }, [id]);


  return (
    <div className="displayhostel">
      <div className="container mt-4">
        {hostel ? (
          <div>
            <h1 className="mb-3">{hostel.hostelName}</h1>
            <img
              src="https://th.bing.com/th/id/R.4ea09ba2f98b50bcb6a3e6a41228e23c?rik=SE%2bWLxSCvy%2b%2fXQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-smiling-face-smiley-png-3896.png&ehk=ehhp4tikofs%2bKrhhZyjeE4KYEIBls%2fZMPPvDkgpflzs%3d&risl=&pid=ImgRaw&r=0"
              // src={todisplay}
              width="100" 
              height="100" 
              
              className="img-fluid mb-4"
              alt="Hostel"
            />
            <p className="mb-4">{hostel.description}</p>

            <h3>Fees</h3>
<table className="table mb-4 custom-tables">
  <thead>
    <tr>
      <th>Room Type</th>
      <th>Fee</th>
    </tr>
  </thead>
  <tbody>
    {hostel.fees.map((feeItem, index) => (
      <tr key={index}>
        <td>{feeItem.roomType}</td>
        <td>{feeItem.fee}</td>
      </tr>
    ))}
  </tbody>
</table>



            <h3>Weekly Menu</h3>
            <table className="table mb-4 custom-tables">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {hostel.weeklyMenu.map((menu, index) => (
                  <tr key={index}>
                    <th>{menu.day}</th>
                    <td>{menu.breakfast}</td>
                    <td>{menu.lunch}</td>
                    <td>{menu.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Facilities</h3>
            <ul className="list-group mb-4 custom-tables">
              {hostel.facilities.map((facility, index) => (
                <li key={index} className="list-group-item">
                  {facility}
                </li>
              ))}
            </ul>

            <h3>Contact</h3>
            <p className="mb-4">{hostel.contact}</p>

            <h3>Reviews</h3>
            <p className="mb-4">{hostel.reviews}</p>

            <h3>Photos</h3>
            <div className="row">
              {hostel.photos.map((photo, index) => (
                <div className="col-md-3 mb-3" key={index}>
                  <img
                    src={photo}
                    className="img-fluid"
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Add more sections for other details as needed */}
          </div>
        ) : (
          <p>Loading hostel details...</p>
        )}
      </div>
    </div>
  );
};

export default HostelPage;
