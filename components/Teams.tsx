import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
}

export default function Team({ teams }: { teams: TeamMember[] }) {
  return (
    <section className="bg-gray-50 pt-5 md:pt-12 py-20 md:pb-36 relative">
      <h2 className="text-[7rem] md:text-[14rem] lg:text-[18rem] text-center text-myblue px-4 font-avenirBlack relative z-10">
        équipe
      </h2>
      <div className="max-w-7xl mx-auto bg-myred py-20 md:py-28 rounded-3xl shadow-lg relative -mt-14 md:-mt-28 lg:-mt-40 z-0">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-x-10 gap-y-16">
          {/* Colonne 1 */}
          <div className="flex flex-col items-center space-y-10 mt-16">
            {teams.slice(0, 2).map((member) => (
              <div
                key={member.id}
                className="relative w-52 h-52 lg:w-72 lg:h-72 rounded-full overflow-hidden flex items-center justify-center shadow-xl group border-4 border-myblue"
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full  transition-transform duration-300 group-hover:scale-110"
                  width={288}
                  height={288}
                  unoptimized
                />
                {/* <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3> */}
                <div className="absolute inset-0 bg-myblue bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-800 text-center px-4">
                    {member.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Colonne 2 */}
          <div className="flex flex-col items-center space-y-10">
            {teams.slice(2, 5).map((member) => (
              <div
                key={member.id}
                className="relative w-56 h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden flex items-center justify-center shadow-xl group  border-4 border-myblue"
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                  width={320}
                  height={320}
                  unoptimized
                />
                {/* <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3> */}
                <div className="absolute inset-0 bg-myblue bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-900 text-center px-4">
                    {member.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Colonne 3 */}
          <div className="flex flex-col items-center space-y-10 mt-16">
            {teams.slice(5, 7).map((member) => (
              <div
                key={member.id}
                className="relative w-52 h-52 lg:w-72 lg:h-72 rounded-full overflow-hidden flex items-center justify-center shadow-xl group border-4 border-myblue "
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                  width={288}
                  height={288}
                  unoptimized
                />
                {/* <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3> */}
                <div className="absolute inset-0 bg-myblue bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-900 text-center px-4">
                    {member.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center space-y-10">
          {teams.map((member) => (
            <div
              key={member.id}
              className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg group border-4 border-myblue"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full  transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              {/* <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                {member.name}
              </h3> */}
              <div className="absolute inset-0 bg-myblue bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-900 text-center px-4">
                  {member.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
