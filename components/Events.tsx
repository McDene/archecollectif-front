export default function Events() {
  return (
    <section className="bg-gradient-to-b from-myblue to-myblue py-20 md:py-36">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        <h2 className="text-9xl font-avenirBlack text-myred mb-10">
          actualités
        </h2>
        {/* Liens */}
        <div className="flex justify-center space-x-8 mb-10 text-2xl">
          <a
            href="#"
            className="text-gray-100 hover:text-myred font-semibold underline-offset-4 hover:underline transition"
          >
            à venir
          </a>
          <a
            href="#"
            className="text-gray-100 hover:text-myred font-semibold underline-offset-4 hover:underline transition"
          >
            press
          </a>
          <a
            href="#"
            className="text-gray-100 hover:text-myred font-semibold underline-offset-4 hover:underline transition"
          >
            passé
          </a>
        </div>
        {/* Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg h-80 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            {/* Image placeholder */}
            <span className="text-gray-500 font-medium">Image ici</span>
          </div>
        </div>
      </div>
    </section>
  );
}
