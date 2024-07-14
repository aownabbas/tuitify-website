import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Categories from '../../components/setting/CreateCategories';
import { useDispatch, useSelector } from 'react-redux';
import createCategoriesAction from '../../redux/actions/CreateCategoryAction';
import DotProgress from '../../components/DotProgress';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import Image from 'next/image';
import User from '../../components/setting/User';
import platformCreateUserAction from '../../redux/actions/PlatfromCreateUserAction';

const CreateUser = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [roleId, setRoleId] = useState('');
  const [dotLoading, setDotLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [error, setError] = useState('');
  const [errorModal, setErrorModal] = useState(false)
  console.log(roleId, 'errooorr');

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);


  const CreateUsers = () => {
    // setDotLoading(true)
    let params = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      platform_id: selectedPlatform?.platform_id,
      email: email,
      password: password,
      role_id: roleId,
    });

    dispatch(platformCreateUserAction(params, onPlatformCreateUsersSuccess, onPlatformCreateUsersError));

  };

  const onPlatformCreateUsersSuccess = (res) => {
    if (res.status == true) {
      setSuccessModal(true);
      setDotLoading(false)
    } else {
      setError(res.message);
      setDotLoading(false)

    }

    console.log(res.message, 'created');
  };

  const onPlatformCreateUsersError = (err) => {
    setDotLoading(false)
    if (err.response.data.message == 'email Already Exists'){
      setErrorModal(true)
      setError("Email Already Exists")
    } else {
      setError(true)
      setError('Please fill all the field')
    } 
    
    console.log(err.response.data.message[0], 'not created');
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
          title={'User Created!'}
          description={'User has been successfully created.'}
          button1={'Okay'}
          link={'/setting/UserSetting'}
          setDotProgressLoading={setDotLoading}
        />
         <SuccessModal
          modalOpen={errorModal}
          handleModalClose={() => {
            setErrorModal(false);
          }}
          image={<Image src="/assets/icons/new/red_alert.svg" width="65px" height="70px" alt="alert" />}
          title={'Something went wrong!'}
          description={error}
          button1={'Okay'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={updateModal}
          handleModalClose={() => {
            setUpdateModal(false);
          }}
          image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
          title={'User Updated!'}
          description={'User has been successfully updated.'}
          button1={'Okay'}
          link={'/setting/UserSetting'}
          setDotProgressLoading={setDotLoading}
        />

        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="col-md-12 col-12 col-sm-12 ">
              <div className="w-100">
                <User
                  lastName={lastName}
                  setLastName={setLastName}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  CreateUsers={CreateUsers}
                  setEmail={setEmail}
                  email={email}
                  password={password}
                  setPassword={setPassword}
                  setRoleId={setRoleId}
                  roleId={roleId}
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

export default CreateUser;
