import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import "../assets/css/Home.css";
import welcome from '../assets/welcome.gif'


const Home = () => {

    return (

        <>
            <div className='form-containerhome'>
                <div className='form-content-lefthome'>
                    <img className='form-imghome' src={welcome} alt='spaceship' />
                </div>

                <div className='form-content-right'>
                    <div className="btnhome">
                        <Link to="/Loginadmin">
                    <button className="form-input-btnhome" type='submit'>
                        Login for Admins
                    </button>
                        </Link>
                    <button className="form-input-btnhome"  type='submit'>
                        Login for Management
                    </button>
                    <button className="form-input-btnhome"  type='submit'>
                        Login for Operators
                    </button>
                    </div>
                </div>

            </div>
        </>


    )
}

export default Home