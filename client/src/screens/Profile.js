import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { REACT_APP_PUBLIC_FOLDER } from "../Config";

function Profile(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [user, setUser] = useState({});
  const [name, setName] = useState(user?.name);
  const [openEdit, setOpenEdit] = useState(false);
  const params = useParams();
  const id = params.id;

  const [file, setFile] = useState(null);
  const PF = REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const fetchUser = async () => {
      await axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
        console.log(res);
        setUser(res.data);
      });
    };
    fetchUser();
  }, [id, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userInfo._id === id) {
      const updatedProfile = {
        userId: userInfo._id,
        name: name,
      };

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;

        data.append("name", fileName);
        data.append("file", file);
        updatedProfile.image = fileName;
        try {
          await axios.post("/upload", data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.put(
          `http://localhost:5000/api/users/${userInfo._id}`,
          updatedProfile,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${userInfo?.token}` },
          }
        );
        console.log(updatedProfile);
        navigate(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const clickHandler = (e) => {
    if (userInfo._id === id) {
      e.preventDefault();
      setOpenEdit(!openEdit);
    }
  };

  return (
    <div className="profile">
      <h2>
        <span>{user?.name}</span>'s Profile
      </h2>
      <div className="profile_container">
        <div className="profile_info">
          <img
            src={user.image ? PF + user.image : PF + "noAvatar.png"}
            alt={user.name}
          />
          <h2>
            <span>Username:</span>
            {user?.name}
          </h2>
          <p>
            <span>Email:</span> {user?.email}
          </p>
        </div>
        {userInfo._id === id && (
          <div className="profile_edit">
            <button
              onClick={clickHandler}
              type="submit"
              className={openEdit ? "bg-red" : "bg-green"}
            >
              {openEdit ? "Close" : "Edit Profile"}
            </button>
            {openEdit && (
              <form className="editForm" onSubmit={(e) => submitHandler(e)}>
                <div htmlFor="file" className="options">
                  <label>Profile Image: </label>
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="options">
                  <label>Username: </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder={user.name}
                  />
                </div>
                <button className="updateButton" type="submit">
                  Update
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
