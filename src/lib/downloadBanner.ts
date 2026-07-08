"use client";

import { toPng } from "html-to-image";

/**
 * Downloads the banner as a PNG file by capturing a DOM node.
 *
 * @param element - React ref to the banner DOM node
 * @param username - The Discord username (used in the filename)
 * @param pixelRatio - Scaling factor for exporting high-res output
 */
export async function downloadBanner(
  element: HTMLElement,
  username: string,
  pixelRatio: number = 2
): Promise<void> {
  try {
    // Generate PNG data URL from the DOM node
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio, // Adjustable scaling (e.g. 1x, 2x, 3x)
      cacheBust: true,
      fontEmbedCSS: undefined,
      skipAutoScale: false,
    });

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.download = `prismax-banner-${username.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to generate banner PNG:", error);
    throw new Error("Failed to download banner. Please try again.");
  }
}
