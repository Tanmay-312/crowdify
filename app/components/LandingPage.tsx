/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { AudioLines, Headphones, PauseCircle, PlayCircle, XIcon } from 'lucide-react'
import React, { useRef, useState, useEffect } from 'react'
import { motion } from "motion/react"
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { StickyScrollRevealDemo } from './StickyScrollContent'
import Link from 'next/link'
import Navbar from './Navbar'
import { signIn } from "next-auth/react"


const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
    const elements = [
        {
          top: "top-20",
          left: "left-64",
          bgColor: "bg-white w-fit h-fit",
          image: "/diljit.jpg",
          alt: "Diljit Dosangh",
          song: "/audio/BornToShine.mp3", 
        },
        { 
            top: "top-[23rem]", 
            left: "left-28", 
            bgColor: "w-fit bg-white h-[28vh]",
            image: "/ap.webp",
            alt: "Ap Dhillon",
            song: "/audio/Brown.mp3", 
        },
        { 
            top: "top-[35rem]", 
            left: "left-[24rem]", 
            bgColor: "w-[13vw] h-fit",
            image: "/sidhu3.jpg",
          alt: "Sidhu", 
          song: "/audio/SameBeef.mp3", 
        },
        { 
            top: "top-20", 
            right: "right-64", 
            bgColor: "w-[13vw] h-[25vh]",
            image: "/snoop2.jpg",
            alt: "Snoop Dog",
            song: "/audio/snoop.mp3", 
         },
        { 
            top: "top-[22rem]", 
            right: "right-32", 
            bgColor: "w-[18vw] h-[23vh]",
            image: "/yoyo.jpg",
            alt: "Yo Yo Honey Singh",
            song: "/audio/Millionaire.mp3", 
         },
        { 
            top: "top-[35rem]", 
            right: "right-[28rem]", 
            bgColor: "w-[13vw] h-[25vh]",
            image: "eminem.webp",
            alt: "Eminem",
            song: "/audio/RapGod.mp3",  
        },
      ];

      const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
      const togglePlay = (index: number | null, song: string) => {
        if(playingIndex === index){
            if (index !== null && audioRefs.current[index]) {
                audioRefs.current[index].pause();
            }
            setPlayingIndex(null);
        }else{
            if (playingIndex !== null && audioRefs.current[playingIndex]) {
                audioRefs.current[playingIndex]?.pause();
            }
            if (typeof index === 'number') {
                audioRefs.current[index]?.play();
            }
            setPlayingIndex(index);
        }
      }
      const arrow = {
        initial: { opacity: 0 },
        animate: { opacity: 0 },
        whileHover: { opacity: 1 },
      };

      // Function to determine size based on windowSize
      const getAudioLinesSize = () => {
        if (windowSize.width < 768) return 50;
        if (windowSize.width < 1024) return 90;
        return 125;
      };

      useEffect(() => {
        // Only run on client-side
        if (typeof window !== 'undefined') {
          const handleResize = () => {
              setWindowSize({
                  width: window.innerWidth,
                  height: window.innerHeight,
              });
          };

          // Set initial size
          handleResize();
          
          // Add event listener
          window.addEventListener('resize', handleResize);
          
          // Clean up event listener
          return () => window.removeEventListener('resize', handleResize);
        }
      }, []);


  return (
    <>
    {/* section 1 */}
    {/* <Navbar /> */}
    <Navbar />
    <div className='flex flex-col w-screen h-screen fixed top-0 z-10 items-center justify-center'>
    <div className="w-fit h-fit font-funnel flex items-center justify-center leading-none text-[12vw] sm:text-[9vw] lg:text-[7vw] text-white">
      <span>Cr</span> 
      
      {/* Hide Audio Icon on Small Screens */}
      <motion.span 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        className="p-3 border-2 mx-2 rounded-full mt-4 md:mt-6 sm:block"
      >
        <AudioLines size={getAudioLinesSize()} className="text-white" />
      </motion.span>

      <span>wdify</span>
    </div>

    <div>
      {elements.map(({ top, left, right, bgColor, image, alt, song }, index) => (
        <motion.div
          key={index}
          drag
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className={`absolute ${top} ${left || right} overflow-hidden border-2 cursor-grab ${bgColor} rounded-md hidden sm:block`}
        >
          <img
            src={image}
            className="w-full h-full object-cover pointer-events-none"
            alt={alt}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3))",
            }}
          >
            <button 
              className='flex items-center justify-center w-full h-full' 
              onClick={() => togglePlay(index, song)}
            >
              {playingIndex === index ? (
                <PauseCircle size={50} className="text-white" />
              ) : (
                <PlayCircle size={50} className="text-white" />
              )}
            </button>
          </motion.div>

          {song && (
            <audio ref={(el) => { audioRefs.current[index] = el; }} src={song} />
          )}

          {playingIndex === index && (
            <div 
              className="absolute bottom-0 py-3 left-1/2 transform w-full justify-center -translate-x-1/2 rotate-180 flex space-x-1" 
              style={{
                background: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3))",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 25, 15, 30, 20, 10] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    delay: i * 0.8,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-white"
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
</div>


  {/* Content section */}
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
    className='h-fit flex justify-center rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[4rem] pt-8 md:pt-12 w-screen z-20 mt-[180%] md:mt-[100%] bg-black text-white'
>
    <div className="flex flex-col items-center leading-none px-4">
        <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-[8vw] font-semibold font-roboto text-[#bbbbbb] tracking-tight"
        >
            Let Your
        </motion.h3>
        
        <div className="w-fit h-fit font-funnel flex items-center justify-center leading-none text-[14vw] md:text-[16vw] lg:text-[18vw] text-white">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
                Cr
            </motion.span> 
            <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.1, 1], opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="p-2 md:p-3 border-2 mx-1 md:mx-2 rounded-full mt-6 md:mt-10 lg:mt-16"
            >
                <AudioLines 
                    size={getAudioLinesSize()} 
                    className="text-white"
                />
            </motion.span>
            <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
                wd
            </motion.span>
        </div>
        
        <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className='text-[5vw] md:text-[6vw] font-semibold font-roboto text-[#bbbbbb] mt-2 md:mt-4'
        >
            Decide What You <span className='font-funnel'>Hear</span>
        </motion.h3>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-12 mb-8"
        >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="px-6 py-3 md:px-8 md:py-4 bg-[#222222] text-white rounded-full font-funnel text-lg md:text-xl"
                onClick={() => signIn()}
            >
                Start Listening
            </motion.button>
        </motion.div>
    </div>
</motion.div>


    {/* section 5 */}
    <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full h-fit py-6 md:py-9 px-4 bg-black z-30"
            >
                <div className="w-full h-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 md:py-8 bg-[#b3b3b3] rounded-2xl text-center md:text-left">
                    <h1 className="font-semibold font-funnel text-sm md:text-base">
                        jain2002tj@gmail.com <br />
                        © 2025 India. All rights reserved.
                    </h1>
                    <Link
                        href="https://github.com/Tanmay-312"
                        className="flex gap-1 font-funnel font-semibold hover:underline mt-4 md:mt-0 text-sm md:text-base"
                    >
                        <motion.span
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Build with 💙 by Tanmay Jain
                        </motion.span>
                    </Link>
                </div>
            </motion.div>

    </>
  )
}

export default LandingPage