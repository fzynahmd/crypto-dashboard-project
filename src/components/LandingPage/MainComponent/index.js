import React from 'react'
import "./styles.css"
import Button from '../../Common/Button'
import iphone from "../../../assets/iphone.png"
import gradient from "../../../assets/gradient.png"
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";

function MainComponent() {
  return (
    <div className='flex-info'>
        <div className='left-component'>
            <motion.h1 className='track-crypto-heading' 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}>Track Crypto</motion.h1>
            <motion.h1 className='real-time-heading'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 1 }}>Real Time.</motion.h1>
            <motion.p className='crypto-text'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}>Track crypto through a public api in real time. Visit the dashboard to do so !</motion.p>
            <motion.div className='btn-flex'
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.25, duration: 0.75 }}>
                <Link to="/dashboard">
                <Button text={"Dashboard"} onClick={() => console.log("clicked")} />
                </Link>
                <RWebShare
            data={{
              text: "CryptoDashboard made by Avi Vashishta using React JS.",
              url: "https://crypto-dashboard-jan.netlify.app",
              title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
            </motion.div>
        </div>
        <div className='phone-container'>
            <motion.img src={iphone} className='iphone'
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}/>
            <img src={gradient} className='gradient'/>
        </div>
    </div>
  )
}

export default MainComponent