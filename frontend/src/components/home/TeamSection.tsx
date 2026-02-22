import { motion } from "framer-motion";
import { Linkedin, Instagram, Github } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  img: string;
  linkedin: string;
  instagram: string;
}

export default function TeamSection(): JSX.Element {

  const team: TeamMember[] = [
    {
      name: "Shaik Mohammad Arif",
      role: "web developer",
      img: "/images/team/haneef.jpg",
      linkedin: "https://www.linkedin.com/in/shaik-mohammad-haneef-6b3686309",
      instagram: "https://www.instagram.com/mdariif_07_?igsh=dnBmZmpoemdmY2tz_",

    },
    {
      name: "Shaik Mohammad Umar Farook",
      role: "web  Developer",
      img: "/images/team/sandeep.jpg",
      linkedin: "https://www.linkedin.com/in/sandeep-saran-ca",
      instagram: "https://www.instagram.com/__umarrr._?igsh=M21pa29tOHJ5M3Uw",
    },
    {
      name: "Kattubadi Arshad",
      role: "UI Designer & Tester",
      img: "/images/team/sohail.jpg",
      linkedin: "https://www.linkedin.com/in/sohel-hussain-79538b2b7",
      instagram: "https://www.instagram.com/lovelysonu_55",
    },
  ];

  return (

    <section className="relative py-16 sm:py-20 overflow-hidden">

      {/* Background same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-gradient-title">
            Designed &amp; Developed By
          </h2>

          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Meet the technical team behind PRAVAHA-2K26
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">

          {team.map((member, index) => (

            <motion.div
              key={member.name}

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}

              whileHover={{
                y: -8,
              }}

              className="
                w-full max-w-xs sm:max-w-none
                bg-background/60
                backdrop-blur-xl
                border border-primary/20
                rounded-3xl
                p-6 sm:p-8
                text-center
                hover:border-primary/40
                hover:shadow-xl hover:shadow-primary/20
                transition-all duration-500
              "
            >

              {/* Image */}
              <div className="flex justify-center mb-4 sm:mb-5">

                <img
                  src={member.img}
                  alt={member.name}
                  className="
                    w-20 h-20 sm:w-24 sm:h-24
                    rounded-full
                    object-cover
                    border-2 border-primary/30
                  "
                />

              </div>

              {/* Name */}
              <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-primary mt-1 text-xs sm:text-sm capitalize">
                {member.role}
              </p>

              {/* Socials */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-5">

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    p-2 rounded-lg
                    bg-primary/10
                    border border-primary/20
                    hover:text-cyan-400
                    hover:border-cyan-400/40
                    transition
                  "
                >
                  <Linkedin size={16} />
                </a>

                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    p-2 rounded-lg
                    bg-primary/10
                    border border-primary/20
                    hover:text-pink-400
                    hover:border-pink-400/40
                    transition
                  "
                >
                  <Instagram size={16} />
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  className="
                    p-2 rounded-lg
                    bg-primary/10
                    border border-primary/20
                    hover:text-emerald-400
                    hover:border-emerald-400/40
                    transition
                  "
                >
                  <Github size={16} />
                </a>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}
