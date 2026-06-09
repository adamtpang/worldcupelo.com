// Curated key players per nation (top contenders + hosts). Illustrative and
// easily editable; clubs reflect recent senior careers. Teams without an entry
// fall back to a "full squad on PlayerElo" link on the team page.

export type Position = "GK" | "DF" | "MF" | "FW";

export type Player = {
  name: string;
  position: Position;
  club: string;
};

export const PLAYERS: Record<string, Player[]> = {
  ESP: [
    { name: "Lamine Yamal", position: "FW", club: "Barcelona" },
    { name: "Pedri", position: "MF", club: "Barcelona" },
    { name: "Rodri", position: "MF", club: "Manchester City" },
    { name: "Nico Williams", position: "FW", club: "Athletic Club" },
  ],
  ARG: [
    { name: "Lionel Messi", position: "FW", club: "Inter Miami" },
    { name: "Julián Álvarez", position: "FW", club: "Atlético Madrid" },
    { name: "Enzo Fernández", position: "MF", club: "Chelsea" },
    { name: "Cristian Romero", position: "DF", club: "Tottenham" },
  ],
  FRA: [
    { name: "Kylian Mbappé", position: "FW", club: "Real Madrid" },
    { name: "Aurélien Tchouaméni", position: "MF", club: "Real Madrid" },
    { name: "Ousmane Dembélé", position: "FW", club: "Paris Saint-Germain" },
    { name: "William Saliba", position: "DF", club: "Arsenal" },
  ],
  ENG: [
    { name: "Jude Bellingham", position: "MF", club: "Real Madrid" },
    { name: "Harry Kane", position: "FW", club: "Bayern Munich" },
    { name: "Bukayo Saka", position: "FW", club: "Arsenal" },
    { name: "Declan Rice", position: "MF", club: "Arsenal" },
  ],
  COL: [
    { name: "Luis Díaz", position: "FW", club: "Liverpool" },
    { name: "James Rodríguez", position: "MF", club: "Club León" },
    { name: "Richard Ríos", position: "MF", club: "Palmeiras" },
    { name: "Daniel Muñoz", position: "DF", club: "Crystal Palace" },
  ],
  BRA: [
    { name: "Vinícius Júnior", position: "FW", club: "Real Madrid" },
    { name: "Rodrygo", position: "FW", club: "Real Madrid" },
    { name: "Raphinha", position: "FW", club: "Barcelona" },
    { name: "Bruno Guimarães", position: "MF", club: "Newcastle United" },
  ],
  POR: [
    { name: "Bruno Fernandes", position: "MF", club: "Manchester United" },
    { name: "Rafael Leão", position: "FW", club: "AC Milan" },
    { name: "Vitinha", position: "MF", club: "Paris Saint-Germain" },
    { name: "Rúben Dias", position: "DF", club: "Manchester City" },
  ],
  NED: [
    { name: "Virgil van Dijk", position: "DF", club: "Liverpool" },
    { name: "Cody Gakpo", position: "FW", club: "Liverpool" },
    { name: "Frenkie de Jong", position: "MF", club: "Barcelona" },
    { name: "Xavi Simons", position: "MF", club: "RB Leipzig" },
  ],
  CRO: [
    { name: "Luka Modrić", position: "MF", club: "Real Madrid" },
    { name: "Joško Gvardiol", position: "DF", club: "Manchester City" },
    { name: "Mateo Kovačić", position: "MF", club: "Manchester City" },
    { name: "Andrej Kramarić", position: "FW", club: "Hoffenheim" },
  ],
  ECU: [
    { name: "Moisés Caicedo", position: "MF", club: "Chelsea" },
    { name: "Pervis Estupiñán", position: "DF", club: "AC Milan" },
    { name: "Kendry Páez", position: "MF", club: "Chelsea" },
    { name: "Enner Valencia", position: "FW", club: "Internacional" },
  ],
  NOR: [
    { name: "Erling Haaland", position: "FW", club: "Manchester City" },
    { name: "Martin Ødegaard", position: "MF", club: "Arsenal" },
    { name: "Alexander Sørloth", position: "FW", club: "Atlético Madrid" },
    { name: "Antonio Nusa", position: "FW", club: "RB Leipzig" },
  ],
  GER: [
    { name: "Florian Wirtz", position: "MF", club: "Liverpool" },
    { name: "Jamal Musiala", position: "MF", club: "Bayern Munich" },
    { name: "Joshua Kimmich", position: "MF", club: "Bayern Munich" },
    { name: "Antonio Rüdiger", position: "DF", club: "Real Madrid" },
  ],
  SUI: [
    { name: "Granit Xhaka", position: "MF", club: "Bayer Leverkusen" },
    { name: "Manuel Akanji", position: "DF", club: "Manchester City" },
    { name: "Breel Embolo", position: "FW", club: "Monaco" },
    { name: "Dan Ndoye", position: "FW", club: "Bologna" },
  ],
  URU: [
    { name: "Federico Valverde", position: "MF", club: "Real Madrid" },
    { name: "Darwin Núñez", position: "FW", club: "Liverpool" },
    { name: "Ronald Araújo", position: "DF", club: "Barcelona" },
    { name: "Facundo Pellistri", position: "FW", club: "Panathinaikos" },
  ],
  TUR: [
    { name: "Arda Güler", position: "MF", club: "Real Madrid" },
    { name: "Hakan Çalhanoğlu", position: "MF", club: "Inter" },
    { name: "Kenan Yıldız", position: "FW", club: "Juventus" },
    { name: "Ferdi Kadıoğlu", position: "DF", club: "Brighton" },
  ],
  JPN: [
    { name: "Takefusa Kubo", position: "FW", club: "Real Sociedad" },
    { name: "Kaoru Mitoma", position: "FW", club: "Brighton" },
    { name: "Wataru Endō", position: "MF", club: "Liverpool" },
    { name: "Daichi Kamada", position: "MF", club: "Crystal Palace" },
  ],
  SEN: [
    { name: "Nicolas Jackson", position: "FW", club: "Chelsea" },
    { name: "Sadio Mané", position: "FW", club: "Al Nassr" },
    { name: "Pape Matar Sarr", position: "MF", club: "Tottenham" },
    { name: "Kalidou Koulibaly", position: "DF", club: "Al Hilal" },
  ],
  DEN: [
    { name: "Rasmus Højlund", position: "FW", club: "Manchester United" },
    { name: "Christian Eriksen", position: "MF", club: "Manchester United" },
    { name: "Pierre-Emile Højbjerg", position: "MF", club: "Marseille" },
    { name: "Joachim Andersen", position: "DF", club: "Fulham" },
  ],
  ITA: [
    { name: "Gianluigi Donnarumma", position: "GK", club: "Paris Saint-Germain" },
    { name: "Nicolò Barella", position: "MF", club: "Inter" },
    { name: "Federico Chiesa", position: "FW", club: "Liverpool" },
    { name: "Riccardo Calafiori", position: "DF", club: "Arsenal" },
  ],
  BEL: [
    { name: "Kevin De Bruyne", position: "MF", club: "Napoli" },
    { name: "Jérémy Doku", position: "FW", club: "Manchester City" },
    { name: "Romelu Lukaku", position: "FW", club: "Napoli" },
    { name: "Amadou Onana", position: "MF", club: "Aston Villa" },
  ],
  MEX: [
    { name: "Santiago Giménez", position: "FW", club: "AC Milan" },
    { name: "Edson Álvarez", position: "MF", club: "West Ham" },
    { name: "Hirving Lozano", position: "FW", club: "San Diego FC" },
    { name: "Raúl Jiménez", position: "FW", club: "Fulham" },
  ],
  USA: [
    { name: "Christian Pulisic", position: "FW", club: "AC Milan" },
    { name: "Weston McKennie", position: "MF", club: "Juventus" },
    { name: "Yunus Musah", position: "MF", club: "AC Milan" },
    { name: "Antonee Robinson", position: "DF", club: "Fulham" },
  ],
  CAN: [
    { name: "Alphonso Davies", position: "DF", club: "Bayern Munich" },
    { name: "Jonathan David", position: "FW", club: "Juventus" },
    { name: "Tajon Buchanan", position: "FW", club: "Villarreal" },
    { name: "Stephen Eustáquio", position: "MF", club: "Porto" },
  ],
  MAR: [
    { name: "Achraf Hakimi", position: "DF", club: "Paris Saint-Germain" },
    { name: "Brahim Díaz", position: "MF", club: "Real Madrid" },
    { name: "Youssef En-Nesyri", position: "FW", club: "Fenerbahçe" },
    { name: "Bilal El Khannouss", position: "MF", club: "Stuttgart" },
  ],
  KOR: [
    { name: "Son Heung-min", position: "FW", club: "Los Angeles FC" },
    { name: "Lee Kang-in", position: "MF", club: "Paris Saint-Germain" },
    { name: "Kim Min-jae", position: "DF", club: "Bayern Munich" },
    { name: "Hwang Hee-chan", position: "FW", club: "Wolverhampton" },
  ],
  AUT: [
    { name: "David Alaba", position: "DF", club: "Real Madrid" },
    { name: "Marcel Sabitzer", position: "MF", club: "Borussia Dortmund" },
    { name: "Konrad Laimer", position: "MF", club: "Bayern Munich" },
    { name: "Christoph Baumgartner", position: "MF", club: "RB Leipzig" },
  ],
  SRB: [
    { name: "Dušan Vlahović", position: "FW", club: "Juventus" },
    { name: "Sergej Milinković-Savić", position: "MF", club: "Al Hilal" },
    { name: "Aleksandar Mitrović", position: "FW", club: "Al Hilal" },
    { name: "Dušan Tadić", position: "MF", club: "Al Wahda" },
  ],
  POL: [
    { name: "Robert Lewandowski", position: "FW", club: "Barcelona" },
    { name: "Piotr Zieliński", position: "MF", club: "Inter" },
    { name: "Nicola Zalewski", position: "DF", club: "Inter" },
    { name: "Sebastian Szymański", position: "MF", club: "Fenerbahçe" },
  ],
};

