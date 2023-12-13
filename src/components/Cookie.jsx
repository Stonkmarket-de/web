import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';

export default function Cookie() {
    const [cookieAccepted, setCookieAccepted] = useState(false);

    const cookieAcceptHandler = () => {
        setCookieAccepted(true);
        localStorage.setItem("cookies", true);
    }

    useEffect(() => {
        const storedCookies = localStorage.getItem("cookies");
        if (storedCookies == "true") {
            setCookieAccepted(true);
        }
    }, []);

    return (
        !cookieAccepted && (
            <section className="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
                <div className="flex items-center gap-x-4">
                    <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
                        <FontAwesomeIcon icon={faCookieBite} />
                    </span>

                    <p className="text-sm text-gray-600 dark:text-gray-300">We use cookies to ensure that we give you the best experience on our website. <a href="#" className="text-blue-500 hover:underline">Read cookies policies</a>. </p>
                </div>

                <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
                    <button className="w-1/2 text-xs text-gray-800 underline transition-colors duration-300 md:w-auto dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
                        Cookie Setting
                    </button>

                    <button onClick={cookieAcceptHandler} className=" text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                        Accept All Cookies
                    </button>
                </div>
            </section>
        )
    );
}
