"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const center = { lat: 51.05557382970566, lng: -113.98755084232809 };

        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 16,
        });

        // Create a marker
        const marker = new google.maps.Marker({
          position: center,
          map,
          title: "RISE Sports Complex",
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
        <div style="
            font-family: 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            border-radius: 10px;
            max-width: 280px;
            padding: 1rem 1.2rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            color: #222;
        ">
            <h2 style="
            margin: 0 0 0.5rem 0;
            font-size: 1.2rem;
            font-weight: 600;
            color: #1a202c;
            ">
            RISE Sports Complex
            </h2>
            <p style="
            margin: 0 0 0.75rem 0;
            font-size: 0.95rem;
            line-height: 1.5;
            color: #4a5568;
            ">
            #01, 33 St NE<br />
            Calgary, AB T2E 7K1
            </p>
            <a
            href="https://www.google.com/maps/place/RISE+Sports+Complex/@51.0553614,-113.9875723,17z/data=!3m1!5s0x53717ad5ff7451df:0xeada6229545f0ef1!4m14!1m7!3m6!1s0x53717bbb73ea6b47:0xe46b3be92b27e2d3!2sRISE+Sports+Complex!8m2!3d51.0553614!4d-113.9875723!16s%2Fg%2F11lnjkxl7t!3m5!1s0x53717bbb73ea6b47:0xe46b3be92b27e2d3!8m2!3d51.0553614!4d-113.9875723!16s%2Fg%2F11lnjkxl7t?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            style="
                display: inline-block;
                padding: 0.5rem 0.75rem;
                background-color: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: background-color 0.2s ease;
            "
            onmouseover="this.style.backgroundColor='#1d4ed8'"
            onmouseout="this.style.backgroundColor='#2563eb'"
            >
            View on Google Maps
            </a>
        </div>
        `,
        });

        // Open InfoWindow when marker is clicked
        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

        // Optionally auto-open on load:
        infoWindow.open({ anchor: marker, map });
      }
    });
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};
