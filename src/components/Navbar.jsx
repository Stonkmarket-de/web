import { useState, useEffect } from "react";
import {
    Button,
} from "@material-tailwind/react";
import "./mobile.css";

function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleMobileToggle = () => {
            window.innerWidth >= 1024 || !isOpen
                ? (document.body.style.overflow = "")
                : (document.body.style.overflow = "hidden");
        };

        window.addEventListener("resize", handleMobileToggle);

        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-10 bg-white dark:bg-black border-x border-b dark:border-white">
                    <div className=" border-t border-black absolute inset-x-0 bottom-0 dark:border-white">
                        <div className="border-b text-sm text-slate-700 dark:text-slate-400">
                            <div className="flex justify-evenly">
                                <a className="p-2 dark:hover:text-slate-100" href="#!">
                                    Impressum
                                </a>
                                <a className="p-2 dark:hover:text-slate-100" href="#!">
                                    Privacy
                                </a>
                                <a className="p-2 dark:hover:text-slate-100" href="#!">
                                    Rechtliches
                                </a>
                            </div>
                        </div>

                        <div className="text-sm text-slate-700 dark:text-slate-400 text-center">
                            <p>
                                IT-Sicherheit aus Berlin{" "}
                                <span className="dark:text-white">&hearts;</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <nav className="z-30 sticky top-0 w-full dark:bg-black dark:text-white bg-white border-black dark:border-white">
                <div className="">
                    <div className="p-2 flex justify-between border-b border-black dark:border-white">
                        {/* Mobile Nav Button */}
                        <div class="lg:hidden ">
                            <button
                                onClick={openMenu}
                                className="stroke-black dark:hover:stroke-slate-500 dark:stroke-white dark:text-white dark:border-white border text-black border-black hover:text-slate-700 hover:border-slate-700"
                            >
                                <svg
                                    className={"ham hamRotate ham8 " + (isOpen && "active")}
                                    viewBox="0 0 100 100"
                                    width="40"
                                >
                                    <path
                                        class="line top "
                                        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                                    />
                                    <path class="line middle" d="m 30,50 h 40" />
                                    <path
                                        class="line bottom"
                                        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* --- Mobile Nav Button --- */}
                        {/* --- <img src="./logo.svg" className="h-10" alt="logo" /> --- */}
                        <p className="self-center">Stonkmarket</p>


                        <div className="self-center">
                            <Button variant="outlined">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <div class="w-full block lg:absolute lg:top-[1.4rem] lg:left-40">
                        <div className={"lg:flex-grow lg:inline " + (!isOpen && "hidden")}>
                            <div className="lg:text-lg lg:font-normal lg:mt-0 lg:tracking-normal lg:justify-start text-black mt-8 text-3xl tracking-wide font-light flex justify-center content-center dark:text-white">
                                <ul className="">
                                    <li className="mb-3 lg:float-left lg:pr-4">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="mb-3 lg:float-left lg:pr-4">
                                        <a href="#responsive-header">Signals</a>
                                    </li>
                                    <li className="mb-3 lg:float-left lg:pr-4">
                                        <a href="https://stonkmarket.de">Blog</a>
                                    </li>
                                    <li className="mb-3 lg:float-left lg:pr-4">
                                        <a href="#responsive-header">About</a>
                                    </li>
                                    <li className="lg:float-left">
                                        <a href="#responsive-header">Legal</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;