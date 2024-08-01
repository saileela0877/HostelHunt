import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import mainimage from "../photos/hostelhunt_2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [role, setrole] = useState();
  const [ id, setId] = useState();
  const [hasHostel, setHasHostel] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      getuser();
    }
  }, [localStorage.getItem("token")]);




  useEffect(() => {
    if (role === "Hoste Owner") {
      // Check if the user has created any hostels
      checkHostel();
    }
  }, [role, id]);

  const checkHostel = async () => {
    try {
      const config = {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get(
        `http://localhost:5000/api/hostels/getmyhostel/${id}`,
        config
      );

      setHasHostel(res.data.hostels);
      console.log("hostel details",hasHostel)
      console.log("hello")
    } catch (error) {
      console.error("Error checking hostel:", error);
    }
  };




  const handleLogout = () => {
    localStorage.removeItem("token");
    // setUser(null)
    setUser(null);
    setrole(null);
    navigate("/");
  };

  // console.log(user);

  const getuser = async () => {
    try {
      const config = {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get(
        "http://localhost:5000/api/auth/getuser",
        config
      );
      const user = res.data.username;
      const currentrole = res.data.role;
      const userid = res.data._id;
      setUser(user);
      setrole(currentrole);
      setId(userid);

      console.log("in navbar",user)
      console.log(id)

    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary navigationbar"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <img
            src={mainimage}
            alt="Hostel Hunt Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <a className="navbar-brand" href="#">
            <h3>HOSTEL-HUNT</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="navitem">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="navitem" >
                <Link className="nav-link active"  to="">
                  About
                </Link>
              </li>
              {localStorage.getItem("token") &&
                (role === "User" ? (
                  <li className="navitem active">
                    <Link className="nav-link active" to="/displayhostels">
                      Find Hostels
                    </Link>
                  </li>
                ) : (
                  <li className="navitem active">
                    {hasHostel ? (
                      <Link className="nav-link active" to={`/hostelpage/${hasHostel[0]._id}`}>
                        My Hostel
                      </Link>
                    ) : (
                      <Link className="nav-link active" to="/createhostel">
                        Create Hostel
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
            {localStorage.getItem("token") && (
              <li className="loggedin">
                <span className="dot"></span> (Logged in as <i>{user})</i>
              </li>
            )}

            
            {!localStorage.getItem("token") ? (
              <Link to="/login">
                {" "}
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="btn btn-success loginbutton" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// import { React, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../App.css";
// import mainimage from "../photos/hostelhunt_2.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState();
//   const [role, setrole] = useState();

//   useEffect(() => {
//     if (localStorage.getItem("token") && !user) {
//       getuser();
//     }
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     // setUser(null)
//     setUser(null);
//     setrole(null);
//     navigate("/");
//   };

//   // console.log(user);

//   const getuser = async () => {
//     try {
//       const config = {
//         headers: {
//           "auth-token": localStorage.getItem("token"),
//         },
//       };
//       const res = await axios.get(
//         "http://localhost:5000/api/auth/getuser",
//         config
//       );
//       const user = res.data.username;
//       const currentrole = res.data.role;
//       setUser(user);
//       setrole(currentrole);
//     } catch (error) {
//       console.error("Error getting user:", error);
//     }
//   };

//   return (
//     <>
//       <nav
//         className="navbar navbar-expand-lg bg-body-tertiary navigationbar"
//         data-bs-theme="dark"
//       >
//         <div className="container-fluid">
//           <img
//             src={mainimage}
//             alt="Hostel Hunt Logo"
//             width="30"
//             height="30"
//             className="d-inline-block align-top"
//           />
//           <a className="navbar-brand" href="#">
//             <h3>HOSTEL-HUNT</h3>
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="navitem">
//                 <Link to="/" className="nav-link active" aria-current="page">
//                   Home
//                 </Link>
//               </li>
//               <li className="navitem" >
//                 <Link className="nav-link active"  to="">
//                   About
//                 </Link>
//               </li>
//               {localStorage.getItem('token') &&
//               (role === "User" ?(
//                 <li className="navitem active">
//                   <Link className="nav-link active" to="/displayhostels">
//                     Find Hostels
//                   </Link>
//                 </li>
//               ):
//               <li className="navitem active">
//                   <Link className="nav-link active" to="/createhostel">
//                     My Hostel
//                   </Link>
//                 </li>)
//               }

              
//             </ul>
//             {localStorage.getItem("token") && (
//               <li className="loggedin">
//                 <span className="dot"></span> (Logged in as <i>{user})</i>
//               </li>
//             )}

            
//             {!localStorage.getItem("token") ? (
//               <Link to="/login">
//                 {" "}
//                 <button className="btn btn-primary" type="submit">
//                   Login
//                 </button>
//               </Link>
//             ) : (
//               <Link to="/">
//                 <button className="btn btn-success loginbutton" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

