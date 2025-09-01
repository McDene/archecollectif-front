"use client";

import Image from "next/image";
import { useMemo } from "react";

interface TeamMember {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
}

export default function Team({ teams }: { teams: TeamMember[] }) {
  const isLarge = teams.length > 8;

  // ====== Variante A (≤ 8 membres) : grille carrée centrée, case centrale vide ======
  const gridSize = useMemo(() => {
    if (isLarge) return 0;
    let n = 3;
    while (n * n - 1 < teams.length) n += 2;
    return n; // 3,5,7...
  }, [isLarge, teams.length]);

  const totalCells = gridSize * gridSize;
  const centerIndex = Math.floor(totalCells / 2);

  const centeredCells = useMemo(() => {
    if (isLarge) return [];
    const out: (TeamMember | null)[] = [];
    let iTeam = 0;
    for (let i = 0; i < totalCells; i++) {
      if (i === centerIndex) out.push(null); // centre vide (esprit collectif)
      else if (iTeam < teams.length) out.push(teams[iTeam++]);
      else out.push(null);
    }
    return out;
  }, [isLarge, teams, totalCells, centerIndex]);

  // ====== Variante B (> 8 membres) : colonnes de 3, dernière rangée centrée ======
  const remainder = teams.length % 3; // 0,1,2
  const lastRowCount = remainder === 0 ? 3 : remainder;
  const firstIndexLastRow = teams.length - lastRowCount;

  return (
    <section id="team" className="bg-gray-100">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto bg-myblue rounded-3xl shadow-lg relative px-6 pt-6 pb-16">
        {/* Titre */}
        <div className="mb-10">
          <h2 className="text-6xl md:text-7xl lg:text-9xl text-left text-myred font-avenirBlack pt-14 pb-4">
            équipe
          </h2>
        </div>

        {/* ===== Desktop ===== */}
        {!isLarge ? (
          // ≤ 8 : grille carrée centrée, centre vide
          <div
            className="hidden md:grid gap-10 place-items-center mx-auto"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {centeredCells.map((member, idx) =>
              member ? (
                <Bubble key={member.id} member={member} />
              ) : (
                <div key={`empty-${idx}`} />
              )
            )}
          </div>
        ) : (
          // > 8 : colonnes de 3, dernière rangée centrée (col-start-2)
          <div className="hidden md:grid grid-cols-3 gap-10 place-items-center">
            {teams.map((m, i) => {
              let cellClass = "";
              if (i >= firstIndexLastRow) {
                // On est dans la dernière rangée
                if (lastRowCount === 1 && i === firstIndexLastRow) {
                  cellClass = "md:col-start-2"; // 1 avatar centré (colonne du milieu)
                }
                if (lastRowCount === 2 && i === firstIndexLastRow) {
                  cellClass = "md:col-start-2"; // 2 avatars alignés au centre (col 2 & 3)
                }
              }
              return (
                <div key={m.id} className={cellClass}>
                  <Bubble member={m} />
                </div>
              );
            })}
          </div>
        )}

        {/* ===== Mobile : liste verticale lisible ===== */}
        <div className="md:hidden flex flex-col items-center space-y-10">
          {teams.map((m) => (
            <div key={m.id} className="w-full flex flex-col items-center">
              <div className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-4 border-gray-100 bg-white">
                <Image
                  src={m.imageUrl}
                  alt={m.name}
                  className="object-cover w-full h-full rounded-full"
                  width={288}
                  height={288}
                  unoptimized
                />
              </div>
              <div className="mt-4 max-w-md text-center px-2">
                <h3 className="text-lg font-avenirBlack text-gray-900 mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-900">{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Avatar + overlay scrollable au hover (dimensions identiques à avant) */
function Bubble({ member }: { member: TeamMember }) {
  return (
    <div
      className="
        relative rounded-full overflow-hidden border-4 border-gray-100 shadow-xl group
        w-52 h-52 lg:w-[18.5rem] lg:h-[18.5rem]
        flex items-center justify-center bg-white
      "
      title={member.name}
    >
      <Image
        src={member.imageUrl}
        alt={member.name}
        className="object-cover w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
        width={300}
        height={300}
        unoptimized
      />

      {/* Overlay : texte long “derrière la photo” (scrollable) */}
      <div
        className="
          absolute inset-0 rounded-full
          bg-gray-100/85 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex flex-col
        "
      >
        <div className="p-3 lg:p-4 flex-none text-center">
          <h3 className="text-base lg:text-lg font-avenirBlack text-gray-900 leading-tight">
            {member.name}
          </h3>
        </div>
        <div
          className="
            relative flex-1 px-4 pb-4 text-[13px] lg:text-sm leading-snug text-gray-800 text-center
            overflow-y-auto
            [mask-image:linear-gradient(to bottom,transparent,black 12px,black calc(100% - 12px),transparent)]
          "
        >
          {member.content}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-100/85 to-transparent rounded-t-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-gray-100/85 to-transparent rounded-b-full" />
      </div>
    </div>
  );
}
