import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Categories from '../../components/setting/CreateCategories';
import { useDispatch, useSelector } from 'react-redux';
import createCategoriesAction from '../../redux/actions/CreateCategoryAction';
import DotProgress from '../../components/DotProgress';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import Image from 'next/image';

const CreateCategories = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feature, setFeature] = useState(null);
  const [status, setStatus] = useState(null);
  const [dotLoading, setDotLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [error, setError] = useState('');
  console.log(error, 'errooorr');

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  console.log(status, 'feature');
  useEffect(() => {
    CreateCategory();
  }, [selectedPlatform?.platform_id]);

  const CreateCategory = () => {
    // setDotLoading(true)
    let params = JSON.stringify({
      title: title,
      description: description,
      platform_id: selectedPlatform?.platform_id,
      display_home: feature,
      status: status,
    });

    dispatch(createCategoriesAction(params, onCreateCategoriesSuccess, onCreateCategoriesError));
  };

  const onCreateCategoriesSuccess = (res) => {
    if (res.data.status == true) {
      setSuccessModal(true);
      setDotLoading(false);
    } else {
      setError(res.data.message);
      setDotLoading(false);
    }

    console.log(res, 'created');
  };

  const onCreateCategoriesError = (err) => {
    console.log(err, 'not created');
  };

  return (
    <Layout heading="Setting">
      {dotLoading && <DotProgress />}
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <SuccessModal
          modalOpen={successModal}
          handleModalClose={() => {
            setSuccessModal(false);
          }}
          image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
          title={'Category Created!'}
          description={'Your category has been successfully created.'}
          button1={'Okay'}
          link={'/setting/SelectCategories'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={updateModal}
          handleModalClose={() => {
            setUpdateModal(false);
          }}
          image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
          title={'Category Updated!'}
          description={'Your category has been successfully updated.'}
          button1={'Okay'}
          link={'/setting/SelectCategories'}
          setDotProgressLoading={setDotLoading}
        />

        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="col-md-12 col-12 col-sm-12 ">
              <div className="w-100">
                <Categories
                  description={description}
                  setDescription={setDescription}
                  title={title}
                  setTitle={setTitle}
                  CreateCategory={CreateCategory}
                  setFeature={setFeature}
                  feature={feature}
                  setStatus={setStatus}
                  status={status}
                  setUpdateModal={setUpdateModal}
                  error={error}
                  setError={setError}
                  setDotLoading={setDotLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategories;