const POSITION_LABEL: Record<Position, string> = {
  GK: "Goalkeeper",
  DF: "Defender",
  MF: "Midfielder",
  FW: "Forward",
};

export function positionLabel(p: Position): string {
  return POSITION_LABEL[p];
}

// Tri-nation-free position tints (kept subtle).
export function positionColor(p: Position): { text: string; bg: string } {
  switch (p) {
    case "GK":
      return { text: "#fcd34d", bg: "rgba(252,211,77,0.12)" };
    case "DF":
      return { text: "#7dd3fc", bg: "rgba(125,211,252,0.12)" };
    case "MF":
      return { text: "#6ee7a8", bg: "rgba(110,231,168,0.12)" };
    case "FW":
      return { text: "#fca5a5", bg: "rgba(252,165,165,0.12)" };
  }
}

export function getPlayers(code: string): Player[] {
  return PLAYERS[code.toUpperCase()] ?? [];
}

// Reliable search deep-links (never 404).
export function playerLinks(name: string) {
  const q = encodeURIComponent(name);
  return {
    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(
      name + " skills goals highlights"
    )}`,
    transfermarkt: `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${q}`,
    fbref: `https://fbref.com/en/search/search.fcgi?search=${q}`,
    wikipedia: `https://en.wikipedia.org/wiki/Special:Search?go=Go&search=${encodeURIComponent(
      name + " footballer"
    )}`,
  };
}

export function teamHighlightsUrl(teamName: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    teamName + " football highlights"
  )}`;
}
