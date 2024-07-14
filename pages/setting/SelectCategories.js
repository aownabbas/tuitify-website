import { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import classes from "../../components/setting/Setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import CategoriesAction from "../../redux/actions/CategoriesAction";
import usePagination from "../../components/pagination/Pagination";
import { useRouter } from "next/router";
import CreateCategories from "./Categories";
import DummyDeleteModal from "../../components/modals/deletemodal/DummyDeleteModal";
import deleteCategoryAction from "../../redux/actions/DeleteCategoryAction";
import { Skeleton } from "@mui/material";
import GenericTable from "../../components/combine/GenericTable.js/GenericTable";
import moment from "moment";
import DotProgress from "../../components/DotProgress";
import SuccessModal from "../../components/modals/simplemodal/SuccessModal";

const SelectCategories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] =
    useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("Categories");
  const [createPlat, setCreatePlat] = useState("Add Category");
  const [dotLoading, setDotLoading] = useState(false);
  const [showSuccessModals, setShowSuccessModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);

  console.log(search, "search");

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const UnPublishOpenModal = (items) => {
    setCategoryId(items.id);
    setUnPublishGiistOnEditModal(true);
  };

  const UnPublishColseModal = () => setUnPublishGiistOnEditModal(false);

  const PER_PAGE = limit;

  useEffect(() => {
    setLoading(false);
    let params = `limit=${limit}&platform_id=${selectedPlatform?.platform_id}&page=${page}&search=${search}`;
    dispatch(CategoriesAction(params, onCategoriesSuccess, onCategoriesError));
  }, [selectedPlatform?.platform_id, page, search, limit]);

  const CategoryDelete = (categoryId) => {
    setDotLoading(true);
    let params = {
      category_ids: [categoryId],
      platform_id: selectedPlatform?.platform_id,
    };

    dispatch(
      deleteCategoryAction(
        params,
        onDeleteCategorySuccess,
        onDeleteCategoryError
      )
    );
  };

  const onDeleteCategorySuccess = (res) => {
    setDotLoading(false);

    if (res.data.status == true) {
      setShowSuccessModals(true);
      const newData = categoryData.items.filter((row) => row.id !== categoryId);
      setCategoryData((s) => ({ ...s, items: newData }));
    } else {
      setShowModalsError(true);
    }
    console.log(res, "deleted");
  };
  const onDeleteCategoryError = (err) => {
    setDotLoading(false);

    console.log(err, "not deleted");
  };

  const onCategoriesSuccess = (res) => {
    console.log(res, "category");
    let modifiedDataForTable = res.data;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        title: item.title,
        description: item.description,
        status: item.status == 1 ? "Active" : "Inactive",
        featured: item.featured == 1 ? "Yes" : "No",
        creation_date: moment(item.creation_date).format("DD MMMM, YYYY"),
      };
    });

    modifiedDataForTable.items = updateArray;

    setCategoryData(modifiedDataForTable);
    setLoading(false);
  };
  const onCategoriesError = (err) => {
    setLoading(false);
    console.log(err, "category error");
  };
  var count = Math.ceil(categoryData?.totalItems / PER_PAGE);
  const cardData = usePagination(
    categoryData?.items,
    categoryData?.totalItems,
    PER_PAGE
  );
  const handlePagination = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };
  const router = useRouter();
  const handleCLick = () => {
    router.push("./Categories");
  };

  const tableTitles = [
    {
      title: "Title",
      width: 160,
      id: "title",
    },
    { title: "Description", width: 160, id: "description" },
    { title: "Status", width: 160, id: "status" },
    { title: "Feature", width: 160, id: "featured" },
    { title: "Creation Date", width: 160, id: "creation_date", date: true },
    { title: "Action", width: 160, id: "action", edit: true },
  ];
  const handleCLick2 = (items) => {
    router.push({
      pathname: "/setting/Categories",
      query: { id: items.id },
    });
  };
  return (
    <Layout heading="Settings" showSettingIcon={true} showdropdown={true}>
      {dotLoading && <DotProgress />}

      <div className="col-12 d-inline-flex justify-content-center p-2">
        <DummyDeleteModal
          openModal={UnPublishGiistOnEditModal}
          handleCloseModal={UnPublishColseModal}
          image="/assets/images/trash.svg"
          heading="Deleting Category"
          text="Are you sure you want to delete this category?"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => CategoryDelete(categoryId)}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={
            <Image
              src="/assets/images/tick.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"Category Deleted Successfully"}
          description={"This category has been successfully deleted "}
          button1={"Okay"}
        />
        <SuccessModal
          modalOpen={showModalsError}
          handleModalClose={() => {
            setShowModalsError(false);
          }}
          image={
            <Image
              src="/assets/icons/new/red_alert.svg"
              width="65px"
              height="70px"
              alt="alert"
              style={{ borderRadius: "10px" }}
            />
          }
          title={"Error"}
          description={"Something Went Wrong."}
          button1={"Okay"}
          // link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="mb-2 w-100 mb-3">
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "20.08px",
                  color: "#303548",
                  maxWidth: "127px",
                }}
              >
                Categories
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  color: "#303548",
                  maxWidth: "509pxpx",
                }}
              >
                you can create, edit and delete groups for the selected platform
                here
              </p>
            </div>
            <div className="col-md-12 col-12 col-sm-12 w-100">
              <div className={classes.whiteBox3}>
                <div className="d-flex " style={{ minHeight: "90%" }}>
                  <div className="col-md-12 col-sm-12 col-12">
                    {loading || !categoryData?.items ? (
                      <div className="px-3 mt-2">
                        {[0, 1, 2, 3, 4, 5].map(() => {
                          return (
                            <Skeleton
                              variant="rounded"
                              height={"65px"}
                              style={{
                                marginBottom: "10px",
                                borderRadius: "5px",
                              }}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <GenericTable
                        columns={tableTitles}
                        data={categoryData}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={page}
                        count={count}
                        deleteModal={UnPublishOpenModal}
                        handleCLick2={handleCLick2}
                        create={handleCLick}
                        setSearchData={setSearch}
                        searchData={search}
                        title={title}
                        createData={createPlat}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectCategories;
