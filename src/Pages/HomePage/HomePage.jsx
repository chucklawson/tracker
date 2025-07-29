import React from "react";
//import {useEffect, useState, useCallback} from "react";
import {useEffect, useState} from "react";
//import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles";
//import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";
//import { loadConfettiPreset } from "tsparticles-preset-confetti";
//import { loadFountainPreset } from "tsparticles-preset-fountain";
//import { loadBubblesPreset } from "tsparticles-preset-bubbles";

function HomePage(){
    const [headerValue,setHeaderValue] = useState('Howdy !')
    useEffect(() => {
        document.title = "Home"
     }, []);

     /*
     const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    */

    const options = {
        //preset: "seaAnemone",
        //preset: "confetti",
        //preset: "fountain",
        preset: "bubbles",
        fullScreen: {enable: true,
            zIndex: -1,
        },  
      };
      const initialize = (tsparticles) => {
        //loadSeaAnemonePreset(tsparticles);
        //loadConfettiPreset(tsparticles)
        //loadFountainPreset(tsparticles)

        //loadBubblesPreset(tsparticles)
      };

return(
    
    <div className="text-center">
        <header className="bg-green-100 text-green-600 text-3xl font-bold h-20 justify-items-center p-5">
            <div>
                {headerValue}
            </div> 
      </header>

        {/*
       <div  className='h-full w-full'>
        */}
        {/*
            <Particles options={options} init={initialize} />
        */}
        {/*
       <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                },
                fullScreen: {enable: true,
                    zIndex: -1,
                },                
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
        

        </div> 
        */}
        
      </div>
    )
}
export default HomePage;