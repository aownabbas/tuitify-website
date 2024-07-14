import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SocialLinks from '../../components/setting/SocialLinks';
import Terms from '../../components/setting/TermsCondition';
import NewsLetters from '../../components/setting/NewsLetters';
import NOtification from '../../components/setting/NotificationSetting';

const Setting = () => {
  return (
    <Layout heading="Setting">
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="mb-2 w-100">
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '20.08px',
                  color: '#303548',
                  maxWidth: '127px',
                }}
              >
                General Settings
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '18px',
                  color: '#303548',
                  maxWidth: '409pxpx',
                }}
              >
                you can setup all general information here...
              </p>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 w-100 row justify-content-between d-flex flex-wrap space-between">
              <div className="col-sm-6 mt-2 " style={{ maxWidth: '100%' }}>
                <SocialLinks />
              </div>
              <div className="col-sm-6 mt-2  " style={{ maxWidth: '100%' }}>
                <Terms />
              </div>
            </div>
            <div className="row col-md-12 col-sm-12 col-lg-12 col-xs-12 w-100 justify-content-between d-flex flex-wrap space-between">
              <div className="col-sm-6 mt-2 " style={{ maxWidth: '100%' }}>
              <NewsLetters />
              </div>
              <div className="col-sm-6 mt-2 align-self-end " style={{ maxWidth: '100%' }}>
                <NOtification />
              </div>
            </div>
            {/* <div className="col-12 col-md-12 col-sm-12 mt-2 w-100">
              <NewsLetters />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
