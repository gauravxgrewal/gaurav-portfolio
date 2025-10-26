import React from "react";



import { FaHtml5, FaReact, FaLinkedin, FaGithub, FaYoutube, FaPython } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoCss3, IoLogoFirebase } from "react-icons/io5";
import { SiJavascript, SiCplusplus } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

// Components
import InfoCard from "../components/InfoCard";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";


// Data
const skills = [
  { icon: <FaHtml5 size={60} />, text: "HTML", ariaLabel: "HTML5" },
  { icon: <IoLogoCss3 size={40} />, text: "CSS", ariaLabel: "CSS3" },
  { icon: <SiJavascript size={40} />, text: "JavaScript", ariaLabel: "JavaScript" },
  { icon: <FaReact size={40} />, text: "React", ariaLabel: "React" },
  { icon: <RiTailwindCssFill size={40} />, text: "Tailwind", ariaLabel: "Tailwind CSS" },
  { icon: <IoLogoFirebase size={40} />, text: "Firebase", ariaLabel: "Firebase" },
  { icon: <FaPython size={40} />, text: "Python", ariaLabel: "Python" },
  { icon: <SiCplusplus size={40} />, text: "C++", ariaLabel: "C Plus Plus" },


];

const socialLinks = [
  { href: "https://instagram.com", icon: <FaSquareInstagram size={40} />, ariaLabel: "Instagram Profile", text: "Instagram" },
  { href: "https://youtube.com", icon: <FaYoutube size={40} />, ariaLabel: "Youtube Channel", text: "Youtube" },
  { href: "https://github.com", icon: <FaGithub size={40} />, ariaLabel: "GitHub Profile", text: "Github" },
  { href: "https://linkedin.com", icon: <FaLinkedin size={40} />, ariaLabel: "LinkedIn Profile", text: "LinkedIn" },

];

export default function Home() {
  return (

    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-6  h-full gap-4  bg-gray-400">
      {/* Hero Text */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-2 md:col-span-1 lg:row-span-3 p-5">
        <div className="rounded-2xl flex justify-center items-center bg-white h-full p-5 lg:py-5 lg:px-12 text-center md:text-left">
          <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold leading-tight">
            Thinking <span className="text-green-700">awwfull</span> ideas for next project
          </h1>
        </div>
      </section>

      {/* Photo */}
      <section className="bg-[#eaeff5] rounded-2xl p-5 lg:row-span-3">
        <img loading="lazy"
          className="h-full w-full rounded-2xl object-cover object-center"
          src="/hero-img.jpg"
          alt="A portrait of Gaurav"
        />
      </section>

      {/* Skills */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-2 md:col-span-1 lg:row-span-3 p-5">
        <div className="grid lg:grid-cols-4 lg:grid-rows-3 gap-2 h-full">
          <h2 className="flex lg:col-span-4 col-span-2 lg:p-0 p-5 justify-center items-center font-bold text-xl bg-white rounded-2xl">
            I work with
          </h2>
          {skills.map((skill) => (
            <InfoCard key={skill.text} icon={skill.icon} text={skill.text} ariaLabel={`Skill: ${skill.ariaLabel}`} />
          ))}
        </div>
      </section>

      {/* Contact Me */}
      <section className="bg-[#eaeff5] rounded-2xl p-5 lg:row-span-3">
        <div className="grid lg:grid-cols-2 grid-cols-2 lg:grid-rows-3 gap-2 h-full">
          <h2 className="col-span-2  flex p-5  justify-center items-center font-bold text-xl bg-white rounded-2xl">
            Social Media
          </h2>
          {socialLinks.map((link) => (
            <InfoCard key={link.ariaLabel} href={link.href} text={link.text} icon={link.icon} ariaLabel={link.ariaLabel} />
          ))}
        </div>
      </section>

      {/* About Me */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-3 md:col-span-1 lg:row-span-3 p-5">
        <div className="rounded-2xl bg-white h-full flex flex-col justify-center items-center px-16 py-5">
          <h2 className="font-bold text-2xl lg:mb-1 mb-4 w-full text-left ">About Me</h2>

          <div className="text-gray-700 leading-relaxed">
            <p>Hey, I’m Gaurav — I make websites that look nice and work well.</p>
            <p>I’m studying Electronics & Communication, but I really enjoy coding. I use React, Vite, Tailwind, and Firebase to bring ideas to life.</p>
            <p>I build clean and simple interfaces that feel easy to use.</p>
            <p className="hidden lg:block">Most days, I’m designing, fixing small details, or trying to make things work just right.</p>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#eaeff5] rounded-2xl grid grid-rows-3 grid-cols-1 p-5 gap-4 lg:row-span-3">
        <StatCard label="Projects" count={3} />
        <StatCard label="Certificates" count={1} />
        <StatCard label="Experience" count={1} />
      </section>

      <Footer />

    </main>

  );


}