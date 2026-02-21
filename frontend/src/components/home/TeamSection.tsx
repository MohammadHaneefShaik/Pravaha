import { motion } from "framer-motion";
import {  Instagram } from "lucide-react";

interface TeamMember {
  name: string;
  img: string;
  instagram: string;
}

export default function TeamSection(): JSX.Element {

  const team: TeamMember[] = [
    {
      name: "Shaik Mohammad Arif",
      instagram: "https://www.instagram.com/mdariif_07_?igsh=dnBmZmpoemdmY2tz_",

    },
    {
      name: "Shaik Mohammad Umar Farook",
      instagram: "https://www.instagram.com/__umarrr._?igsh=M21pa29tOHJ5M3Uw",
    },
    {
      name: "Kattubadi Arshad",
      instagram: "https://www.instagram.com/arshxd.25?igsh=MWZpaTlnejE2aGJydw==",
    },
  ];

  return (

    <section className="relative py-20 overflow-hidden">

      {/* Background same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 container mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-gradient-title">
            Designed & Developed By
          </h2>

          <p className="text-muted-foreground mt-3">
            Meet the technical team behind PRAVAHA-2K26
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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
                bg-background/60
                backdrop-blur-xl
                border border-primary/20
                rounded-3xl
                p-8
                text-center
                hover:border-primary/40
                hover:shadow-xl hover:shadow-primary/20
                transition-all duration-500
              "
            >

              {/* Name */}
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>

              {/* Socials */}
              <div className="flex justify-center gap-4 mt-5">

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
                  <Instagram size={18} />
                </a>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}
