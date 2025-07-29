import React from "react";
import {useEffect, useState, useRef } from "react";
//import Particles from "react-tsparticles";
//import { loadLinksPreset } from "tsparticles-preset-links";
import { useCSVReader } from 'react-papaparse';
import CostBasisVanG from '../../lib/CsvParsers/CostBasisVanG.jsx'

const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    },
    browseFile: {
      width: '20%',
    },
    acceptedFile: {
      border: '1px solid #ccc',
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: '80%',
    },
    remove: {
      borderRadius: 0,
      padding: '0 20px',
    },
    progressBarBackgroundColor: {
      backgroundColor: 'red',
    },
  };

const Simulator = () =>{

    const [headerValue,setHeaderValue] = useState("Let's test something !")
    useEffect(() => {
        document.title = "Simulator"
     }, []);

     /*
     const options = {
        preset: "links",
        fullScreen: {enable: true,
            zIndex: -1,
        },  
      };
      const initialize = (tsparticles) => {
        loadLinksPreset(tsparticles)
      };
      */

      const inputFile = useRef(null) 
      const [file, setFile] = React.useState(null);
      const [csvText, setcsvText] = React.useState('');

      const onReadFileButtonClick = () => {
        // `current` points to the mounted file input element
        // we are using a ref hold the value that comes back
        inputFile.current.click();

        //console.log('inputFile: ' + JSON.stringify(inputFile.current.click()))
      };

      const onChangeHandler=(e)=>{
        //console.log('e.target.files.length: ' + e.target.files.length)
        if (e.target.files.length > 0) {
         let filename = e.target.files[0];
          //console.log(filename)
          setFile(filename);

          let reader = new FileReader();
          reader.onload = function(event) {
            const text = event.target.result
            setcsvText(text)            
          };

        reader.readAsText( filename);
        }
      }
        
      useEffect( ()=>{
        
        let aCostBasisVanG=new CostBasisVanG(csvText)
            aCostBasisVanG.parseTextIn()

        },[csvText]);

return(
    <div>
    <div className="text-center">
        <header className="bg-orange-100 text-orange-600 text-3xl font-bold h-18 justify-items-center p-5">
            <div>
                {headerValue}
            </div> 
        </header>
        {/*
      <div className='h-full w-full'>
        <Particles options={options} init={initialize} />
      </div>
        */}
      </div>

    
      <div>
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}}
                onChange={onChangeHandler}/>
        <button onClick={onReadFileButtonClick}>Open file upload window</button>
      </div>
    
        {/*
      <div>
      <CSVReader
      onUploadAccepted={(results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
            
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
      </div>
      */}

      </div>

    )
}
export default Simulator;