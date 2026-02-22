import { motion } from "framer-motion";
import { Instagram} from "lucide-react";

interface TeamMember {
  name: string;
  year: string;
  instagram: string;
  linkedin: string;
}

export default function TeamSection(): JSX.Element {

  const team: TeamMember[] = [
    {
      name: "Shaik Mohammad Arif",
      year: "III EEE (23091A0209)",
      instagram: "https://www.instagram.com/mdariif_07_?igsh=dnBmZmpoemdmY2tz_",
      linkedin: "https://www.linkedin.com/in/mohammad-arif-shaik-b06b21328",
    },
    {
      name: "Shaik Mohammad Umar Farook",
      year: "III EEE (24095A0218)",
      instagram: "https://www.instagram.com/__umarrr._?igsh=M21pa29tOHJ5M3Uw",
      linkedin:  ""
    },
    {
      name: "Kattubadi Arshad",
      year: "III EEE (24095A0203)",
      instagram: "https://www.instagram.com/arshxd.25?igsh=MWZpaTlnejE2aGJydw==",
      linkedin: "https://www.linkedin.com/in/kattubadi-arshad-7b67432b6";
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

              {/* Name */}
              <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                {member.name}
              </h3>

              {/* year*/}
              <p className="text-primary mt-1 text-xs sm:text-sm capitalize">
                {member.role}
              </p>

              {/* Socials */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-5">


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
                  href={member.linkedin}
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
                  <linkedin size={16} />
                </a>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}
