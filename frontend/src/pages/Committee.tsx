import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const technicalTeams = [
    {
        sno: 1,
        team: "PAPER PRESENTATION",
        organizers: ["S.MD.Arif", "V.Mounesh", "N.Ayyappa Reddy", "K.Venkata Harini", "Y.Vishwanth", "S.Salman"],
        mobiles: ["9398875293", "7569359885", "6300672089", "8374068843", "7893676810", ""],
        committeeHead: ["Dr.D.Lenine", "Mr.T.Ashok Kumar", "Mr.G.Siva Krishna"],
    },
    {
        sno: 2,
        team: "POSTER PRESENTATION",
        organizers: ["K.Chaitanya Kumar", "K.Santhosh Kumar", "Y.Jahnavi", "N.Bharath Kumar", "P.Harish Kumar Reddy", "T.Banu Deekshitha"],
        mobiles: ["9390628457", "6302495127", "9398682670", "7989228310", "9014989985", ""],
        committeeHead: ["Dr.J.Surya Kumari", "Dr.V.Narasimhulu"],
    },
    {
        sno: 3,
        team: "PROJECT EXPO",
        organizers: ["B.Swetha Dimpul", "S.Sindura", "V.Viswasipi", "P.Anand Bhupathi Raju", "C.Mohith Kumar", "P.Sreenivasulu"],
        mobiles: ["8121295602", "8074442944", "6305146493", "8142254931", "6304843866", ""],
        committeeHead: ["Mr.G.Kumara Swamy", "Mr.J.Nagarjuna Reddy"],
    },
    {
        sno: 4,
        team: "CODING",
        organizers: ["P.Kathyayani", "D.Likith Kumar", "K.Arshad", "V.Siva Rama Krishna", "N.Venkata Narayana", "K.Ganesh"],
        mobiles: ["9398020336", "9441066252", "8179479455", "9019069186", "8555822945", ""],
        committeeHead: ["Mr.Y.Vijaya Suresh", "Mr.E.Narasimhulu"],
    },
    {
        sno: 5,
        team: "CIRCUIT TWISTING",
        organizers: ["R.Siva Nanda Reddy", "V.Pravallika", "G.Harsha Vardhan Reddy", "M.Prem Sudhakar", "C.VaraLakshmi", "S.Dilshad"],
        mobiles: ["8309246760", "9182290655", "9059820609", "8977563727", "9063760676", ""],
        committeeHead: ["Mr.P.Sai Sampath Kumar", "Mr.P.Sesi Kiran"],
    },
    {
        sno: 6,
        team: "TECHNICAL QUIZ",
        organizers: ["P.Firoza Shabnam", "M.Deepika", "P.Thimothy Babu", "P.Jagadish", "A.Khaja Hussain Khan", "V.Sireesha"],
        mobiles: ["8500602016", "8978224811", "6301475328", "6304002005", "9949407041", ""],
        committeeHead: ["Mr.E.Narasimhulu", "Mr.P.Kasi Rao", "Ms.G.Priyanaka"],
    },
    {
        sno: 7,
        team: "LOGO DESIGN",
        organizers: ["S.MD.Umar Farook", "D.Bhavana", "T.Jagadeesh", "M.Trishanjali", "S.Salmi Omer", "I.Divyasree"],
        mobiles: ["9014185582", "9440326488", "9515711467", "6303054035", "9676628270", ""],
        committeeHead: ["Mr.R.Satish Kumar", "Mr.K.Prahalada Reddy"],
    },
    {
        sno: 8,
        team: "EV SPARK",
        organizers: ["P.Firoz Khan", "D.M.Hemanth", "A.Ramana", "M.Suveni", "K.Ram Charan", "S.Afreen"],
        mobiles: ["9133715935", "8333855162", "6303881354", "8519926820", "7386987505", ""],
        committeeHead: ["Dr.V.Naga Bhaskar Reddy", "Dr.A.Suresh Kumar", "Mr.K.Prahalada Reddy"],
    },
];

