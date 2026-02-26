import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";


const studentCoordinators = [
    { name: "S.MD.Arif", phone: "9398875293" },
    { name: "S.MD.Umar Farook", phone: "9014185582" },
    {name: "R.Siva Nanda Reddy", phone: "8309246760"},
];

const technicalTeams = [
    {
        sno: 1,
        team: "BATTLE OF IDEAZ",
        organizers: ["E.Akshya", "V.Vishnupriya", "D.Sneha", "B.Krishna Mohan"],
        mobiles: ["6309860285", "9480058809", "9000197214", "8919075558"],
    },
    {
        sno: 2,
        team: "BLUE PRINT",
        organizers: ["A.Sinduja", "N.Sreelakha", "C.Harashavardan Reddy", "K.Poojitha", "C.Renuka"],
        mobiles: ["8688322018", "8682147677", "8639166711", "9182185078", "7981533071", "9036773089"],
    },
    {
        sno: 3,
        team: "PRAGMA",
        organizers: ["C.Chandra Sekhar", "P.Shashavalli", "S.Hootamvelli", "B.Dhanush", "U.Harinath Reddy", "K.Bhanumanee"],
        mobiles: ["7337512081", "9640770188", "7995849848", "9966066258", "9398503558", "9346008378"],
    },
    {
        sno: 4,
        team: "TECHNOZEN",
        organizers: ["G. Usha Rani", "E. Rajendra", "N. Lokesh", "Shalini", "M. Harshitha"],
        mobiles: ["8978210119", "8978368532", "9398721622", "8839293358", "9346630966"],
    },
    {
        sno: 5,
        team: "CODATHON",
        organizers: ["R. Jagadeesh", "K. Akhilesh Kumar", "G. Harika", "K. Lohitha", "M. Manoj Kumar", "M. Md. Faiz", "C. Ravi Shankar", "S. Hemalatha"],
        mobiles: ["9014334564", "9710101373", "7380987890", "9550844818", "9441155518", "9030314289", "6309441460", "9110381734"],
    },
];

const nonTechnicalTeams = [
    {
        sno: 1,
        team: "GRAPHITE ELEGANCE",
        organizers: ["B. Mallika", "R. Lakshmi Bhavani", "G.Harika"],
        mobiles: ["8309679076", "7989743654", "7807067890"],
    },
    {
        sno: 2,
        team: "INSTANT CAPTURE",
        organizers: ["J. Annapurneswari", "G. Janaena", "K.Keerthana", "D. Manasa"],
        mobiles: ["9000568866", "9014855290", "7892227629", "7893100736"],
    },
    {
        sno: 3,
        team: "SNAP SNATCH",
        organizers: ["P.sree sai deekshitha", "M.Tharun", "K.Priyanka"],
        mobiles: ["8573786278", "8347784827", "9110249617"],
    },
    {
        sno: 4,
        team: "PHOTO CLUE",
        organizers: ["P.sree sai deekshitha", "B.Venkateswara Rao", "M.V.Vidya sagar", "M.Zakeer Hussain", "M.Tharun", "S.Sameer"],
        mobiles: ["8573786278", "9189115282", "7892377661", "9989218430", "9247784827", "8143225862"],
    },
    {
        sno: 5,
        team: "QUIK MEME",
        organizers: ["M.Tejeshvara Reddy", "I. Suvartalah", "M. Jagadeshwar Reddy"],
        mobiles: ["6281704193", "8143168178", "9581138136"],
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
        sno: 5,
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
                {/* decorative glows */}
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
          1. STAFF COORDINATORS
      ══════════════════════════════════════ */}
            <section className="py-10 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
                    <SectionHeading title="Staff Coordinators" />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <GlassTable>
                            <thead>
                                <tr>
                                    <Th>Name</Th>
                                    <Th>Designation</Th>
                                    <Th>Qualification</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffCoordinators.map((s, i) => (
                                    <motion.tr
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        className="hover:bg-primary/5 transition-colors"
                                    >
                                        <Td>
                                            <span className="font-medium text-foreground">{s.name}</span>
                                        </Td>
                                        <Td>{s.role}</Td>
                                        <Td>{s.qual}</Td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </GlassTable>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          2. STUDENT COORDINATORS
      ══════════════════════════════════════ */}
            <section className="py-10 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
                    <SectionHeading title="Student Coordinators" />
                    <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                        {studentCoordinators.map((s, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="p-6 rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm shadow-[0_0_30px_rgba(99,102,241,0.10)] text-center hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.20)] transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-xl font-orbitron font-bold text-primary">
                                        {s.name.charAt(0)}
                                    </span>
                                </div>
                                <p className="font-orbitron font-semibold text-foreground text-sm sm:text-base">
                                    {s.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                                    📞 {s.phone}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          3. TECHNICAL TEAM ORGANIZERS
      ══════════════════════════════════════ */}
            <section className="py-10 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
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

            {/* ══════════════════════════════════════
          4. NON-TECHNICAL TEAM ORGANIZERS
      ══════════════════════════════════════ */}
            <section className="py-10 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
                    <SectionHeading title="Non-Technical Team Organizers" />
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
                                {nonTechnicalTeams.map((t, i) => (
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

            {/* ══════════════════════════════════════
          5. ADDITIONAL TEAM ORGANIZERS
      ══════════════════════════════════════ */}
            <section className="py-10 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
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

