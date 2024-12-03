import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
}

export default function Team({ teams }: { teams: TeamMember[] }) {
  return (
    <section className="bg-gray-50 py-20 relative">
      <div className="max-w-7xl mx-auto bg-myred py-20 md:py-28 rounded-3xl">
        <h2 className="text-6xl md:text-9xl text-gray-50 px-4 font-avenirBlack pb-16 md:pb-20">
          équipe
        </h2>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-x-10 gap-y-16">
          {/* Colonne 1 */}
          <div className="flex flex-col items-center space-y-10 mt-16">
            {teams.slice(0, 2).map((member) => (
              <div
                key={member.id}
                className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg group"
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full border-4 border-myblue transition-transform duration-300 group-hover:scale-110"
                  width={288}
                  height={288}
                  unoptimized
                />
                <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-200 text-center px-4">
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
                className="relative w-80 h-80 rounded-full overflow-hidden flex items-center justify-center shadow-lg group"
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full border-4 border-myblue transition-transform duration-300 group-hover:scale-110"
                  width={320}
                  height={320}
                  unoptimized
                />
                <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-200 text-center px-4">
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
                className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg group"
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="object-cover rounded-full border-4 border-myblue transition-transform duration-300 group-hover:scale-110"
                  width={288}
                  height={288}
                  unoptimized
                />
                <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                  {member.name}
                </h3>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-200 text-center px-4">
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
              className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg group"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="object-cover rounded-full border-4 border-myblue transition-transform duration-300 group-hover:scale-110"
                width={288}
                height={288}
                unoptimized
              />
              <h3 className="absolute bottom-4 text-lg text-gray-900 font-avenirBlack group-hover:opacity-0 transition-opacity duration-300">
                {member.name}
              </h3>
              <div className="absolute inset-0 bg-gray-900 bg-opacity-80 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-200 text-center px-4">
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
