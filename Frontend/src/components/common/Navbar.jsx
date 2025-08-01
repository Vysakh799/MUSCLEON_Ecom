import React from "react";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
            <link
                rel="stylesheet"
                as="style"
                onload="this.rel='stylesheet'"
                href="https://fonts.googleapis.com/css2?display=swap&family=Lexend%3Awght%40400%3B500%3B700%3B900&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
            />
            <div
                className="relative flex size-full flex-col bg-[#221112] dark group/design-root overflow-x-hidden"
                style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
            >
                <div className="layout-container flex h-full grow flex-col"></div>
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#472426] px-10 py-3">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-4">
                            <svg
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                            Muscleon
                        </h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                New Arrivals
                            </a>
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                Best Sellers
                            </a>
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                Proteins
                            </a>
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                Creatine
                            </a>
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                Wellness
                            </a>
                            <a
                                className="text-white text-sm font-medium leading-normal"
                                href="#"
                            >
                                Accessories
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#472426] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                <div
                                    className="text-white"
                                    data-icon="MagnifyingGlass"
                                    data-size="20px"
                                    data-weight="regular"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                                    </svg>
                                </div>
                            </button>
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#472426] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                <div
                                    className="text-white"
                                    data-icon="User"
                                    data-size="20px"
                                    data-weight="regular"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                                    </svg>
                                </div>
                            </button>
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#472426] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                                <div
                                    className="text-white"
                                    data-icon="ShoppingBag"
                                    data-size="20px"
                                    data-weight="regular"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}


export default Navbar