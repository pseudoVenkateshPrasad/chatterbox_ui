"use client";

import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WordRotate({
    words,
    duration = 1500,
    framerProps = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.25, ease: "easeOut" },
    },
    className,
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <div className="overflow-hidden py-2">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={words[index]}
                    className={cn(className)}
                    {...framerProps}
                >
                    {words[index]}
                </motion.h1>
            </AnimatePresence>
        </div>
    );
}