// This hook uses the useState and useEffect hooks from React to fetch the dominant color of an image.
// It takes an imageUrl as an argument.
import { useState, useEffect } from "react";

export const getImageColors = (imageUrl) => {

    // Initializing the state variable "color" using the useState hook.
    const [color, setColor] = useState(null);

    // Using the useEffect hook to perform side-effects and update the state variable "color".
    useEffect(() => {
        // Creating a new image and setting the crossOrigin and src properties.
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        // On successful image loading, create a canvas and draw the image on it.
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Get the pixel data of the image from the canvas and count the occurrence of each color.
            const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
            const colors = {};

            for (let i = 0; i < imageData.length; i += 4) {
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const key = `${r},${g},${b}`;

                if (colors[key]) {
                    colors[key]++;
                } else {
                    colors[key] = 1;
                }
            }

            // Find the dominant color by finding the color with the maximum occurrence count.
            let dominantColor = null;
            let maxCount = 0;

            for (const key in colors) {
                if (colors[key] > maxCount) {
                    dominantColor = key;
                    maxCount = colors[key];
                }
            }

            // Update the "color" state variable with the dominant color.
            setColor(`rgb(${dominantColor})`);
        };

        // On image loading error, set the "color" state variable to null.
        img.onerror = () => {
            setColor(null);
        };
    }, [imageUrl]);

    // Return the "color" state variable.
    return color;
};
