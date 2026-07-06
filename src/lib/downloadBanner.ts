"use client";

import { toPng } from "html-to-image";

/**
 * Downloads the banner as a PNG file by capturing a DOM node.
 *
 * @param elementRef - React ref to the banner DOM node
 * @param username - The Discord username (used in the filename)
 */
export async function downloadBanner(
  element: HTMLElement,
  username: string
): Promise<void> {
  try {
    // Generate PNG data URL from the DOM node
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // 2x for retina-quality output
      cacheBust: true,
      // Ensure fonts are embedded
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
