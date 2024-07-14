import React, { useState, useEffect, useRef } from 'react'
// import dynamic from 'next/dynamic';
// const FileViewer = dynamic(() => import('react-file-viewer'), {
//   ssr: false
// });
// import COLORS from "../../public/assets/colors/colors";
import { withRouter} from 'next/router';
import Image from 'next/image';
// import DocViewer from "@cyntler/react-doc-viewer";

  // import DocViewer
  // // , {DocViewerRenderers}
  //  from "@cyntler/react-doc-viewer";
//  const DocViewer = dynamic(() => import("@cyntler/react-doc-viewer"),
//  {ssr: false});
// import DocViewer from "react-doc-viewer";

//  import { Document, Page, pdfjs } from 'react-pdf';

//  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// console.log(pdfjs.GlobalWorkerOptions.workerSrc);

const AttachmentViewer = (props) => {

    // const router = useRouter();

    // const viewer = useRef(null);

    const [getPlatData, setGetPlatData] = useState({});

    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);

    // function onDocumentLoadSuccess({ numPages }) {
    //   setNumPages(numPages);
    // }

    useEffect(() => {
          const GetPlatData = JSON.parse(localStorage.getItem("@GetPlatData"));
    
          if (GetPlatData) {
            const getPlatObject = GetPlatData;
            setGetPlatData(getPlatObject);
          }    

          // import('@pdftron/webviewer').then(() => {
          //   WebViewer(
          //     {
          //       path: '/lib',
          //       initialDoc: GetPlatData.aws_link+"briffs/attachments"+downloadUrl,
          //     },
          //     viewer.current,
          //   ).then((instance) => {
          //     instance.UI.loadDocument(myBlob, { filename: 'myfile.pdf' });
          //       const { docViewer } = instance;
          //       // you can now call WebViewer APIs here...
          //     });
          // })
      return () => {}
    }, [])
    console.log(props.router.query.item);
    let downloadUrl = props.router.query.item
    // ?.substring(props.router.query.item.indexOf("@") + 1);
    // ?.replaceAll(" ", "+");

    console.log(downloadUrl);
  return (
    <>
      <div id="row" className={
        (props.router.query.Type == "wav" || props.router.query.Type == "mp3" || props.router.query.Type == "aac" || props.router.query.Type == "webm" || props.router.query.Type == "ogg" || props.router.query.Type == "mp4") ? 'position-realtive d-flex justify-content-center align-items-center attachment-view' : 'position-realtive d-flex justify-content-center attachment-view'} style={{ height: "100vh", background: "rgba(48, 53, 72, .8)"}}>
      <p className='position-absolute top-0 start-0 mt-4 ms-4'>
      <Image
          // src={getPlatData.link + "logos/" + getPlatData.logo}
          src="/assets/logo/transparent_logo.svg"
          width="28px" height="37px"
          alt="logo"
        />
      </p>
      {(
        // props.router.query.Type != "doc" && props.router.query.Type != "docx" &&
      props.router.query.Type != "svg" && props.router.query.Type != "csv" && props.router.query.Type != "xlsx"
      && props.router.query.Type != "jpg" && props.router.query.Type != "png" && props.router.query.Type != "jpeg" && props.router.query.Type != "jfif" && props.router.query.Type != "gif"
      && props.router.query.Type != "wav" && props.router.query.Type != "aac" && props.router.query.Type != "mp3" && props.router.query.Type != "webm" && props.router.query.Type != "ogg" && props.router.query.Type != "mp4" &&
      // props.router.query.Type != "DOC" && props.router.query.Type != "DOCX" && 
      props.router.query.Type != "SVG" && props.router.query.Type != "CSV" && props.router.query.Type != "XLSX"
      && props.router.query.Type != "JPG" && props.router.query.Type != "PNG" && props.router.query.Type != "JPEG" && props.router.query.Type != "JFIF" && props.router.query.Type != "GIF"
      && props.router.query.Type != "WAV" && props.router.query.Type != "AAC" && props.router.query.Type != "MP3" && props.router.query.Type != "WEBM" && props.router.query.Type != "OGG" && props.router.query.Type != "MP4") &&
      
      
      // props.router.query.OpenIn == "form" ? 
      // ""
      //react-pdf prints double
    //   <div>
    //   <Document file={downloadUrl} onLoadSuccess={onDocumentLoadSuccess}>
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>
    //     Page {pageNumber} of {numPages}
    //   </p>
    // </div>
      // <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
      // <DocViewer documents={downloadUrl} />
      // : 
      <><iframe className="doc" src={`https://docs.google.com/gview?url=${getPlatData.aws_link}briffs/attachments${downloadUrl}&embedded=true`} width={700} ></iframe>
      {/* <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div> */}
      </>
      // `https://docs.google.com/gview?url=${downloadUrl}&embedded=true`
      // `file:///${downloadUrl}`
      // <DocViewer 
      // // pluginRenderers={DocViewerRenderers}
      // documents={
      //   [
      //     { uri: getPlatData.aws_link+"briffs/attachments"+downloadUrl},
      //     // { uri: require("./example-files/pdf.pdf") }, // Local File
      //   ]
      // } />
      // <FileViewer
        // className={props.router.query.Type == ("webm" || "mp4" || "mov") ? "col-12 d-flex justify-content-center" : "col-12 d-flex justify-content-center"}
        // style={{ width: props.router.query.Type == ("webm" || "mp4" || "mov") ? "250px" : "100%", height: props.router.query.Type == ("webm" || "mp4" || "mov") ? "250px" : "100%" }}
        //     fileType={props.router.query.Type}
        //     filePath={"/"+getPlatData.aws_link+"briffs/attachments"+downloadUrl}
        //     />
      }
      {/* {(props.router.query.Type == "doc" || props.router.query.Type == "docx" || props.router.query.Type == "DOC" || props.router.query.Type == "DOCX") &&
      //  (props.router.query.OpenIn == "form" &&  <DocViewer documents={downloadUrl} /> )
      ""
      //  (props.router.query.OpenIn == "briffDetail" &&
      //  <iframe className="doc" src={`https://docs.google.com/gview?url=${getPlatData.aws_link}briffs/attachments${downloadUrl}&embedded=true`} width={700} ></iframe>)
      } */}
      {(props.router.query.Type == "wav" || props.router.query.Type == "mp3" || props.router.query.Type == "aac" || props.router.query.Type == "WAV" || props.router.query.Type == "MP3" || props.router.query.Type == "AAC") && 
        <audio controls autoPlay>
        <source src={props.router.query.OpenIn == "form" ? `${downloadUrl}` : `${getPlatData.aws_link}briffs/attachments${downloadUrl}`} type="audio/x-wav" />
      </audio>
      // <embed src={`${getPlatData.aws_link}briffs/attachments${downloadUrl}`} hidden="true" autostart="true" loop="1" />
      }
      
      {(props.router.query.Type == "webm" || props.router.query.Type == "ogg" || props.router.query.Type == "mp4" || props.router.query.Type == "WEBM" || props.router.query.Type == "OGG" || props.router.query.Type == "MP4") &&
        <video width="320" height="240" controls autoPlay>
        <source src={props.router.query.OpenIn == "form" ? `${downloadUrl}` : `${getPlatData.aws_link}briffs/attachments${downloadUrl}`} type="video/mp4" />
        </video>     
      }
        {(props.router.query.Type == "jpg" || props.router.query.Type == "png" || props.router.query.Type == "jpeg" || props.router.query.Type == "jfif" || props.router.query.Type == "gif") &&
            
            <Image src=
            // "https://www.goodfreephotos.com/albums/pakistan/lahore/tower-and-palace-at-sunset-lahore-pakistan.jpg"
            {props.router.query.OpenIn == "form" ? `${downloadUrl}` : `${getPlatData.aws_link}briffs/attachments${downloadUrl}`}
            // layout="fill"
            // sizes="(min-width: 75em) 33vw,
            //   (min-width: 48em) 50vw,
            //   80vw"
             width="600px" 
             height="100%" alt="attachment" />
        }
            {props.router.query.Type == "svg" &&
            <><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns={props.router.query.OpenIn == "form" ? downloadUrl : getPlatData.aws_link+"briffs/attachments"+downloadUrl}>
            {/* <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M10.25 6.75L4.75 12L10.25 17.25"
            /> */}
            {/* <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19.25 12H5"
            /> */}
          </svg>
          <Image src={props.router.query.OpenIn == "form" ? downloadUrl : getPlatData.aws_link+"briffs/attachments"+downloadUrl} width="600px" height="600px" alt="attachment" />            
            </>
            }
            {props.router.query.Type == "csv" &&
            <>
            <object data={props.router.query.OpenIn == "form" ? downloadUrl : getPlatData.aws_link+"briffs/attachments"+downloadUrl} type="text/csv" width="100%" height="100%">
                <p>Alternative text - include a link <a href={props.router.query.OpenIn == "form" ? downloadUrl : "/"+getPlatData.aws_link+"briffs/attachments"+downloadUrl+"?download=false"}>to the CSV!</a></p>
            </object>
            </>} 
            {props.router.query.Type == "xlsx" &&
            <>
            <object data={props.router.query.OpenIn == "form" ? downloadUrl : getPlatData.aws_link+"briffs/attachments"+downloadUrl} type="text/csv" width="100%" height="100%">
                <p>Alternative text - include a link <a href={"/"+getPlatData.aws_link+"briffs/attachments"+downloadUrl+"?download=false"}>to the XLSX!</a></p>
            </object>
            </>}
            
            {/* {props.router.query.Type == "pdf" &&
            <>
                  <iframe className="doc" src={props.router.query.OpenIn == "form" ? `https://docs.google.com/gview?url=${downloadUrl}&embedded=true` : `https://docs.google.com/gview?url=${getPlatData.aws_link}briffs/attachments${downloadUrl}&embedded=true`} width={700}></iframe> */}
{/* <Document file={getPlatData.aws_link+"briffs/attachments"+downloadUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p> */}

            {/* <object data={getPlatData.aws_link+"briffs/attachments"+downloadUrl} type="application/pdf" width="100%" height="100%">
                <p>Alternative text - include a link <a href={"/"+getPlatData.aws_link+"briffs/attachments"+downloadUrl+"?download=false"}>to the PDF!</a></p>
            </object> */}
            {/* </> */}
            {/* } */}
      </div>
    </>
  )
}

export default withRouter(AttachmentViewer)