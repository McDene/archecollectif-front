type HeroProps = {
  videoUrl: string; // L'URL de la vidéo
};

export default function Hero({ videoUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture des vidéos.
        </video>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
          <p>Chargement de la vidéo...</p>
        </div>
      )}
    </section>
  );
}
