import React, { useState } from 'react';
import classes from './knwoledgeHome.module.css';
import Carousel from 'react-bootstrap/Carousel';
import SelectCategories from './SelectCategories';
import Image from 'next/image';
import SkeletonLoader from './SkeletonLoader';
import { useEffect } from 'react';
import Link from 'next/link';

const HomeSlider = (props) => {
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  return (
    <>
      {props.sliderGiists ? (
        <>
          <div className="row mx-0 p-0 position-absolute w-100">
            <div className="text-white">
              <SelectCategories selectCategories={props.selectCategories} />
            </div>
          </div>
          <Carousel style={{ height: '98vh', position: 'relative' }} className={classes.container}>
            {props.sliderGiists &&
              props.sliderGiists.items?.map(
                (item) => (
                  console.log('skdfkndfsj =>', item),
                  (
                    <Carousel.Item style={{ position: 'relative', height: '98vh' }}>
                      <div
                        style={{
                          position: 'relative',
                          height: '98vh',
                          width: '100%',
                        }}
                      >
                        <div
                          className="kh-carousel-image-css position-absolute"
                          style={{ height: '98vh', width: '100%' }}
                          id={classes.wrapper}
                        >
                          <Image
                            src={
                              awsLink !== undefined && item.thumbnail !== null
                                ? awsLink + 'giists/images/' + item.thumbnail
                                : '/assets/images/noThumbnail.png'
                            }
                            className="position-absolute"
                            alt="tick"
                            width="100"
                            layout="fill"
                            height="100"
                            style={{ objectFit: 'fill' }}
                          />
                        </div>
                        <div className="row mx-0 position-absolute w-100" style={{ bottom: '15%', left: '0' }}>
                          <div className="text-white" style={{ marginTop: '14rem' }}>
                            <div className="ps-sm-3 ps-1">
                              <div className="d-flex justify-content-between">
                                <div className="row">
                                  <div className="w-100" style={{ zIndex: 1 }}>
                                    <p
                                      className="text-white text-truncate"
                                      style={{
                                        // marginTop: '200px',
                                        fontFamily: 'Gilroy-Regular',
                                        fontWeight: '700',
                                        fontSize: '24px',
                                        lineHeight: '30px',
                                        color: '#FFFFFF !important',
                                        width: '470px',
                                      }}
                                    >
                                      {item.title}
                                    </p>
                                    <p
                                      className={`text-white ${classes.dem} `}
                                      style={{
                                        marginTop: '10px',
                                        fontFamily: 'Gilroy-Regular',
                                        fontWeight: '400',
                                        fontSize: '20px',
                                        lineHeight: '30px',
                                        color: '#FFF !important',
                                        maxWidth: '276px',
                                        maxHeight: '60px',
                                        wordWrap: 'break-word',
                                      }}
                                    >
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <span className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 1 }}>
                          <Link
                            href={{
                              pathname: '../../kh/published_giists/PlayGiistsVideo',
                              query: { id: item.id },
                            }}
                          >
                            <Image
                              src="/assets/icons/new/circle_play.svg"
                              className=""
                              alt="play"
                              width="32px"
                              height="32px"
                            />
                          </Link>
                        </span>
                      </div>
                    </Carousel.Item>
                  )
                ),
              )}
          </Carousel>
        </>
      ) : (
        // Aown: In homeslider I changed the height of slider just.
        <div className="col-12 p-1" style={{ height: '98vh' }}>
          <div className="" style={{ height: '76%' }}>
            <SkeletonLoader height="100%" borderRadius="0px" width="100%" />
          </div>
          <div className="col-2 mt-4" style={{ height: '2%' }}>
            <SkeletonLoader height="100%" borderRadius="15px" width="100%" />
          </div>
          <div className="col-3 mt-3" style={{ height: '2%' }}>
            <SkeletonLoader height="100%" borderRadius="15px" width="100%" />
          </div>
          <div className="col-6 mt-3" style={{ height: '2%' }}>
            <SkeletonLoader height="100%" borderRadius="15px" width="100%" />
          </div>
          <div className="col-1 offset-6 mt-5" style={{ height: '10%' }}>
            <div className="d-flex">
              <div className="col-2">
                <SkeletonLoader height={14} width="80%" borderRadius="20px" />
              </div>
              <div className="col-2">
                <SkeletonLoader height={14} width="80%" borderRadius="20px" />
              </div>
              <div className="col-2">
                <SkeletonLoader height={14} width="80%" borderRadius="20px" />
              </div>
              <div className="col-2">
                <SkeletonLoader height={14} width="80%" borderRadius="20px" />
              </div>
              <div className="col-2">
                <SkeletonLoader height={14} width="80%" borderRadius="20px" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default HomeSlider;
