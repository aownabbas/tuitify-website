import classes from "./Setting.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewCategoriesAction from "../../redux/actions/ViewCategoryAction";
import UpdateCategoryAction from "../../redux/actions/UpdateCategoryAction";

const Categories = ({
  name,
  srcFile,
  setDescription,
  setTitle,
  title,
  description,
  CreateCategory,
  setFeature,
  feature,
  setStatus,
  status,
  setUpdateModal,
  error,
  setError,
  setDotLoading,
}) => {
  console.log(CreateCategory.status, "201");
  // const [completed, setCompleted] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [erros, setErros] = useState('')

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  useEffect(() => {
    if (id) {
      showData();
    }
  }, [id]);

  const showData = () => {
    let params = `platform_id=${selectedPlatform?.platform_id}&id=${id}`;
    dispatch(
      ViewCategoriesAction(
        params,
        onViewCategoriesSuccess,
        onViewCategoriesError
      )
    );
  };

  const onViewCategoriesSuccess = (res) => {
    setTitle(res.data.title);
    setDescription(res.data.description);
    setFeature(res.data.display_home);
    setStatus(res.data.status);
    console.log(res, "view");
  };

  const onViewCategoriesError = (err) => {
    console.log(err, "not view");
  };

  const updateCategory = () => {

    let params = {
      category_id: id,
      title: title,
      description: description,
      display_home: feature,
      status: status,
    };

    dispatch(
      UpdateCategoryAction(
        params,
        onUpdateCategoriesSuccess,
        onUpdateCategoriesError
      )
    );
  };

  const onUpdateCategoriesSuccess = (res) => {
    console.log(res, "res.data.status");
    if (res.data.status == true) {
      setUpdateModal(true);
      setDotLoading(false);
    } else if (res.data.status == false) {
      setErros(res.data.message);
      setDotLoading(false);
    }
    console.log(res.data.status, "update");
  };
  const onUpdateCategoriesError = (err) => {
    console.log(err, "not update");
  };
  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-10 0">
      <div className={classes.group_box}>
        <div className="col-md-12 d-flex p-3 row my-3 mx-0">
          <div className="col-md-6 px-2 ">
            <h2 className={classes.group_heading}>Create Category</h2>
          </div>
        </div>
        <div
          className="col-12 col-md-10 col-sm-10 d-flex px-4 mb-3 "
          // style={{ gridGap: "20px" }}
        >
          <div className="col-md-6 d-flex" style={{ flexDirection: "column" }}>
            <label className="light-xsmall mb-2">
              Category Title
              <span className="danger" style={{ color: "red" }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={classes.inputStyle}
            />
            <span
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "14px",
                textAlign: "right",
                color: "#FF4B55",
              }}
              className="m-2"
            >
              {error}{erros}
            </span>
          </div>
        </div>
        <div className="col-12 col-md-10 col-sm-10 d-flex px-4 mt-1 mb-3">
          <div
            className="col-md-12 col-sm-12 d-flex"
            style={{ flexDirection: "column" }}
          >
            <label className="light-xsmall mb-2">
              Description
              <span className="danger mx-1" style={{ color: "red" }}>
                *
              </span>
              (max 250 words)
            </label>
            {/* <input
              type="text"
              placeholder="write here..."
              // onChange={(e) => setTitle(e.target.value)}
              className={classes.inputStyle2}
            /> */}
            <textarea
              className={classes.inputStyle2}
              value={description}
              placeholder="write here..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-10 col-sm-10 d-flex px-4 mt-1 mb-3 d-flex">
          <div
            className="col-md-4 col-sm-4 d-flex"
            style={{ flexDirection: "column" }}
          >
            <label className="light-xsmall mb-2">
              Is this category featured?
              <span className="danger mx-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <div className="d-flex mt-2">
              <div>
                <input
                  type="radio"
                  checked={feature == 1}
                  name="answer"
                  id="yes"
                  className={classes.gradientRadio}
                  onClick={() => {
                    setFeature(1);
                  }}
                  style={{ accentColor: "black" }}
                />
                <label htmlFor="yes" className="medium-large px-2">
                  {" "}
                  Yes
                </label>
              </div>
              <div className="mx-4">
                <input
                  type="radio"
                  checked={feature == 0}
                  name="answer"
                  id="no"
                  className={classes.gradientRadio}
                  onClick={() => {
                    setFeature(0);
                  }}
                  style={{ accentColor: "black" }}
                />
                <label htmlFor="no" className="medium-large px-2">
                  {" "}
                  No
                </label>
              </div>
            </div>
          </div>
          <div
            className="col-md-5 col-sm-4 d-flex"
            style={{ flexDirection: "column" }}
          >
            <label className="light-xsmall mb-2">
              Category Status
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
        <div
          className="col-md-12 d-flex px-3 align-items-end position-absolute"
          style={{ bottom: "20px" }}
        >
          <div className={classes.btn}>
            <button
              className={classes.btn1}
              onClick={() => {
                router.push("/setting/SelectCategories");
              }}
            >
              Cancel
            </button>
            <button
              className={classes.btn2}
              disabled={
                !title || !description || feature == null || status == null
              }
              onClick={() => {
                setDotLoading(true);
                {
                  id ? updateCategory() : CreateCategory();
                }
              }}
              style={{
                opacity:
                  !title || !description || feature == null || status == null
                    ? "0.5"
                    : "",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
