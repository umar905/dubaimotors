import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CarId = () => {
  const navigate = useNavigate()
      const API = 'https://ntbackend.uz/'
    const {id} = useParams()
    const [iduser , setIduser] = useState({})
    const getUserId = async() =>{
        try {
          const res = await axios.get(`${API}api/v1/cars/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setIduser(res.data);
          console.log(res.data);
          
          
          
        } catch (err) {
          console.error(err);
          alert('An error occurred while fetching data.');
        }
      }
      
      
    useEffect(()=>{
      
      getUserId()
    }, [])
    
  return (
    <>
   <div className="otherside">
   <Header/>
        <main className='main2'>
            <div className=" container2">
            <img
                  src={`https://pub-3cc294ad2dda41aca99be0d7c3914919.r2.dev/${iduser?.imageUrl}`}
                  alt="Alternate Text"
                />
                <h1>{iduser?.name} {iduser?.model}</h1>
                <p>{iduser?.description}</p>
                <b>{iduser?.price}$</b>
                <b>{iduser?.status}</b>
                <b>{iduser?.city}</b>
                <b>{iduser?.year}</b>
                <a href={`tel:${iduser.phone}`}>{iduser?.phone}</a>
                <br />
                <a onClick={() => navigate(-1)}>
                  <h2>Back</h2>
                </a>
            </div>
        </main>
        <Footer/>
   </div>
    
    </>
  )
}

export default CarId
