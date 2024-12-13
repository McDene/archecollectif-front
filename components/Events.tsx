"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Event {
  id: number;
  imageUrl: string;
  tag: string; // "à venir", "press", "passé"
  linkName: string; // Nom du lien
  linkUrl: string; // URL du lien
  eventContent: string; // "PDF" ou "URL"
}

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  const [activeTag, setActiveTag] = useState("à venir");
  const filteredEvents = events.filter((event) => event.tag === activeTag);

  const [activeEventIndex, setActiveEventIndex] = useState(0);

  return (
    <section
      id="news"
      className="bg-gradient-to-b from-gray-100 to-gray-100 py-20 md:py-28 lg:py-36"
    >
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4">
        <h2 className="text-6xl md:text-7xl lg:text-9xl font-avenirBlack text-myred pb-12 lg:pb-24">
          actualités
        </h2>
        {/* Liens */}
        <div className="flex space-x-8 mb-12 md:mb-20 text-2xl">
          {["à venir", "publications"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setActiveEventIndex(0); // Reset the active event index
              }}
              className={`${
                activeTag === tag
                  ? "text-myred font-bold underline"
                  : "text-gray-700"
              } hover:text-myred font-semibold underline-offset-4 transition`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* Carrousel */}
        {filteredEvents.length > 0 ? (
          <>
            <Swiper
              grabCursor
              centeredSlides
              slidesPerView={2}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
              }}
              effect="coverflow"
              loop={filteredEvents.length > 1}
              pagination={{ clickable: true, el: ".custom-pagination" }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveEventIndex(swiper.realIndex)}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 2,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="w-full h-[500px] md:h-[500px]"
            >
              {filteredEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <Image
                    src={event.imageUrl}
                    alt={`Event ${event.id}`}
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                    width={800}
                    height={600}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Lien en dessous du carrousel */}
            <div className="mt-8 text-center">
              {filteredEvents[activeEventIndex]?.linkName &&
                filteredEvents[activeEventIndex]?.linkUrl && (
                  <a
                    href={filteredEvents[activeEventIndex].linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-myred hover:underline text-lg font-semibold"
                  >
                    {filteredEvents[activeEventIndex].eventContent === "PDF"
                      ? "Ouvrir le PDF"
                      : filteredEvents[activeEventIndex].linkName}
                  </a>
                )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-80 bg-gray-200 rounded-lg">
            <p className="text-gray-500 text-lg">Aucun événement trouvé.</p>
          </div>
        )}
      </div>
    </section>
  );
}
