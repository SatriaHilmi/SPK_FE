import { useState, useEffect } from "react";
// import { Navbar } from './Navbar'

interface CarouselProps {

    goToDashboard?: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({ goToDashboard }) => {
    const slides = [
        {
            id: 1,
            src: "./assets/Lifestyle.jpg",
            bg: "./assets/Lifestyle.jpg",
            title: "Lifestyle",
            description: "Learn about music for your lifestyle dan make a history.",
            buttonText: "Get started",
        },
        {
            id: 2,
            src: "./assets/Musik_and_Sports.jpg",
            bg: "./assets/Musik_and_Sports.jpg",
            title: "Music & Sports",
            description: "Combine your music with a good and regular sports life.",
            buttonText: "Get Started",
        },
        {
            id: 3,
            src: "./assets/Outdoor.jpg",
            bg: "./assets/Outdoor.jpg",
            title: "Outdoor",
            description: "Feel the sensation of the song with you and reminisce outdoors.",
            buttonText: "Get Started",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);


    // const nextSlide = () => {
    //     setCurrentSlide((prev) => (prev + 1) % slides.length);
    // };

    // const prevSlide = () => {
    //     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // };

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center overflow-hidden transform transition-all duration-700 ease-linier"
            style={{
                backgroundImage: `url(${slides[currentSlide].bg})`,
            }}
        >
            {/* <Navbar /> */}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto h-5/6 flex flex-col justify-center items-start px-6 text-white">
                <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="text-lg mb-6">{slides[currentSlide].description}</p>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg" onClick={goToDashboard}>
                    {slides[currentSlide].buttonText}
                </button>
            </div>

            {/* Image Thumbnails */}
            <div className="relative bottom-10 left-1/2 transform translate-x-60 flex space-x-5 z-20">
                {slides.map((slide, index) => (
                    <img
                        key={slide.id}
                        src={slide.src}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-24 h-32 rounded-xl shadow-lg transform transition duration-700 ease-in-out ${index === currentSlide ? "scale-110" : "scale-100 hover:scale-125"
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            {/* <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-75"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-75"
            >
                ❯
            </button> */}
        </div>
    );
};
