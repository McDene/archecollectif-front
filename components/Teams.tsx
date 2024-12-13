import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
}

export default function Team({ teams }: { teams: TeamMember[] }) {
  return (
    <section id="team" className="bg-gray-100">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-myblue rounded-3xl shadow-lg relative px-6 pt-6 pb-16">
        {/* Titre */}
        <div className="mb-10">
          <h2 className="text-6xl md:text-7xl lg:text-9xl text-left text-myred font-avenirBlack pt-14 pb-4">
            équipe
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-rows-3 grid-cols-3 gap-10 place-items-center">
          {/* Première ligne : OOX */}
          {teams.slice(0, 2).map((member) => (
            <div
              key={member.id}
              className="relative w-52 h-52 lg:w-[18.5rem] lg:h-[18.5rem] rounded-full overflow-hidden flex items-center justify-center shadow-xl group border-4 border-gray-100"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              <div className="absolute inset-0 bg-gray-100 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-800 text-center px-4">
                  {member.content}
                </p>
              </div>
            </div>
          ))}
          <div className="relative"></div> {/* X pour la place vide */}
          {/* Deuxième ligne : OOO */}
          {teams.slice(2, 5).map((member) => (
            <div
              key={member.id}
              className="relative w-52 h-52 lg:w-[18.5rem] lg:h-[18.5rem] rounded-full overflow-hidden flex items-center justify-center shadow-xl group border-4 border-gray-100"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              <div className="absolute inset-0 bg-gray-100 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-800 text-center px-4">
                  {member.content}
                </p>
              </div>
            </div>
          ))}
          {/* Troisième ligne : XOO */}
          <div className="relative"></div> {/* X pour la place vide */}
          {teams.slice(5, 7).map((member) => (
            <div
              key={member.id}
              className="relative w-52 h-52 lg:w-[18.5rem] lg:h-[18.5rem] rounded-full overflow-hidden flex items-center justify-center shadow-xl group border-4 border-gray-100"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              <div className="absolute inset-0 bg-gray-100 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center space-y-10">
          {teams.map((member) => (
            <div
              key={member.id}
              className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg group border-4 border-gray-100"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              <div className="absolute inset-0 bg-gray-100 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
