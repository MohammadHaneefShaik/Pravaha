// src/data/dignitariesData.ts

import chairman from "@/assets/images/chairman.jpeg";
import hod from "@/assets/images/hod.jpeg";
import md from "@/assets/images/md.jpeg";
import principal from "@/assets/images/principal.jpeg";
import lenine from "@/assets/images/lenine.jpeg";
import suresh from "@/assets/images/suresh.jpeg";
import dean from "@/assets/images/dean.jpeg";

export interface Dignitary {
  name: string;
  designation: string;
  institution: string;
  image: string;
  msg: string;
}

export const dignitariesData: Dignitary[] = [
  {
    name: "Dr. M. Santhiramudu",
    designation: "Chairman",
    institution: "RGMCET",
    image: chairman,
    msg: "Welcome to RIPPLE 2K26! A journey of innovation and excellence.",
  },
  {
    name: "M. Siva Ram",
    designation: "Managing Director",
    institution: "RGMCET",
    image: md,
    msg: "Let’s come together to create, collaborate, and celebrate technology.",
  },
  {
    name: "T. Jayachandra Prasad",
    designation: "Principal",
    institution: "RGMCET",
    image: principal,
    msg: "Join us in celebrating the spirit of innovation and creativity.",
  },
  {
    name: "DV. Ashok Kumar",
    designation: "Dean",
    institution: "RGMCET",
    image: dean,
    msg: "RIPPLE 2K26 is the epitome of technical brilliance and teamwork.",
  },
  {
    name: "Dr. V. Naga Bhaskar Reddy",
    designation: "HOD, EEE",
    institution: "RGMCET",
    image: hod,
    msg: "Join us in exploring the forefront of technology and innovation.",
  },
  {
    name: "Dr. D. Lenine",
    designation: "Professor",
    institution: "RGMCET",
    image: lenine,
    msg: "Ripple 2K26 is a celebration of technical creativity and spirit.",
  },
  {
    name: "Mr. Y. Vijaya Suresh",
    designation: "Associate Professor",
    institution: "RGMCET",
    image: suresh,
    msg: "Be part of a journey that transforms ideas into reality.",
  },
];
