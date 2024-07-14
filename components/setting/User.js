import classes from "./Setting.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewCategoriesAction from "../../redux/actions/ViewCategoryAction";
import UpdateCategoryAction from "../../redux/actions/UpdateCategoryAction";
import platformUpdateUserAction from "../../redux/actions/PlatformUpdateUserAction";
import viewPlatformUserAction from "../../redux/actions/ViewPlatformUserAction";

const User = ({
  firstName,
  setFirstName,
  setEmail,
  email,
  password,
  setPassword,
  CreateUsers,
  lastName,
  setLastName,
  setRoleId,
  roleId,
  setUpdateModal,
  error,
  setError,
  setDotLoading,
}) => {
  console.log(roleId, "201slkgkslgk");
  // const [completed, setCompleted] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [erros, setErros] = useState("");
  const [status, setStatus] = useState("");
  console.log(status, "statusdddd");

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  useEffect(() => {
    if (id) {
      showData();
    }
  }, [id]);

  const showData = () => {
    let params = `platform_id=${selectedPlatform?.platform_id}&user_id=${id}`;
    dispatch(
      viewPlatformUserAction(
        params,
        onViewPlatformUserSuccess,
        onViewPlatformUserError
      )
    );
  };

  const onViewPlatformUserSuccess = (res) => {
    setFirstName(res.first_name);
    setLastName(res.last_name);
    setEmail(res.email);
    setRoleId(res.role_id);
    setStatus(res.status);
    console.log(res, "view");
  };

  const onViewPlatformUserError = (err) => {
    console.log(err, "not view");
  };

  const updateCategory = () => {
    let params = JSON.stringify({
      user_id: id,
      first_name: firstName,
      last_name: lastName,
      platform_id: selectedPlatform?.platform_id,
      email: email,
      password: password,
      role_id: roleId.toString(),
      status: status.toString(),
    });

    dispatch(
      platformUpdateUserAction(
        params,
        onPlatformUpdateUserSuccess,
        onPlatformUpdateUserError
      )
    );
  };

  const onPlatformUpdateUserSuccess = (res) => {
    console.log(res, "res.data.status");
    if (res.status == true) {
      setUpdateModal(true);
      setDotLoading(false);
    } else if (res.data.status == false) {
      setErros(res.data.message);
      setDotLoading(false);
    }
    console.log(res.status, "update");
  };
  const onPlatformUpdateUserError = (err) => {
    console.log(err, "not update");
  };
  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-10 0">
      <div className={classes.group_box}>
        <div className="col-md-12 d-flex p-3 row my-2 mx-0">
          {id ? (
            <div className="col-md-6 px-2 d-flex ">
              <h2 className={classes.group_heading}>Edit User</h2>
            </div>
          ) : (
            <div className="col-md-6 px-2 d-flex ">
              <h2 className={classes.group_heading}>Create User</h2>
            </div>
          )}
        </div>
        <div
          className="mb-3"
          style={{ opacity: "0.1", border: "1px solid #000000" }}
        ></div>

        <div
          className="col-12 col-md-10 col-sm-10 d-flex px-4 mb-2 "
          // style={{ gridGap: "20px" }}
        >
          <div className="col-md-6 d-flex" style={{ flexDirection: "column" }}>
            <label className="semibold mb-2">
              First Name
              <span className="danger" style={{ color: "red" }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className={classes.inputStyle}
            />
          </div>
        </div>
        <div
          className="col-12 col-md-10 col-sm-10 d-flex px-4 mb-2 "
          // style={{ gridGap: "20px" }}
        >
          <div className="col-md-6 d-flex" style={{ flexDirection: "column" }}>
            <label className="semibold mb-2">
              Last Name
              <span className="danger" style={{ color: "red" }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className={classes.inputStyle}
            />
          </div>
        </div>
        <div
          className="col-12 col-md-10 col-sm-10 d-flex px-4 mb-2 "
          // style={{ gridGap: "20px" }}
        >
          <div className="col-md-6 d-flex" style={{ flexDirection: "column" }}>
            <label className="semibold mb-2">
              Email
              <span className="danger" style={{ color: "red" }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              className={classes.inputStyle}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          className="col-12 col-md-10 col-sm-10 d-flex px-4  "
          // style={{ gridGap: "20px" }}
        >
          <div className="col-md-6 d-flex" style={{ flexDirection: "column" }}>
            <label className="semibold mb-2">
              Password
              <span className="danger" style={{ color: "red" }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={classes.inputStyle}
            />
          </div>
        </div>

        <div className="col-12 col-md-10 col-sm-10 d-flex px-4 mt-2 mb-2  d-flex">
          <div
            className="col-md-6 col-sm-6 d-flex"
            style={{ flexDirection: "column" }}
          >
            <label className="semibold mb-2">
              Type
              <span className="danger mx-1" style={{ color: "red" }}>
                *
              </span>
            </label>

            <select
              class="form-select"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              aria-label="Default select example"
              className={classes.inputStyle}
            >
              <option selected>Select</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </div>
        </div>
        {id ? (
          <div className="col-12 col-md-10 col-sm-10 d-flex px-4 mt-2  mb-3 d-flex">
            <div
              className="col-md-4 col-sm-4 d-flex"
              style={{ flexDirection: "column" }}
            >
              <label className="semibold mb-2">
                Status
                <span className="danger mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <div className="d-flex mt-2">
                <div>
                  <input
                    type="radio"
                    checked={status == 1}
                    name="yes"
                    id="active"
                    className={classes.gradientRadio}
                    onClick={() => {
                      setStatus(1);
                    }}
                    style={{ accentColor: "black" }}
                  />
                  <label htmlFor="active" className="medium-large px-2">
                    {" "}
                    Active
                  </label>
                </div>
                <div className="mx-4">
                  <input
                    type="radio"
                    checked={status == 0}
                    name="yes"
                    id="in-active"
                    className={classes.gradientRadio}
                    onClick={() => {
                      setStatus(0);
                    }}
                    style={{ accentColor: "black" }}
                  />
                  <label htmlFor="in-active" className="medium-large px-2">
                    {" "}
                    In-Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          className="col-md-12 d-flex px-3 align-items-end "
          //   style={{ bottom: "0px" }}
        >
          {id ? (
            <div className={classes.btn}>
              <button
                className={classes.btn1}
                onClick={() => {
                  router.push("/setting/UserSetting");
                }}
              >
                Cancel
              </button>
              <button
                className={classes.btn2}
                onClick={() => {
                  setDotLoading(true);
                  updateCategory();
                }}
                style={{
                  border: "none",
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className={classes.btn}>
              <button
                className={classes.btn1}
                onClick={() => {
                  router.push("/setting/UserSetting");
                }}
              >
                Cancel
              </button>
              <button
                className={classes.btn2}
                disabled={
                  !firstName || !lastName || !email || !password || !roleId
                }
                onClick={() => {
                  setDotLoading(true);
                  CreateUsers();
                }}
                style={{
                  opacity:
                    !firstName || !lastName || !email || !password || !roleId
                      ? "0.5"
                      : "",
                  border: "none",
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
