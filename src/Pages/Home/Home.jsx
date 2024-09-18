import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";

const Home = () => {
  const {t} = useTranslation()
  const [comment , setComment] = useState([])
  const [mycomment , setMycomment] = useState([])
  const [editComment, setEditComment] = useState("");
  const [editId, setEditId] = useState(null);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const API = 'https://ntbackend.uz/'
  const headers = {
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = (commentId, currentDescription) => {
    setEditId(commentId);
    setEditComment(currentDescription);
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    try {
      const res = await axios.get(`${API}api/v1/cars`, {
       
      });
      setCars(res.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching data.');
    }
  };

  const getComments = async() =>{
    try {
      const res = await axios.get(`${API}api/v1/suggestions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComment(res.data);
      
      
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching data.');
    }
  }


  const updateComment = async () => {
    if (!editId || !editComment) return;

    try {
      const res = await axios.patch(`${API}api/v1/suggestions/${editId}`, {
        description: editComment
      }, { headers });

      if (res.status === 200) {
        alert("Comment updated successfully.");
        getComments(); // Refresh comments after update
        handleClose(); // Close modal
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the comment.');
    }
  };
  const ID = localStorage.getItem('userId')
  const filteredComments = ID ? comment.filter(comment => comment.userId === ID) : [];
  
  

  const commentForm = (e) => {
    e.preventDefault();
  
    // Define headers
  
    
    const data = {
      name: e.target[0].value,
      phone: e.target[1].value,
      description: e.target[2].value
    };
  
    
    axios.post(`${API}api/v1/suggestions`, data, { headers })
      .then((res) => {
        if (res.status === 200) {
          alert('Form submitted successfully: ' + res.data);
        }
      })
      .catch((err) => {
        console.error('There was an error!', err);
        alert('An error occurred while submitting the form. Please try again later.');
      });
  };

  // console.log(comment );
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      
    } else {
      
      getComments();
    }
      getCars();
    
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="section">
          <div className="container">
            <video autoPlay loop muted className="video">
              {" "}
              <source
                src="https://dubaimotor.uz/video/bugatti-divosssss.mp4"
                type="video/mp4"
              />
            </video>
            <div className="hero_info">
              <p className="text-white">{t("main.section1.p")}</p>

              <h1 className="text-white mb-5">{t("main.section1.h1")}</h1>

              <button className="btn custom-btn smoothscroll" href="#section_3">
                <a href="#cars">{t("main.section1.button")}</a>
              </button>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="container">
            <div className="info_company">
              <div className="date-wrap">
                <h5 className="text-white">
                  <FaRegClock className="socilmediaIcons" />
                  9:00 - 18:00 <sup>AM</sup>
                </h5>
              </div>

              <div className="location-wrap mx-auto py-3 py-lg-0">
                <h5 className="text-white">
                  <FaLocationDot className="socilmediaIcons" />
                  Toshkent, O'zbekiston
                </h5>
              </div>

              <div className="social-share">
                <ul className="social-icons">
                  <b className=" me">{t("main.section2.b")}</b>

                  <li className="social-icon-item">
                    <Link
                      to="https://wa.me/+998990090909"
                      className="social-icon-link"
                    >
                      <FaWhatsapp className="socilmediaIcons" />
                    </Link>
                  </li>

                  <li className="social-icon-item">
                    <Link
                      to="https://t.me/timeuznews"
                      className="social-icon-link"
                    >
                      <FaTelegram className="socilmediaIcons" />
                    </Link>
                  </li>

                  <li className="social-icon-item">
                    <Link
                      to="https://instagram.com/dubaimotor.uz"
                      className="social-icon-link"
                    >
                      <FaInstagram className="socilmediaIcons" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="section3" id="aboutus">
          <div className="container">
            <div className="sec3info">
              <div className=" ">
                <div className="services-info">
                  <h1 className="text-white mb-4">
                    {t("main.section3.h1")}
                  </h1>

                  <p className="text-white">
                    {t("main.section3.p1")}
                  </p>

                  <h6 className="text-white mt-4">{t("main.section3.h6")}</h6>

                  <p className="text-white">
                      {t("main.section3.p2")}
                    </p>
                </div>
              </div>

              <div className=" imgsec">
                <div className="about-text-wrap">
                  <img
                    src="https://dubaimotor.uz/images/banner_about.jpg"
                    className="about-image img-fluid"
                  />

                  <div className="about-text-info d-flex">
                    <div className="d-flex">
                      <i className="about-text-icon bi-person"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section4" id="#cars">
          <div className="container">
            <div className="col-12 text-center">
              <h2 className="mb-4">{t("main.section4.h2")}</h2>
            </div>

            <div className="allcars" id="cars">
              {cars.map((el)=>{
              return(
                <div className="cars">
                <div className="card">
                  <div className="card-image">
                <img
                  src={`https://pub-3cc294ad2dda41aca99be0d7c3914919.r2.dev/${el.imageUrl[0]}`}
                  alt="Alternate Text"
                />
              </div>
              <div className="car-info">
                    <span className="card-detail-badge">{el.status}</span>
                    <span className="card-detail-badge">{el.price}</span>
                    <span className="card-detail-badge">{el.year}</span>
              </div>
              <div className="card-body text-center">
                    <div className="ad-title m-auto">
                      <h5>{el.model} {el.name}</h5>
                    </div>
                    <Link className="ad-btn" to={`/mycar/${el._id}`}>
                      more
                    </Link>
                  </div>
                </div>
              </div>
              )

              })}
            </div>
          </div>
        </div>
        <div className="section5" id="call">
          <div className="container">
            <h2 className="ourteam">{t("main.section5.h2")}</h2>
            <div className="teamlists">
              <div className="teams">
                <div className="teaminfo">
                  <img
                    src="https://dubaimotor.uz/images/aboutus/pro.jpg"
                    width={"268px"}
                    height={"268px"}
                    alt=""
                  />
                  <h5 className="nameofteam pt-4">{t("main.section5.name1")}</h5>
                  <p>{t("main.section5.work1")}</p>
                  <div className="social-box">
                    <a href="https://wa.me/+998946212222" className="link">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://instagram.com/dubaimotor.uz"
                      className="link ms-2"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://t.me/+998990090909" className="link ms-2">
                      <i className="fa-brands fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="teams">
                <div className="teaminfo">
                  <img
                    src="https://dubaimotor.uz/images/aboutus/pro.jpg"
                    width={"268px"}
                    height={"268px"}
                    alt=""
                  />
                  <h5 className="nameofteam pt-4">{t("main.section5.name2")}</h5>
                  <p>{t("main.section5.work2")}</p>
                  <div className="social-box">
                    <a href="https://wa.me/+998946212222" className="link">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://instagram.com/dubaimotor.uz"
                      className="link ms-2"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://t.me/+998990090909" className="link ms-2">
                      <i className="fa-brands fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="teams">
                <div className="teaminfo">
                  <img
                    src="https://dubaimotor.uz/images/aboutus/pro.jpg"
                    width={"268px"}
                    height={"268px"}
                    alt=""
                  />
                  <h5 className="nameofteam pt-4">{t("main.section5.name3")}                 </h5>
                  <p>{t("main.section5.work3")}</p>
                  <div className="social-box">
                    <a href="https://wa.me/+998946212222" className="link">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://instagram.com/dubaimotor.uz"
                      className="link ms-2"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://t.me/+998990090909" className="link ms-2">
                      <i className="fa-brands fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="teams">
                <div className="teaminfo">
                  <img
                    src="https://dubaimotor.uz/images/aboutus/pro.jpg"
                    width={"268px"}
                    height={"268px"}
                    alt=""
                  />
                  <h5 className="nameofteam pt-4">{t("main.section5.name4")}</h5>
                  <p>{t("main.section5.work4")}</p>
                  <div className="social-box">
                    <a href="https://wa.me/+998946212222" className="link">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://instagram.com/dubaimotor.uz"
                      className="link ms-2"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://t.me/+998990090909" className="link ms-2">
                      <i className="fa-brands fa-telegram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section6">
          <div className="container">
            <Tabs>
              <div className="comments">
                <h2 className="comment_heading">{t("main.section6.h2")}</h2>
                <nav className="d-flex justify-content-center">
                  <TabList className={"tabs-nav"}>
                    <div
                      className="nav nav-tabs align-items-baseline justify-content-center"
                      id="nav-tab"
                      role="tablist"
                    >
                      <Tab
                        className="nav-link active"
                        id="nav-ContactForm-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-ContactForm"
                        type="button"
                        role="tab"
                        aria-controls="nav-ContactForm"
                        aria-selected="true"
                      >
                        <h5>{t("main.section6.btn1")}</h5>
                      </Tab>
                      <Tab
                        className="nav-link"
                        id="nav-ContactMap-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-ContactMap"
                        type="button"
                        role="tab"
                        aria-controls="nav-ContactMap"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <h5>{t("main.section6.btn2")}</h5>
                      </Tab>
                      <Tab
                        className="nav-link"
                        id="nav-ContactMap-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-ContactMap"
                        type="button"
                        role="tab"
                        aria-controls="nav-ContactMap"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <h5>{t("main.section6.btn3")}</h5>
                      </Tab>
                    </div>
                  </TabList>
                </nav>
                <div className="tab-content shadow-lg mt-5" id="nav-tabContent">
                  <TabPanel>
                    <div
                      className="tab-pane fade active show"
                      id="nav-ContactForm"
                      role="tabpanel"
                      aria-labelledby="nav-ContactForm-tab"
                    >
                      <form
                        className="custom-form contact-form mb-5 mb-lg-0"
                        action="/form_dubai"
                        method="post"
                        role="form"
                        onSubmit={commentForm}
                      >
                        <div >
                          <div className="contact-form-body">
                           <div className="inp-containers">
                           <div className="inp-container">
                              <label
                                htmlFor="contact-name"
                                className="form-label"
                              >
                                {t("main.section6.inpLabel1")}
                              </label>
                              <input
                                
                                type="text"
                                name="contact_name"
                                id="contact-name"
                                className="form-control"
                                placeholder={t("main.section6.inpPlec1")}
                                required
                              />
                            </div>
                            <div className="inp-container">
                              <label
                                htmlFor="contact-number"
                                className="form-label"
                              >
                                {t("main.section6.inpLabel2")}
                              </label>
                              <input
                                type="text"
                                name="contact_number"
                                id="contact-number"
                                className="form-control"
                                placeholder="+998(99)009-09-09"
                                required
                              />
                            </div>
                           </div>
                            <div className="inp-messege inp-container
">
                              <label
                                htmlFor="contact-message"
                                className="form-label"
                              >
                                {t("main.section6.inpLabel3")}
                              </label>
                              <textarea
                                name="contact_message"
                                rows="3"
                                className="form-control"
                                id="contact-message"
                                placeholder={t("main.section6.inpPlec3")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-10 col-8 mx-auto">
                            {localStorage.getItem('token') ?(
                            <button type="submit" className="form-control BTN-22">
                            {t("main.section6.formbtn")}
                            </button>

                            ):  <button type="submit" className="form-control BTN-22">
                            <a href="/login">Login</a>
                            </button>}
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabPanel>
                  <TabPanel className={'map-case'}>
                    <div
                      className="tab-pane fade"
                      id="nav-ContactMap"
                      role="tabpanel"
                      aria-labelledby="nav-ContactMap-tab"
                    >
                      <iframe
                        className="google-map"
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=zarhal media&amp;t=p&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </TabPanel>
                  <TabPanel className={'map-case'}>
                    <div
                      className="tab-pane fade"
                      id="nav-ContactMap"
                      role="tabpanel"
                      aria-labelledby="nav-ContactMap-tab"
                    >
                      {filteredComments.map((el)=>{
                        return(
                          <>
                            <div className="commentsw comments">
                                <h2>{el.description}</h2>
                                <Button onClick={() => handleOpen(el._id, el.description)}>Edit</Button>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </TabPanel>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
        
      </main>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="modal-box">
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Edit Comment
    </Typography>
    <input 
      type="text" 
      value={editComment} 
      onChange={(e) => setEditComment(e.target.value)} 
      className="modal-input"
    />
    <Button onClick={updateComment} className="modal-button">Save</Button>
  </Box>
</Modal>

    <Footer/>
    </>
  );
};

export default Home;
