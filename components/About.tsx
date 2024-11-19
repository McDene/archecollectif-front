type AboutProps = {
  titleAbout: string;
  textAbout: string;
};

export default function About({ titleAbout, textAbout }: AboutProps) {
  return (
    <section className="bg-myblue py-24 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl text-center pb-8">{titleAbout}</h1>
        <p className="text-2xl">{textAbout}</p>
      </div>
    </section>
  );
}
