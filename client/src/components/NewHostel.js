// import React from 'react'

// const NewHostel = ()=> {
//   return (
//     <>
//     <div class="register_container">
//         <form className = 'container my-5' onSubmit={onSubmit}>
//         <h1>Create new Hostel</h1>
//             <div className="mb-3 x">
//                 <label htmlFor="hostelname" className="form-label my-2">Hostel Name (unique)</label>
//                 <input name = 'username' type = 'text' className="form-control" id="hostelname" value={credentials.hostelname} onChange = {onChange}/>
//             </div>
//             <div className="mb-3">

//                 <label htmlFor="locationname" className="form-label">Location</label>
//                 <input name = 'location' type="text" className="form-control" id="location" value={credentials.email} aria-describedby="emailHelp" onChange = {onChange}/>
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input name = 'password' type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange = {onChange}/>
//             </div>
//             <div className='role_c'>
//             <label htmlFor="role">Role:</label>
//             <select name="role" onChange={onChange} className='mx-2 py-1'>
//               <option value="User">User</option>
//               <option value="Hoste Owner">Hostel Owner</option>
//             </select>

//             <button type="submit" className="btn btn-primary my-2">Submit</button>
//             </div>
//         </form>

//         </div>
//     </>

//   )
// }

// export default NewHostel

import React, { useState, useEffect} from "react";
import axios from "axios";

