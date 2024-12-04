type AboutProps = {
  titleAbout: string;
  textAbout: string;
};

export default function About({ titleAbout, textAbout }: AboutProps) {
  return (
    <section className="bg-gradient-to-b from-myblue to-myred py-20 md:py-36">
      <div className="max-w-7xl mx-auto flex flex-col text-gray-800 px-4">
        {/* Titre principal */}
        <h1 className="text-6xl sm:text-6xl lg:text-9xl font-avenirBlack pb-12 md:pb-24 text-justify  md:text-left">
          {titleAbout} <span className="">nous</span>
        </h1>

        {/* Conteneur des h2 et texte */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-40">
          {/* Section des titres */}
          <div className="space-y-4 md:space-y-5  md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-avenirBlack text-gray-800 underline">
              Humain
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-avenirBlack text-gray-800  underline">
              Optimiste
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-avenirBlack text-gray-800  underline">
              Responsable
            </h2>
          </div>

          {/* Section du texte */}
          <div className="text-center md:text-left">
            <p className="text-lg sm:text-xl md:text-2xl text-justify">
              {textAbout}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