const additionalTeams = [
    {
        sno: 1,
        team: "INVITATION",
        organizers: ["B. Malika", "S. Sai Vikas", "R. Lakshmi Bhavani", "F.Lalitha", "T.Yuvaraena", "S. Bala Murali", "D. Aravind", "Shaik Sawood"],
        mobiles: ["6391679076", "7549541832", "7989745834", "9182261718", "9390682068", "6399269836", "9014128776", "9490310109"],
    },
    {
        sno: 2,
        team: "STAGE DECORATION",
        organizers: ["V. Aparna Reddy", "P. Pramod Kumar Reddy", "T. Shiny Kanuka", "J. Vinoda", "A. Binduja", "R. Pranav Kashyap", "B. Bhavitha", "M. Akhila", "D. Kavya", "N. Vaishnavi", "M. Vandana", "Y. Shrutha", "M. V. Poojitha Reddy", "Y. Vasuthika", "P. UMha Sai"],
        mobiles: ["8500710953", "9550676483", "9347786287", "8780840058", "8088323018", "9850097878", "9110583346", "7842793121", "9398503969", "8888994708", "8688011413", "6310977148", "8009537374", "7993895058", "6310260677"],
    },
    {
        sno: 3,
        team: "VIDEO EDITING",
        organizers: ["K. Lokeshwar Rao", "K. Sanjiva", "T. Venkata Subramanjam", "M. Thenm", "S. Sameet", "Varushi Krishna"],
        mobiles: ["6309595189", "9391434805", "6281001271", "6309291020", "8347796637", "8142325962", "9177448808"],
    },
    {
        sno: 4,
        team: "RANGOLI",
        organizers: ["J. Ruparani", "B. Manasa", "D. Saneha", "B. Namitha"],
        mobiles: ["9963685388", "9963678138", "9003117271", "8125874816"],
    },
];

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.45, ease: "easeOut" },
    }),
};

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

/** Glassy section heading */
const SectionHeading = ({ title }: { title: string }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-10 mt-4"
    >
        <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400 pb-1">
            {title}
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
    </motion.div>
);

/** Glassmorphism table wrapper */
const GlassTable = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.12)] backdrop-blur-sm">
        <table className="w-full text-sm border-collapse">{children}</table>
    </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border-b border-white/10">
        {children}
    </th>
);

const Td = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
    <td className={`px-4 py-3 text-muted-foreground border-b border-white/5 align-top ${center ? "text-center" : ""}`}>
        {children}
    </td>
);

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
const Committee = () => {
    return (
        <Layout>
            {/* ── HERO ── */}
            <section className="pt-24 sm:pt-32 pb-10 text-center px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400 leading-tight"
                >
                    Committee
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto"
                >
                    Meet the dedicated team behind PRAVAHA-2K26.
                </motion.p>
            </section>

            {/* ══════════════════════════════════════
          TECHNICAL TEAM ORGANIZERS
      ══════════════════════════════════════ */}
            <section className="py-10 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <SectionHeading title="Technical Team Organizers" />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <GlassTable>
                            <thead>
                                <tr>
                                    <Th>S.No.</Th>
                                    <Th>Team</Th>
                                    <Th>Student Organizers</Th>
                                    <Th>Mobile</Th>
                                    <Th>Committee Head</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {technicalTeams.map((t, i) => (
                                    <motion.tr
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        className="hover:bg-primary/5 transition-colors"
                                    >
                                        <Td center>{t.sno}</Td>
                                        <Td>
                                            <span className="font-semibold text-primary/80">{t.team}</span>
                                        </Td>
                                        <Td>
                                            {t.organizers.map((o, j) => (
                                                <div key={j} className="font-medium text-foreground/80">{o}</div>
                                            ))}
                                        </Td>
                                        <Td>
                                            {t.mobiles.filter(m => m !== "").map((m, j) => (
                                                <div key={j} className="font-medium text-foreground/80">{m}</div>
                                            ))}
                                        </Td>
                                        <Td>
                                            {t.committeeHead.map((h, j) => (
                                                <div key={j} className="font-medium text-foreground/80">{h}</div>
                                            ))}
                                        </Td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </GlassTable>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          ADDITIONAL TEAM ORGANIZERS
      ══════════════════════════════════════ */}
            <section className="py-10 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <SectionHeading title="Additional Team Organizers" />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <GlassTable>
                            <thead>
                                <tr>
                                    <Th>S.No.</Th>
                                    <Th>Team</Th>
                                    <Th>Student Organizers</Th>
                                    <Th>Mobile</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {additionalTeams.map((t, i) => (
                                    <motion.tr
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        className="hover:bg-primary/5 transition-colors"
                                    >
                                        <Td center>{t.sno}</Td>
                                        <Td>
                                            <span className="font-semibold text-primary/80">{t.team}</span>
                                        </Td>
                                        <Td>
                                            {t.organizers.map((o, j) => (
                                                <div key={j}>{o}</div>
                                            ))}
                                        </Td>
                                        <Td>
                                            {t.mobiles.map((m, j) => (
                                                <div key={j}>{m}</div>
                                            ))}
                                        </Td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </GlassTable>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Committee;
