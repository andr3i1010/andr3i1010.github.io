import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import bgVideo from '../assets/bg.mp4'
import { Clock5, MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { SiCss, SiDocker, SiExpress, SiGit, SiHtml5, SiJavascript, SiPython, SiReact, SiTailwindcss, SiTypescript, SiVuedotjs } from '@icons-pack/react-simple-icons';
import { SiNodedotjs } from '@icons-pack/react-simple-icons'
import { SiNextdotjs } from '@icons-pack/react-simple-icons';

// Translations for the website
const translations = {
    en: {
        greeting: "Hello, I'm andrei1010",
        aboutMeTitle: "About me",
        bio: "Hi! I'm Andrei, a 13-year old full stack developer from the Netherlands. I enjoy creating web apps, like my",
        projects: "projects",
        thatYouCanSee: "that you can see down.",
        skillSetTitle: "My skill set",
        projectsTitle: "My projects",
        yearsOfExperience: "4 years of experience",
        country: "Netherlands",
        projectDescriptions: {
            polarLearn: "PolarLearn is a FOSS alternative for the paid StudyGo. Sidenote: this is a dutch-only platform, i might implement i18n later",
            libwrts: "libwrts is a TypeScript library for communicating with the WRTS (now called StudyGo) API."
        }
    },
    nl: {
        greeting: "Hallo, ik ben andrei1010",
        aboutMeTitle: "Over mij",
        bio: "Hoi! Ik ben Andrei, een 13-jarige full stack developer uit Nederland. Ik vind het leuk om web apps te maken, zoals mijn",
        projects: "projecten",
        thatYouCanSee: "die je hieronder kunt zien.",
        skillSetTitle: "Mijn vaardigheden",
        projectsTitle: "Mijn projecten",
        yearsOfExperience: "4 jaar ervaring",
        country: "Nederland",
        projectDescriptions: {
            polarLearn: "PolarLearn is een FOSS alternatief voor het betaalde StudyGo. Opmerking: dit is een platform alleen in het Nederlands, mogelijk implementeer ik i18n later",
            libwrts: "libwrts is een TypeScript bibliotheek voor communicatie met de WRTS (nu StudyGo) API."
        }
    }
}

export default function Page({ lang }: { lang: string }) {
    const [startTyping, setStartTyping] = useState(false)
    const [typingDone, setTypingDone] = useState(false)
    const [typedText, setTypedText] = useState('')

    // Use the correct language or fallback to English
    const t = translations[lang as 'en' | 'nl'] || translations.en
    const fullText = t.greeting
    const typeSpeed = 60

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setStartTyping(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (startTyping && !typingDone && typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1))
            }, typeSpeed)
            return () => clearTimeout(timeout)
        } else if (typedText.length === fullText.length) {
            setTimeout(() => setTypingDone(true), 500)
        }
    }, [startTyping, typedText, typingDone])

    return (
        <div className="min-h-screen w-screen bg-black text-white justify-center relative overflow-x-hidden flex flex-col z-30">
            {/* Blinking cursor style */}
            <style>
                {`
                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
                .custom-blink {
                    animation: blink 1s step-end infinite;
                }
                `}
            </style>
            <motion.video
                className='fixed top-0 left-0 w-full h-full object-cover z-[-1] blur-md'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                preload="auto"
            >
                <source src={bgVideo} type="video/mp4" />
            </motion.video>

            <motion.div
                className="font-extrabold text-4xl text-center"
                initial={{
                    opacity: 0,
                    top: "50vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
                animate={{
                    opacity: 1,
                    top: typingDone ? "24px" : "50vh",
                    transform: typingDone
                        ? "translate(-50%, 0)"
                        : "translate(-50%, -50%)"
                }}
                transition={{
                    duration: typingDone ? 0.7 : 1,
                    delay: typingDone ? 0 : 1,
                    ease: typingDone ? "easeOut" : "easeInOut",
                }}
                style={{
                    position: "absolute", // Changed back to absolute from fixed
                    width: "100%",
                    zIndex: 40
                }}
            >
                {startTyping && (
                    <>
                        {typedText}
                        {!typingDone && <span className="custom-blink">|</span>}
                    </>
                )}
            </motion.div>

            {/* Add top padding to push content down */}
            <div className={`flex-grow flex flex-col items-center ${typingDone ? 'pt-40' : ''}`}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: typingDone ? 1 : 0,
                        y: typingDone ? 0 : 50
                    }}
                    transition={{
                        duration: 0.5,
                        delay: typingDone ? 0.8 : 0, // appears after the first card
                    }}
                >
                    <h1 className="w-full text-4xl pb-4 text-center font-extrabold">
                        {t.aboutMeTitle}
                    </h1>
                    <div className='z-30 mx-4 mt-6 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-neutral-800 border-2 w-full max-w-2xl py-6 mb-4 h-min font-bold'>
                        <div className='font-extrabold flex flex-row items-center gap-4 ml-4'>
                            <img
                                src="https://github.com/andr3i1010.png"
                                className='rounded-full w-15 h-15'
                                alt="my pfp"
                            />
                            <h1 className='text-2xl'>Andrei</h1>
                        </div>
                        <div className='ml-4 mt-4'>
                            <div className='flex flex-row items-center gap-2 mb-2'>
                                <MapPin /> {t.country}
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <Clock5 /> {t.yearsOfExperience}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className={`z-30 font-bold text-center mx-4 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-neutral-800 border-2 w-full max-w-2xl py-6 px-4`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: typingDone ? 1 : 0,
                        y: typingDone ? 0 : 50
                    }}
                    transition={{
                        duration: 0.5,
                        delay: typingDone ? 1.2 : 0,
                    }}
                    style={{
                        maxHeight: "70vh",
                        overflowY: "auto",
                    }}
                >
                    <div>
                        <p className='font-normal text-xl'>
                            {t.bio} <button
                                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                                className='hover:underline text-blue-400 cursor-pointer transition-all'
                            >
                                {t.projects}
                            </button> {t.thatYouCanSee}
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className='h-40' />
            <div style={{ opacity: typingDone ? 1 : 0 }} className="min-h-[300px]">
                <motion.h1
                    className='font-extrabold text-4xl text-center mb-10'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{ once: true, amount: 0.05, margin: "100px 0px 0px 0px" }}
                    transition={{ duration: 0.5 }}
                >
                    {t.skillSetTitle}
                </motion.h1>

                <motion.div
                    className="px-4 flex flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{ once: true, amount: 0.01, margin: "50px 0px 0px 0px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="w-full max-w-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-neutral-800 border-2 p-6 mb-8">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Badge className='bg-sky-500 text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiReact size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    React
                                </div>
                            </Badge>
                            <Badge className='bg-black text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiNextdotjs size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Next.js
                                </div>
                            </Badge>
                            <Badge className='bg-[#5FA04E] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiNodedotjs size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Node.js
                                </div>
                            </Badge>
                            <Badge className='bg-[#3178C6] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiTypescript size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    TypeScript
                                </div>
                            </Badge>
                            <Badge className='bg-[#E34F26] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiHtml5 size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    HTML
                                </div>
                            </Badge>
                            <Badge className='bg-[#663399] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiCss size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    CSS
                                </div>
                            </Badge>
                            <Badge className='bg-yellow-400 text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiJavascript size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    JavaScript
                                </div>
                            </Badge>
                            <Badge className='bg-black text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiExpress size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Express.js
                                </div>
                            </Badge>
                            <Badge className='bg-gradient-to-r from-[#4FC08D] to-[#34495E] text-white text-xl border-0'>
                                <div className="flex items-center gap-2">
                                    <SiVuedotjs size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Vue.js
                                </div>
                            </Badge>
                            <Badge className='border-0 bg-gradient-to-r to-[#3776AB] from-[#FFD43B] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiPython size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Python
                                </div>
                            </Badge>
                            <Badge className='bg-[#2496ED] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiDocker size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Docker
                                </div>
                            </Badge>
                            <Badge className='bg-[#F05032] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiGit size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    Git
                                </div>
                            </Badge>
                            <Badge className='bg-[#06B6D4] text-white text-xl'>
                                <div className="flex items-center gap-2">
                                    <SiTailwindcss size={24} style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                                    TailwindCSS
                                </div>
                            </Badge>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div style={{ opacity: typingDone ? 1 : 0 }} className="min-h-[400px]">
                <motion.h1
                    className='font-extrabold text-4xl text-center mb-10'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{ once: true, amount: 0.05, margin: "100px 0px 0px 0px" }}
                    transition={{ duration: 0.5 }}
                >
                    {t.projectsTitle}
                </motion.h1>

                <motion.div
                    className="px-4 flex flex-col items-center pb-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{ once: true, amount: 0.01, margin: "50px 0px 0px 0px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="w-full max-w-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-neutral-800 border-2 p-6 mb-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">PolarLearn</h2>
                        <a
                            href='https://polarlearn.tech'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:drop-shadow-2xl transition-all duration-300 hover:-translate-y-1 inline-block'
                        >
                            <img
                                src='/pl.png'
                                alt="PolarLearn"
                                className="w-full max-w-[500px] h-auto mx-auto rounded-lg mb-4"
                            />
                        </a>
                        <p>{t.projectDescriptions.polarLearn}</p>
                    </div>
                </motion.div>
                <motion.div
                    className="px-4 flex flex-col items-center pb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{ once: true, amount: 0.01, margin: "50px 0px 0px 0px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="w-full max-w-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-neutral-800 border-2 p-6 mb-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">libwrts</h2>
                        <a
                            href='https://github.com/open-wrts-api/libwrts'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:drop-shadow-2xl transition-all duration-300 hover:-translate-y-1 inline-block'
                        >
                            <img
                                src='/libwrts.png'
                                alt="libwrts"
                                className="w-full max-w-[500px] h-auto mx-auto rounded-lg mb-4"
                            />
                        </a>
                        <p>{t.projectDescriptions.libwrts}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}