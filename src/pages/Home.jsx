import React from "react";
import { FaHtml5, FaReact, FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaYoutube, FaPython } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoCss3, IoLogoFirebase } from "react-icons/io5";
import { SiJavascript, SiCplusplus } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

// Components
import InfoCard from "../components/InfoCard";
import StatCard from "../components/StatCard";


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
  { href: "https://instagram.com", icon: <FaSquareInstagram size={40} />, ariaLabel: "Instagram Profile" },
  { href: "https://youtube.com", icon: <FaYoutube size={40} />, ariaLabel: "Youtube Channel" },
  { href: "https://github.com", icon: <FaGithub size={40} />, ariaLabel: "GitHub Profile" },
  { href: "https://linkedin.com", icon: <FaLinkedin size={40} />, ariaLabel: "LinkedIn Profile" },
];

export default function Home() {
  return (

    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-6  h-full gap-4  bg-gray-400">


      {/* Hero Text */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-2 md:col-span-1 lg:row-span-3 p-5">
        <div className="rounded-2xl flex justify-center items-center bg-white h-full p-5 text-center md:text-left">
          <h1 className="text-5xl md:text-4xl font-bold leading-tight">
            Thinking <span className="text-green-700">awwfull</span> ideas for next project
          </h1>
        </div>
      </section>

      {/* Photo */}
      <section className="bg-[#eaeff5] rounded-2xl p-5 lg:row-span-3">
        <img
          className="h-full w-full rounded-2xl object-cover object-center"
          src="/hero-img.jpg"
          alt="A portrait of Gaurav"
        />
      </section>

      {/* Skills */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-2 md:col-span-1 lg:row-span-3 p-5">
        <div className="grid lg:grid-cols-4 grid-cols-3 grid-rows-3 gap-2 h-full">
          <h2 className="flex lg:col-span-4 col-span-3  justify-center items-center font-bold text-xl bg-white rounded-2xl">
            I work with
          </h2>
          {skills.map((skill) => (
            <InfoCard key={skill.text} icon={skill.icon} text={skill.text} ariaLabel={`Skill: ${skill.ariaLabel}`} />
          ))}
        </div>
      </section>

      {/* Contact Me */}
      <section className="bg-[#eaeff5] rounded-2xl p-5 lg:row-span-3">
        <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full">
          <h2 className="col-span-2 flex justify-center items-center font-bold text-xl bg-white rounded-2xl">
            Social Media
          </h2>
          {socialLinks.map((link) => (
            <InfoCard key={link.ariaLabel} href={link.href} icon={link.icon} ariaLabel={link.ariaLabel} />
          ))}
        </div>
      </section>

      {/* About Me */}
      <section className="bg-[#eaeff5] rounded-2xl lg:col-span-3 md:col-span-1 lg:row-span-3 p-5">
        <div className="rounded-2xl bg-white h-full flex flex-col justify-center items-center p-5 ">
          <h2 className="font-bold text-2xl mb-4 w-full text-left ">About Me</h2>
          <div className="text-gray-700 leading-relaxed  ">
            Hey, I’m Gaurav — I build things for the web that look good and feel right.
            I’m studying Electronics & Communication, but code’s where I really come alive. React, Vite, Tailwind, and Firebase are the tools I use to bring ideas to life.
            I like interfaces that speak quietly — clean, clever, and human.
            <p className="hidden lg:block">Most days I’m either designing, tweaking pixels, or chasing that “this just works” moment.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#eaeff5] rounded-2xl grid grid-rows-3 grid-cols-1 p-5 gap-4 lg:row-span-3">
        <StatCard label="Projects" count={1} />
        <StatCard label="Certificates" count={4} />
        <StatCard label="Experience" count={1} />
      </section>
    </main>
  );
}