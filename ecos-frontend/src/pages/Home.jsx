
import { useState } from 'react';
import HomeMain from '../components/homemain/HomeMain';
import TestimonialSec from '../components/TestimonialSec/TestimonialSec';

function Home(props) {
  
  // const [CurrentSelected, getPage] = useState("home");

  // getPage(() => {
  //   const {
  //       CurrentSelected
  //   } = this.state;

  //   switch (CurrentSelected) {
  //       case "home":
  //           return <HomePage />
  //       case "about us":
  //           return <AboutUs name="about us"/>
  //       case "settings":
  //           return <DummyPage name="settings"/>
  //       case "logout":
  //           return <DummyPage name="logout"/>
  //       default:
  //           break;
  //   }
  // });

  return (

        <main>
            <HomeMain />
            <TestimonialSec />
        </main>

  );
} 

export default Home;

