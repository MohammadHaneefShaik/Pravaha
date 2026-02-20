import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dignitariesData } from "@/components/home/organizers";

interface Dignitary {
  name: string;
  designation: string;
  institution: string;
  image: string;
  msg?: string;
}

export default function DignitaryGallery(): JSX.Element {

  const [index, setIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile
  useEffect(() => {

    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  // Auto slide
  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev: number) =>
        prev === dignitariesData.length - 1 ? 0 : prev + 1
      );

    }, isMobile ? 4000 : 6000);

    return (): void => clearInterval(interval);

  }, [isMobile]);

  const sir: Dignitary = dignitariesData[index];

  return (

    <section className="relative py-16">

      <div className="container mx-auto px-4">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-orbitron font-bold text-primary">
            Dignitary Messages
          </h2>

          <p className="text-muted-foreground mt-2">
            Inspiring words from our leadership
          </p>

        </div>

        <div className="flex justify-center">

          <AnimatePresence mode="wait">

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background/60 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-8"
            >

              {/* IMAGE */}
              <img
                src={sir.image}
                alt={sir.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-primary/30"
              />

              {/* TEXT */}
              <div>

                <h3 className="text-2xl font-bold text-white">
                  {sir.name}
                </h3>

                <p className="text-primary font-semibold">
                  {sir.designation}
                </p>

                <p className="text-muted-foreground">
                  {sir.institution}
                </p>

                {sir.msg && (
                  <p className="italic text-muted-foreground mt-3">
                    "{sir.msg}"
                  </p>
                )}

              </div>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

    </section>

  );
}
