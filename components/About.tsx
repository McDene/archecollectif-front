type AboutProps = {
  titleAbout: string;
  textAbout: string;
};

export default function About({ titleAbout, textAbout }: AboutProps) {
  return (
    <section className="bg-gradient-to-b from-myblue to-myblue py-20 md:py-48">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col text-gray-800 px-4">
        {/* Titre principal */}
        <h1 className="text-myred text-6xl  md:text-7xl lg:text-9xl font-avenirBlack pb-12 lg:pb-24 text-justify md:text-left">
          {titleAbout} <span className="">nous</span>
        </h1>

        {/* Conteneur des h2 et texte */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-40">
          {/* Section du texte */}
          <div className="text-center md:text-left">
            <p className="text-xl lg:text-3xl text-justify">{textAbout}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
