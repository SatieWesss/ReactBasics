import React from 'react';
import './NotFound.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
   return(
       <div className="NotFound">
           <h1 className="NotFound-title"> Ooops ! Page Not Found </h1>
           <Link  to="/" className="NotFound-link"> Go To Homepage </Link>
       </div>
   )
}

export default NotFound;