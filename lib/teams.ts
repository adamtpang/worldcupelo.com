export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "AFC"
  | "CAF"
  | "OFC";

export type Team = {
  rank: number;
  name: string;
  code: string;
  flag: string;
  rating: number;
  confederation: Confederation;
  host?: boolean;
  qualified?: boolean;
  wcTitles?: number;
  peakRating?: number;
};

export const TEAMS: Team[] = [
  { rank: 1, name: "Spain", code: "ESP", flag: "🇪🇸", rating: 2171, confederation: "UEFA", wcTitles: 1, peakRating: 2171 },
  { rank: 2, name: "Argentina", code: "ARG", flag: "🇦🇷", rating: 2113, confederation: "CONMEBOL", wcTitles: 3, peakRating: 2148 },
  { rank: 3, name: "France", code: "FRA", flag: "🇫🇷", rating: 2063, confederation: "UEFA", wcTitles: 2, peakRating: 2117 },
  { rank: 4, name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 2042, confederation: "UEFA", wcTitles: 1, peakRating: 2062 },
  { rank: 5, name: "Colombia", code: "COL", flag: "🇨🇴", rating: 1998, confederation: "CONMEBOL", peakRating: 2024 },
  { rank: 6, name: "Brazil", code: "BRA", flag: "🇧🇷", rating: 1979, confederation: "CONMEBOL", wcTitles: 5, peakRating: 2154 },
  { rank: 7, name: "Portugal", code: "POR", flag: "🇵🇹", rating: 1976, confederation: "UEFA", peakRating: 2027 },
  { rank: 8, name: "Netherlands", code: "NED", flag: "🇳🇱", rating: 1959, confederation: "UEFA", peakRating: 2078 },
  { rank: 9, name: "Croatia", code: "CRO", flag: "🇭🇷", rating: 1933, confederation: "UEFA", peakRating: 1992 },
  { rank: 9, name: "Ecuador", code: "ECU", flag: "🇪🇨", rating: 1933, confederation: "CONMEBOL", peakRating: 1933 },
  { rank: 11, name: "Norway", code: "NOR", flag: "🇳🇴", rating: 1922, confederation: "UEFA", peakRating: 1922 },
  { rank: 12, name: "Germany", code: "GER", flag: "🇩🇪", rating: 1910, confederation: "UEFA", wcTitles: 4, peakRating: 2205 },
  { rank: 13, name: "Switzerland", code: "SUI", flag: "🇨🇭", rating: 1897, confederation: "UEFA", peakRating: 1903 },
  { rank: 14, name: "Uruguay", code: "URU", flag: "🇺🇾", rating: 1890, confederation: "CONMEBOL", wcTitles: 2, peakRating: 2018 },
  { rank: 15, name: "Turkey", code: "TUR", flag: "🇹🇷", rating: 1880, confederation: "UEFA", peakRating: 1880 },
  { rank: 16, name: "Japan", code: "JPN", flag: "🇯🇵", rating: 1879, confederation: "AFC", peakRating: 1879 },
  { rank: 17, name: "Senegal", code: "SEN", flag: "🇸🇳", rating: 1869, confederation: "CAF", peakRating: 1869 },
  { rank: 18, name: "Denmark", code: "DEN", flag: "🇩🇰", rating: 1864, confederation: "UEFA", peakRating: 1934 },
  { rank: 19, name: "Italy", code: "ITA", flag: "🇮🇹", rating: 1859, confederation: "UEFA", wcTitles: 4, peakRating: 2117 },
  { rank: 20, name: "Belgium", code: "BEL", flag: "🇧🇪", rating: 1849, confederation: "UEFA", peakRating: 2055 },
  { rank: 21, name: "Mexico", code: "MEX", flag: "🇲🇽", rating: 1834, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1875 },
  { rank: 22, name: "Paraguay", code: "PAR", flag: "🇵🇾", rating: 1833, confederation: "CONMEBOL", peakRating: 1872 },
  { rank: 23, name: "Austria", code: "AUT", flag: "🇦🇹", rating: 1818, confederation: "UEFA", peakRating: 1880 },
  { rank: 24, name: "Morocco", code: "MAR", flag: "🇲🇦", rating: 1806, confederation: "CAF", peakRating: 1869 },
  { rank: 24, name: "Canada", code: "CAN", flag: "🇨🇦", rating: 1806, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1806 },
  { rank: 26, name: "Ukraine", code: "UKR", flag: "🇺🇦", rating: 1802, confederation: "UEFA", peakRating: 1830 },
  { rank: 27, name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 1790, confederation: "UEFA", peakRating: 1830 },
  { rank: 28, name: "South Korea", code: "KOR", flag: "🇰🇷", rating: 1784, confederation: "AFC", peakRating: 1838 },
  { rank: 29, name: "Russia", code: "RUS", flag: "🇷🇺", rating: 1782, confederation: "UEFA", peakRating: 1850 },
  { rank: 30, name: "Australia", code: "AUS", flag: "🇦🇺", rating: 1774, confederation: "AFC", peakRating: 1796 },
  { rank: 31, name: "Serbia", code: "SRB", flag: "🇷🇸", rating: 1769, confederation: "UEFA", peakRating: 1827 },
  { rank: 32, name: "Greece", code: "GRE", flag: "🇬🇷", rating: 1761, confederation: "UEFA", peakRating: 1853 },
  { rank: 33, name: "Iran", code: "IRN", flag: "🇮🇷", rating: 1754, confederation: "AFC", peakRating: 1797 },
  { rank: 34, name: "United States", code: "USA", flag: "🇺🇸", rating: 1747, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1810 },
  { rank: 35, name: "Panama", code: "PAN", flag: "🇵🇦", rating: 1743, confederation: "CONCACAF", peakRating: 1755 },
  { rank: 36, name: "Nigeria", code: "NGA", flag: "🇳🇬", rating: 1739, confederation: "CAF", peakRating: 1801 },
  { rank: 37, name: "Poland", code: "POL", flag: "🇵🇱", rating: 1735, confederation: "UEFA", peakRating: 1841 },
  { rank: 37, name: "Uzbekistan", code: "UZB", flag: "🇺🇿", rating: 1735, confederation: "AFC", peakRating: 1735 },
  { rank: 39, name: "Czechia", code: "CZE", flag: "🇨🇿", rating: 1731, confederation: "UEFA", peakRating: 1907 },
  { rank: 39, name: "Chile", code: "CHI", flag: "🇨🇱", rating: 1731, confederation: "CONMEBOL", peakRating: 1939 },
  { rank: 41, name: "Algeria", code: "ALG", flag: "🇩🇿", rating: 1728, confederation: "CAF", peakRating: 1809 },
  { rank: 42, name: "Wales", code: "WAL", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", rating: 1715, confederation: "UEFA", peakRating: 1768 },
  { rank: 42, name: "Venezuela", code: "VEN", flag: "🇻🇪", rating: 1715, confederation: "CONMEBOL", peakRating: 1715 },
  { rank: 44, name: "Kosovo", code: "KVX", flag: "🇽🇰", rating: 1714, confederation: "UEFA", peakRating: 1714 },
  { rank: 45, name: "Peru", code: "PER", flag: "🇵🇪", rating: 1708, confederation: "CONMEBOL", peakRating: 1815 },
  { rank: 46, name: "Hungary", code: "HUN", flag: "🇭🇺", rating: 1698, confederation: "UEFA", peakRating: 1969 },
  { rank: 47, name: "Slovenia", code: "SVN", flag: "🇸🇮", rating: 1695, confederation: "UEFA", peakRating: 1700 },
  { rank: 48, name: "Jordan", code: "JOR", flag: "🇯🇴", rating: 1691, confederation: "AFC", peakRating: 1691 },
  { rank: 49, name: "Ireland", code: "IRL", flag: "🇮🇪", rating: 1688, confederation: "UEFA", peakRating: 1814 },
  { rank: 50, name: "Slovakia", code: "SVK", flag: "🇸🇰", rating: 1687, confederation: "UEFA", peakRating: 1740 },
  { rank: 51, name: "Bolivia", code: "BOL", flag: "🇧🇴", rating: 1665, confederation: "CONMEBOL", peakRating: 1814 },
  { rank: 52, name: "Albania", code: "ALB", flag: "🇦🇱", rating: 1664, confederation: "UEFA", peakRating: 1664 },
  { rank: 53, name: "Sweden", code: "SWE", flag: "🇸🇪", rating: 1660, confederation: "UEFA", peakRating: 1881 },
  { rank: 53, name: "Egypt", code: "EGY", flag: "🇪🇬", rating: 1660, confederation: "CAF", peakRating: 1735 },
  { rank: 55, name: "Georgia", code: "GEO", flag: "🇬🇪", rating: 1650, confederation: "UEFA", peakRating: 1660 },
  { rank: 56, name: "Romania", code: "ROU", flag: "🇷🇴", rating: 1642, confederation: "UEFA", peakRating: 1842 },
  { rank: 57, name: "DR Congo", code: "COD", flag: "🇨🇩", rating: 1639, confederation: "CAF", peakRating: 1684 },
  { rank: 58, name: "Ivory Coast", code: "CIV", flag: "🇨🇮", rating: 1637, confederation: "CAF", peakRating: 1786 },
  { rank: 59, name: "Costa Rica", code: "CRC", flag: "🇨🇷", rating: 1632, confederation: "CONCACAF", peakRating: 1722 },
  { rank: 60, name: "Israel", code: "ISR", flag: "🇮🇱", rating: 1631, confederation: "UEFA", peakRating: 1701 },
  { rank: 61, name: "Tunisia", code: "TUN", flag: "🇹🇳", rating: 1614, confederation: "CAF", peakRating: 1714 },
  { rank: 62, name: "Cameroon", code: "CMR", flag: "🇨🇲", rating: 1606, confederation: "CAF", peakRating: 1763 },
  { rank: 63, name: "Northern Ireland", code: "NIR", flag: "🇬🇧", rating: 1602, confederation: "UEFA", peakRating: 1735 },
  { rank: 64, name: "North Macedonia", code: "MKD", flag: "🇲🇰", rating: 1592, confederation: "UEFA", peakRating: 1606 },
  { rank: 64, name: "Saudi Arabia", code: "KSA", flag: "🇸🇦", rating: 1592, confederation: "AFC", peakRating: 1701 },
  { rank: 66, name: "Mali", code: "MLI", flag: "🇲🇱", rating: 1589, confederation: "CAF", peakRating: 1660 },
  { rank: 67, name: "New Zealand", code: "NZL", flag: "🇳🇿", rating: 1586, confederation: "OFC", peakRating: 1645 },
  { rank: 68, name: "Iraq", code: "IRQ", flag: "🇮🇶", rating: 1583, confederation: "AFC", peakRating: 1614 },
  { rank: 69, name: "Bosnia & Herzegovina", code: "BIH", flag: "🇧🇦", rating: 1571, confederation: "UEFA", peakRating: 1773 },
  { rank: 70, name: "Honduras", code: "HON", flag: "🇭🇳", rating: 1567, confederation: "CONCACAF", peakRating: 1690 },
  { rank: 71, name: "Iceland", code: "ISL", flag: "🇮🇸", rating: 1566, confederation: "UEFA", peakRating: 1733 },
  { rank: 72, name: "Cape Verde", code: "CPV", flag: "🇨🇻", rating: 1561, confederation: "CAF", peakRating: 1561 },
  { rank: 73, name: "Haiti", code: "HAI", flag: "🇭🇹", rating: 1542, confederation: "CONCACAF", peakRating: 1599 },
  { rank: 74, name: "Angola", code: "ANG", flag: "🇦🇴", rating: 1541, confederation: "CAF", peakRating: 1612 },
  { rank: 75, name: "United Arab Emirates", code: "UAE", flag: "🇦🇪", rating: 1540, confederation: "AFC", peakRating: 1660 },
  { rank: 76, name: "Burkina Faso", code: "BFA", flag: "🇧🇫", rating: 1533, confederation: "CAF", peakRating: 1614 },
  { rank: 77, name: "Jamaica", code: "JAM", flag: "🇯🇲", rating: 1530, confederation: "CONCACAF", peakRating: 1640 },
  { rank: 78, name: "South Africa", code: "RSA", flag: "🇿🇦", rating: 1529, confederation: "CAF", peakRating: 1791 },
  { rank: 79, name: "Guatemala", code: "GUA", flag: "🇬🇹", rating: 1526, confederation: "CONCACAF", peakRating: 1545 },
  { rank: 80, name: "Ghana", code: "GHA", flag: "🇬🇭", rating: 1509, confederation: "CAF", peakRating: 1758 },
  { rank: 80, name: "Finland", code: "FIN", flag: "🇫🇮", rating: 1509, confederation: "UEFA", peakRating: 1652 },
  { rank: 82, name: "Belarus", code: "BLR", flag: "🇧🇾", rating: 1496, confederation: "UEFA", peakRating: 1614 },
  { rank: 83, name: "Oman", code: "OMA", flag: "🇴🇲", rating: 1490, confederation: "AFC", peakRating: 1568 },
  { rank: 84, name: "Syria", code: "SYR", flag: "🇸🇾", rating: 1487, confederation: "AFC", peakRating: 1556 },
  { rank: 85, name: "Guinea", code: "GUI", flag: "🇬🇳", rating: 1485, confederation: "CAF", peakRating: 1583 },
  { rank: 86, name: "Palestine", code: "PLE", flag: "🇵🇸", rating: 1470, confederation: "AFC", peakRating: 1470 },
  { rank: 87, name: "Curaçao", code: "CUW", flag: "🇨🇼", rating: 1467, confederation: "CONCACAF", peakRating: 1467 },
  { rank: 88, name: "Bulgaria", code: "BUL", flag: "🇧🇬", rating: 1453, confederation: "UEFA", peakRating: 1822 },
  { rank: 89, name: "Montenegro", code: "MNE", flag: "🇲🇪", rating: 1444, confederation: "UEFA", peakRating: 1538 },
  { rank: 90, name: "Suriname", code: "SUR", flag: "🇸🇷", rating: 1440, confederation: "CONCACAF", peakRating: 1440 },
  { rank: 91, name: "Qatar", code: "QAT", flag: "🇶🇦", rating: 1427, confederation: "AFC", peakRating: 1734 },
  { rank: 92, name: "Libya", code: "LBY", flag: "🇱🇾", rating: 1424, confederation: "CAF", peakRating: 1538 },
  { rank: 92, name: "Gambia", code: "GAM", flag: "🇬🇲", rating: 1424, confederation: "CAF", peakRating: 1494 },
  { rank: 94, name: "Bahrain", code: "BHR", flag: "🇧🇭", rating: 1417, confederation: "AFC", peakRating: 1503 },
  { rank: 95, name: "Benin", code: "BEN", flag: "🇧🇯", rating: 1411, confederation: "CAF", peakRating: 1483 },
  { rank: 96, name: "Kazakhstan", code: "KAZ", flag: "🇰🇿", rating: 1410, confederation: "UEFA", peakRating: 1532 },
  { rank: 97, name: "Gabon", code: "GAB", flag: "🇬🇦", rating: 1405, confederation: "CAF", peakRating: 1568 },
  { rank: 98, name: "Niger", code: "NIG", flag: "🇳🇪", rating: 1404, confederation: "CAF", peakRating: 1456 },
];

export function getTeam(code: string): Team | undefined {
  return TEAMS.find((t) => t.code.toLowerCase() === code.toLowerCase());
}

export function getTeamsByConfederation(conf: Confederation): Team[] {
  return TEAMS.filter((t) => t.confederation === conf);
}

export const CONFEDERATIONS: Record<Confederation, { name: string; region: string; color: string }> = {
  UEFA: { name: "UEFA", region: "Europe", color: "#0066b3" },
  CONMEBOL: { name: "CONMEBOL", region: "South America", color: "#febe10" },
  CONCACAF: { name: "CONCACAF", region: "North America", color: "#e30613" },
  AFC: { name: "AFC", region: "Asia", color: "#003a70" },
  CAF: { name: "CAF", region: "Africa", color: "#009639" },
  OFC: { name: "OFC", region: "Oceania", color: "#0080c0" },
};

export function ratingTier(rating: number): { label: string; color: string } {
  if (rating >= 2100) return { label: "Elite", color: "text-amber-300" };
  if (rating >= 2000) return { label: "World Class", color: "text-emerald-300" };
  if (rating >= 1900) return { label: "Top Tier", color: "text-sky-300" };
  if (rating >= 1800) return { label: "Strong", color: "text-violet-300" };
  if (rating >= 1700) return { label: "Competitive", color: "text-zinc-300" };
  if (rating >= 1600) return { label: "Developing", color: "text-zinc-400" };
  return { label: "Emerging", color: "text-zinc-500" };
}

export function winProbability(rA: number, rB: number, homeAdvantage = 0): number {
  return 1 / (1 + Math.pow(10, (rB - rA - homeAdvantage) / 400));
}