const NewHostel = () => {
  const [currentuserId, setuserId] = useState();

  useEffect(() => {
    const fetchUserAndSetCredentials = async () => {
      try {
        const config = {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        };
        const res = await axios.get('http://localhost:5000/api/auth/getuser', config);
        const user = res.data._id;
  
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          createdBy: user,
        }));
  
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };
  
    fetchUserAndSetCredentials();
  }, [currentuserId]); 
  

  const [credentials, setCredentials] = useState({
    hostelName: "",
    location: "",
    fees: [],
    weeklyMenu: [
      { day: "Monday", breakfast: "", lunch: "", dinner: "" },
      { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
      { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
      { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
      { day: "Friday", breakfast: "", lunch: "", dinner: "" },
      { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
      { day: "Sunday", breakfast: "", lunch: "", dinner: "" },
    ],
    facilities: [],
    DisplayPic: "",
    photos: [],
    description: "",
    contact: "",
    reviews: "",
    createdBy:currentuserId,
    role: "User", // Add a default role
  });


  // const getUser = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'auth-token': localStorage.getItem('token'),
  //       },
  //     };
  //     const res = await axios.get('http://localhost:5000/api/auth/getuser', config);
  //     const user = res.data._id;
  //     setuserId(user);
  //     console.log(currentuserId)
  //   } catch (error) {
  //     console.error('Error getting user:', error);
  //   }
  // };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFee = (e, index, field) => {
    const { value } = e.target;
    const updatedFees = [...credentials.fees];
    updatedFees[index][field] = value;

    setCredentials({
      ...credentials,
      fees: updatedFees,
    });
  };

  const onWeeklyMenuChange = (day, mealType, value) => {
    const updatedWeeklyMenu = credentials.weeklyMenu.map((menu) => {
      if (menu.day === day) {
        return { ...menu, [mealType]: value };
      }
      return menu;
    });

    setCredentials({
      ...credentials,
      weeklyMenu: updatedWeeklyMenu,
    });
  };

  const addFeeField = () => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      fees: [...prevCredentials.fees, { roomType: "", fee: "" }],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hostels/createhostel",
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'auth-token':localStorage.getItem('token'),
          },
        }
      );
      console.log("Hostel created successfully", response.data);

      // Clear the form after successful submission
      // setCredentials({
      //   hostelName: "",
      //   location: "",
      //   fees: [],
      //   weeklyMenu: [
      //     { day: "Monday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Friday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
      //     { day: "Sunday", breakfast: "", lunch: "", dinner: "" },
      //   ],
      //   facilities: [],
      //   DisplayPic: "",
      //   photos: [],
      //   description: "",
      //   contact: "",
      //   reviews: "",
      //   role: "User", // Reset to default role
      // });
      alert("Details submitted");
    } catch (error) {
      console.error("Error creating hostel", error);
    }
  };

  return (
    <>
      <div className="register_container">
        <form className="container my-5" onSubmit={onSubmit}>
          <h1>Create new Hostel</h1>
          <div className="mb-3">
            <label htmlFor="hostelName" className="form-label my-2">
              <h5><b>Hostel Name (unique)</b></h5>
            </label>
            <input
              name="hostelName"
              type="text"
              className="form-control"
              id="hostelName"
              value={credentials.hostelName}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              <h5><b>Location</b></h5>
            </label>
            <input
              name="location"
              type="text"
              className="form-control"
              id="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fees" className="form-label">
              <h5><b>Fees</b></h5>
            </label>
            {/* Assuming fees is a Map with key-value pairs */}
            <table className="table">
              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(credentials.fees) &&
    credentials.fees.map((fee, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        name={`roomType_${index}`}
                        type="text"
                        placeholder="Room Type"
                        className="form-control"
                        value={fee.roomType}
                        onChange={(e) => onChangeFee(e, index, "roomType")}
                      />
                    </td>
                    <td>
                      <input
                        name={`fee_${index}`}
                        type="text"
                        placeholder="Fee"
                        className="form-control"
                        value={fee.fee}
                        onChange={(e) => onChangeFee(e, index, "fee")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-success"
              onClick={addFeeField}
            >
              + Add Room
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="weeklyMenu" className="form-label">
              <h5><b>Weekly Menu</b></h5>
            </label>
            {credentials.weeklyMenu.map((menu) => (
              <div key={menu.day} className="mb-2">
                <label>{menu.day}</label>
                <input
                  name={`weeklyMenu_${menu.day}_breakfast`}
                  type="text"
                  placeholder="Breakfast"
                  className="form-control mx-2"
                  value={menu.breakfast}
                  onChange={(e) =>
                    onWeeklyMenuChange(menu.day, "breakfast", e.target.value)
                  }
                />
                <input
                  name={`weeklyMenu_${menu.day}_lunch`}
                  type="text"
                  placeholder="Lunch"
                  className="form-control mx-2"
                  value={menu.lunch}
                  onChange={(e) =>
                    onWeeklyMenuChange(menu.day, "lunch", e.target.value)
                  }
                />
                <input
                  name={`weeklyMenu_${menu.day}_dinner`}
                  type="text"
                  placeholder="Dinner"
                  className="form-control mx-2"
                  value={menu.dinner}
                  onChange={(e) =>
                    onWeeklyMenuChange(menu.day, "dinner", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="facilities" className="form-label">
              <h5><b>Facilities</b></h5>
            </label>
            <input
              name="facilities"
              type="text"
              className="form-control"
              id="facilities"
              value={
                Array.isArray(credentials.facilities)
                  ? credentials.facilities.join(",")
                  : credentials.facilities
              }
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DisplayPic" className="form-label">
              <h5><b>Display Picture URL</b></h5>
            </label>
            <input
              name="DisplayPic"
              type="text"
              className="form-control"
              id="DisplayPic"
              value={credentials.DisplayPic}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="form-label">
              <h5><b>Photos (comma-separated URLs)</b></h5>
            </label>
            <input
              name="photos"
              type="text"
              className="form-control"
              id="photos"
              value={
                Array.isArray(credentials.photos)
                  ? credentials.photos.join(",")
                  : credentials.photos
              }
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <h5><b>Description</b></h5>
            </label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="4"
              value={credentials.description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              <h5><b>Contact Number</b></h5>
            </label>
            <input
              name="contact"
              type="text"
              className="form-control"
              id="contact"
              value={credentials.contact}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reviews" className="form-label">
              <h5><b>Reviews</b></h5>
            </label>
            <textarea
              name="reviews"
              className="form-control"
              id="reviews"
              rows="4"
              value={credentials.reviews}
              onChange={onChange}
            ></textarea>
          </div>
          {/* <div className="role_c">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              onChange={onChange}
              value={credentials.role}
              className="mx-2 py-1"
            >
              <option value="User">User</option>
              <option value="Hostel Owner">Hostel Owner</option>
            </select>

            
          </div> */}
          <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
        </form>
      </div>
    </>
  );
};

export default NewHostel;
