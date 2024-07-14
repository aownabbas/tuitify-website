import { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Platform from "../../components/setting/Platform";
import Image from "next/image";
import classes from "../../components/setting/Setting.module.css";
import { useRouter } from "next/router";
import CreatePlatform from "./CreatePlatform";
import { useDispatch } from "react-redux";
import PlatformAction from "../../redux/actions/PlatformsAction";
import usePagination from "../../components/pagination/Pagination";
import DummyDeleteModal from "../../components/modals/deletemodal/DummyDeleteModal";
import deletePlatformAction from "../../redux/actions/DeletePlatformAction";
import SuccessModal from "../../components/modals/simplemodal/SuccessModal";
import { Skeleton } from "@mui/material";
import DotProgress from "../../components/DotProgress";
import GenericTable from "../../components/combine/GenericTable.js/GenericTable";
import moment from "moment";

const PlatformSetting = () => {
  const router = useRouter();
  const handleCLick = () => {
    router.push("./CreatePlatform");
  };
  const [page, setPage] = useState(1);
  const [showModals, setShowModals] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const [platformDatas, setPlatformData] = useState(null);
  // console.log(platformDatas.items,'platformDatas');
  const [platformDeleteModal, setPlatformDeleteModal] = useState(false);
  const [platformId, setPlatformId] = useState("");
  const [search, setSearch] = useState("");
  const [getPlatData, setGetPlatData] = useState("");
  const [loading, setLoading] = useState(true);
  const [dotLoading, setDotLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [title, setTitle] = useState("Platforms");
  const [createPlat, setCreatePlat] = useState("Create new platform");
  const [showSuccessModals, setShowSuccessModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);

  useEffect(() => {
    const platform = JSON.parse(localStorage.getItem("@GetPlatData"));
    console.log(platform, "plattt");
    setGetPlatData(platform);
  }, []);

  let dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    let params = "";
    if (search !== "") {
      params = `limit=${limit}&page=${page}&search=${search}`;
    } else {
      params = `limit=${limit}&page=${page}`;
    }
    dispatch(PlatformAction(params, onPlatformSuccess, onPlatformError));
  }, [page, search, limit]);

  console.log("skfks", platformDatas);

  const onPlatformSuccess = (res) => {
    let modifiedDataForTable = res.data;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        name: item.name,
        image: item.logo ? `platforms/logos/${item.logo}` : "",
        status: item.status == 1 ? "Active" : "Inactive",
        private_platform: item.private_platform == 1 ? "Private" : "Public",
        created: moment(item.created).format("DD MMMM, YYYY"),
        deleted: item.deleted
          ? moment(item.deleted).format("DD MMMM, YYYY")
          : "no deleted",
      };
    });

    modifiedDataForTable.items = updateArray;

    setPlatformData(modifiedDataForTable);
    setLoading(false);

    console.log(res.data, "platform data");
  };

  const onPlatformError = (err) => {
    setLoading(false);

    console.log(err, "error platform data");
  };

  const UnPublishOpenModal = (item) => {
    if (item.deleted != "no deleted") {
      setShowModals(true);
    } else {
      setPlatformId(item.platform_id);
      setPlatformDeleteModal(true);
    }
  };

  const UnPublishColseModal = () => setPlatformDeleteModal(false);

  const platformDelete = (platformId) => {
    setDotLoading(true);
    let params = {
      platform_ids: [platformId],
    };
    dispatch(
      deletePlatformAction(
        params,
        onDeletePlatformSuccess,
        onDeletePlatformError
      )
    );
  };

  const onDeletePlatformSuccess = (res) => {
    setLoading(false);

    if (res.status == true) {
      setShowSuccessModals(true);
      let params = `limit=${limit}&page=${page}`;

      dispatch(PlatformAction(params, onPlatformSuccess, onPlatformError));
      setDotLoading(false);
    }

    console.log(res.status, "platform deleted");
  };

  const onDeletePlatformError = (err) => {
    console.log(err, "platform not deleted");
  };

  const PER_PAGE = limit;

  var count = Math.ceil(platformDatas?.totalItems / PER_PAGE);
  const cardData = usePagination(
    platformDatas?.items,
    platformDatas?.totalItems,
    PER_PAGE
  );
  const handlePagination = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };

  const tableTitles = [
    {
      title: "Platform Name",
      width: 160,
      id: "name",
      img: true,
    },
    { title: "Status", width: 160, id: "status" },
    { title: "Creation Date", width: 160, id: "created" },
    { title: "Type", width: 160, id: "private_platform" },
    { title: "Deleted", width: 160, id: "deleted" },
    {
      title: "Action",
      width: 160,
      id: "action",
      editPath: "/setting/CreatePlatform",
      edit: true,
    },
  ];
  const handleCLick2 = (item) => {
    if (item.deleted != "no deleted") {
      setShowDeleted(true);
    } else {
      router.push({
        pathname: "/setting/CreatePlatform",
        query: { id: item.platform_id },
      });
    }
  };

  return (
    <Layout heading="Settings" showdropdown={false} showSettingIcon={true}>
      {dotLoading && <DotProgress />}
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <DummyDeleteModal
          openModal={platformDeleteModal}
          handleCloseModal={UnPublishColseModal}
          image="/assets/images/trash.svg"
          heading="Deleting Platform"
          text="Are you sure you want to delete this platform?"
          // setDotProgressLoading={setDotLoading}
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => platformDelete(platformId)}
        />
        <SuccessModal
          modalOpen={showModals}
          handleModalClose={() => {
            setShowModals(false);
          }}
          image={
            <Image
              src="/assets/images/trash.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"Platform Deleted"}
          description={
            "This platform has been deleted and is no longer available."
          }
          button1={"Okay"}
        />
        <SuccessModal
          modalOpen={showDeleted}
          handleModalClose={() => {
            setShowDeleted(false);
          }}
          image={
            <Image
              src="/assets/images/trash.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"Platform Deleted"}
          description={"Platform is no longer editable."}
          button1={"Okay"}
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
          title={"Platform Deleted Successfully"}
          description={"This platform has been successfully deleted "}
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
            <div className="mb-2 w-100">
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "20.08px",
                  color: "#303548",
                  maxWidth: "164px",
                }}
              >
                Platforms
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
                you can create, edit and delete all platforms here
              </p>
            </div>
            <div className="col-md-12 col-12 col-sm-12 w-100">
              <div className={classes.whiteBox3}>
                <div className="d-flex " style={{ height: "90%" }}>
                  <div className="col-md-12 col-sm-12 col-12">
                    {loading || !platformDatas?.items ? (
                      <div className="px-1 mt-2">
                        {[0, 1, 2, 3, 4, 5, 6].map(() => {
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
                        data={platformDatas}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={page}
                        count={count}
                        getPlatData={getPlatData}
                        deleteModal={UnPublishOpenModal}
                        DeletedData={setShowModals}
                        notEditableData={setShowDeleted}
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

export default PlatformSetting;
