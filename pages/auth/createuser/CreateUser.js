import CreateUserForm from '../../../components/auth/create_user_flow/CreateUserForm';
import classes from '../../../components/auth/create_user_flow/Createuser.module.css';
import COLORS from '../../../public/assets/colors/colors';
import Sidebar from '../../../components/layout/Sidebar';
import Header from '../../../components/layout/Header';
import Image from 'next/image';

const CreateUser = () => {
  return (
    <>
      <head>
        <title>Knowledge Hub</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link rel="stylesheet" href="/layout.css" />
        <link href="/css/styles.css" rel="stylesheet" />
      </head>

      <div id="wrapper " style={{}}>
        <Sidebar />
        <div id="page-content-wrapper" className="content-wrapper" style={{ backgroundColor: COLORS.grey_view }}>
          <Header heading="" />
          <div className="col-12 d-inline-flex justify-content-center" style={{ maxWidth: '100%' }}>
            <div className="col-12 col-sm-12 col-md-12 row">
              <div className="w-100 ">
                <div
                  className="row mx-auto"
                  style={{
                    backgroundColor: COLORS.white,
                    backdropFilter: 'blur(100px)',
                  }}
                >
                  <div className="col-md-4 ht" style={{ backgroundColor: COLORS.mainColor }}>
                    <div className="row">
                      <ul className={`${classes.logoList}`}>
                        <li>
                          <Image
                            src="/assets/img/logoANDtext.svg"
                            className="img-fluid"
                            width="168"
                            height="58.55"
                            alt="giistyLogo"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="row max-auto">
                      <div className=" col-md-8" style={{ marginTop: '25%', left: '0' }}>
                        <Image
                          src="/assets/img/dotted-BG.svg"
                          className="img-fluid"
                          alt=""
                          width="230"
                          height="284px"
                          style={{ marginTop: '3rem', marginLeft: '-1rem' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 offset-md-1">
                    <div className="w-100" style={{ marginTop: '6.5%' }}>
                      <div className="row">
                        <div className="col-md-2 text-center mb-4" style={{ background: 'inherit' }}>
                          <a href="#back">
                            <Image src="/assets/images/arrow-left.png" width={25} height={25} alt="arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-8 offset-md-2 mb-3">
                        <CreateUserForm />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
