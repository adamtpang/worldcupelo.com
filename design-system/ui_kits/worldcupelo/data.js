// worldcupelo.com — team data + helpers, lifted from lib/teams.ts.
// Exposed as window.WCE for the UI-kit screens.
(function () {
  const TEAMS = [
    { rank: 1, name: "Spain", code: "ESP", rating: 2171, confederation: "UEFA", wcTitles: 1, peakRating: 2171 },
    { rank: 2, name: "Argentina", code: "ARG", rating: 2113, confederation: "CONMEBOL", wcTitles: 3, peakRating: 2148 },
    { rank: 3, name: "France", code: "FRA", rating: 2063, confederation: "UEFA", wcTitles: 2, peakRating: 2117 },
    { rank: 4, name: "England", code: "ENG", rating: 2042, confederation: "UEFA", wcTitles: 1, peakRating: 2062 },
    { rank: 5, name: "Colombia", code: "COL", rating: 1998, confederation: "CONMEBOL", peakRating: 2024 },
    { rank: 6, name: "Brazil", code: "BRA", rating: 1979, confederation: "CONMEBOL", wcTitles: 5, peakRating: 2154 },
    { rank: 7, name: "Portugal", code: "POR", rating: 1976, confederation: "UEFA", peakRating: 2027 },
    { rank: 8, name: "Netherlands", code: "NED", rating: 1959, confederation: "UEFA", peakRating: 2078 },
    { rank: 9, name: "Croatia", code: "CRO", rating: 1933, confederation: "UEFA", peakRating: 1992 },
    { rank: 9, name: "Ecuador", code: "ECU", rating: 1933, confederation: "CONMEBOL", peakRating: 1933 },
    { rank: 11, name: "Norway", code: "NOR", rating: 1922, confederation: "UEFA", peakRating: 1922 },
    { rank: 12, name: "Germany", code: "GER", rating: 1910, confederation: "UEFA", wcTitles: 4, peakRating: 2205 },
    { rank: 13, name: "Switzerland", code: "SUI", rating: 1897, confederation: "UEFA", peakRating: 1903 },
    { rank: 14, name: "Uruguay", code: "URU", rating: 1890, confederation: "CONMEBOL", wcTitles: 2, peakRating: 2018 },
    { rank: 15, name: "Turkey", code: "TUR", rating: 1880, confederation: "UEFA", peakRating: 1880 },
    { rank: 16, name: "Japan", code: "JPN", rating: 1879, confederation: "AFC", peakRating: 1879 },
    { rank: 17, name: "Senegal", code: "SEN", rating: 1869, confederation: "CAF", peakRating: 1869 },
    { rank: 18, name: "Denmark", code: "DEN", rating: 1864, confederation: "UEFA", peakRating: 1934 },
    { rank: 19, name: "Italy", code: "ITA", rating: 1859, confederation: "UEFA", wcTitles: 4, peakRating: 2117 },
    { rank: 20, name: "Belgium", code: "BEL", rating: 1849, confederation: "UEFA", peakRating: 2055 },
    { rank: 21, name: "Mexico", code: "MEX", rating: 1834, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1875 },
    { rank: 22, name: "Paraguay", code: "PAR", rating: 1833, confederation: "CONMEBOL", peakRating: 1872 },
    { rank: 23, name: "Austria", code: "AUT", rating: 1818, confederation: "UEFA", peakRating: 1880 },
    { rank: 24, name: "Morocco", code: "MAR", rating: 1806, confederation: "CAF", peakRating: 1869 },
    { rank: 24, name: "Canada", code: "CAN", rating: 1806, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1806 },
    { rank: 26, name: "Ukraine", code: "UKR", rating: 1802, confederation: "UEFA", peakRating: 1830 },
    { rank: 27, name: "Scotland", code: "SCO", rating: 1790, confederation: "UEFA", peakRating: 1830 },
    { rank: 28, name: "South Korea", code: "KOR", rating: 1784, confederation: "AFC", peakRating: 1838 },
    { rank: 29, name: "Russia", code: "RUS", rating: 1782, confederation: "UEFA", peakRating: 1850 },
    { rank: 30, name: "Australia", code: "AUS", rating: 1774, confederation: "AFC", peakRating: 1796 },
    { rank: 31, name: "Serbia", code: "SRB", rating: 1769, confederation: "UEFA", peakRating: 1827 },
    { rank: 32, name: "Greece", code: "GRE", rating: 1761, confederation: "UEFA", peakRating: 1853 },
    { rank: 33, name: "Iran", code: "IRN", rating: 1754, confederation: "AFC", peakRating: 1797 },
    { rank: 34, name: "United States", code: "USA", rating: 1747, confederation: "CONCACAF", host: true, qualified: true, peakRating: 1810 },
    { rank: 35, name: "Panama", code: "PAN", rating: 1743, confederation: "CONCACAF", peakRating: 1755 },
    { rank: 36, name: "Nigeria", code: "NGA", rating: 1739, confederation: "CAF", peakRating: 1801 },
    { rank: 37, name: "Poland", code: "POL", rating: 1735, confederation: "UEFA", peakRating: 1841 },
    { rank: 37, name: "Uzbekistan", code: "UZB", rating: 1735, confederation: "AFC", peakRating: 1735 },
    { rank: 39, name: "Czechia", code: "CZE", rating: 1731, confederation: "UEFA", peakRating: 1907 },
    { rank: 39, name: "Chile", code: "CHI", rating: 1731, confederation: "CONMEBOL", peakRating: 1939 },
    { rank: 41, name: "Algeria", code: "ALG", rating: 1728, confederation: "CAF", peakRating: 1809 },
    { rank: 42, name: "Wales", code: "WAL", rating: 1715, confederation: "UEFA", peakRating: 1768 },
    { rank: 42, name: "Venezuela", code: "VEN", rating: 1715, confederation: "CONMEBOL", peakRating: 1715 },
    { rank: 44, name: "Kosovo", code: "KVX", rating: 1714, confederation: "UEFA", peakRating: 1714 },
    { rank: 45, name: "Peru", code: "PER", rating: 1708, confederation: "CONMEBOL", peakRating: 1815 },
    { rank: 46, name: "Hungary", code: "HUN", rating: 1698, confederation: "UEFA", peakRating: 1969 },
    { rank: 47, name: "Slovenia", code: "SVN", rating: 1695, confederation: "UEFA", peakRating: 1700 },
    { rank: 48, name: "Jordan", code: "JOR", rating: 1691, confederation: "AFC", peakRating: 1691 },
    { rank: 49, name: "Ireland", code: "IRL", rating: 1688, confederation: "UEFA", peakRating: 1814 },
    { rank: 50, name: "Slovakia", code: "SVK", rating: 1687, confederation: "UEFA", peakRating: 1740 },
    { rank: 51, name: "Bolivia", code: "BOL", rating: 1665, confederation: "CONMEBOL", peakRating: 1814 },
    { rank: 52, name: "Albania", code: "ALB", rating: 1664, confederation: "UEFA", peakRating: 1664 },
    { rank: 53, name: "Sweden", code: "SWE", rating: 1660, confederation: "UEFA", peakRating: 1881 },
    { rank: 53, name: "Egypt", code: "EGY", rating: 1660, confederation: "CAF", peakRating: 1735 },
    { rank: 55, name: "Georgia", code: "GEO", rating: 1650, confederation: "UEFA", peakRating: 1660 },
    { rank: 56, name: "Romania", code: "ROU", rating: 1642, confederation: "UEFA", peakRating: 1842 },
    { rank: 57, name: "DR Congo", code: "COD", rating: 1639, confederation: "CAF", peakRating: 1684 },
    { rank: 58, name: "Ivory Coast", code: "CIV", rating: 1637, confederation: "CAF", peakRating: 1786 },
    { rank: 59, name: "Costa Rica", code: "CRC", rating: 1632, confederation: "CONCACAF", peakRating: 1722 },
    { rank: 60, name: "Israel", code: "ISR", rating: 1631, confederation: "UEFA", peakRating: 1701 },
    { rank: 61, name: "Tunisia", code: "TUN", rating: 1614, confederation: "CAF", peakRating: 1714 },
    { rank: 62, name: "Cameroon", code: "CMR", rating: 1606, confederation: "CAF", peakRating: 1763 },
    { rank: 63, name: "Northern Ireland", code: "NIR", rating: 1602, confederation: "UEFA", peakRating: 1735 },
    { rank: 64, name: "North Macedonia", code: "MKD", rating: 1592, confederation: "UEFA", peakRating: 1606 },
    { rank: 64, name: "Saudi Arabia", code: "KSA", rating: 1592, confederation: "AFC", peakRating: 1701 },
    { rank: 66, name: "Mali", code: "MLI", rating: 1589, confederation: "CAF", peakRating: 1660 },
    { rank: 67, name: "New Zealand", code: "NZL", rating: 1586, confederation: "OFC", peakRating: 1645 },
    { rank: 68, name: "Iraq", code: "IRQ", rating: 1583, confederation: "AFC", peakRating: 1614 },
    { rank: 69, name: "Bosnia & Herzegovina", code: "BIH", rating: 1571, confederation: "UEFA", peakRating: 1773 },
    { rank: 70, name: "Honduras", code: "HON", rating: 1567, confederation: "CONCACAF", peakRating: 1690 },
    { rank: 71, name: "Iceland", code: "ISL", rating: 1566, confederation: "UEFA", peakRating: 1733 },
  ];

  const CONFEDERATIONS = {
    UEFA: { name: "UEFA", region: "Europe", color: "#0066b3", text: "#4d9fe0" },
    CONMEBOL: { name: "CONMEBOL", region: "South America", color: "#febe10", text: "#febe10" },
    CONCACAF: { name: "CONCACAF", region: "North America", color: "#e30613", text: "#f06a72" },
    AFC: { name: "AFC", region: "Asia", color: "#003a70", text: "#5a8fc7" },
    CAF: { name: "CAF", region: "Africa", color: "#009639", text: "#3cc06f" },
    OFC: { name: "OFC", region: "Oceania", color: "#0080c0", text: "#3ba3da" },
  };

  function ratingTier(r) {
    if (r >= 2100) return { label: "Elite", color: "var(--wce-tier-elite)" };
    if (r >= 2000) return { label: "World Class", color: "var(--wce-tier-world)" };
    if (r >= 1900) return { label: "Top Tier", color: "var(--wce-tier-top)" };
    if (r >= 1800) return { label: "Strong", color: "var(--wce-tier-strong)" };
    if (r >= 1700) return { label: "Competitive", color: "var(--wce-tier-competitive)" };
    if (r >= 1600) return { label: "Developing", color: "var(--wce-tier-developing)" };
    return { label: "Emerging", color: "var(--wce-tier-emerging)" };
  }

  function winProbability(rA, rB, homeAdvantage = 0) {
    return 1 / (1 + Math.pow(10, (rB - rA - homeAdvantage) / 400));
  }

  // Full result split (win/draw/loss) given two ratings + home advantage.
  function resultSplit(rA, rB, homeAdvantage = 0) {
    const pWin = winProbability(rA, rB, homeAdvantage);
    const pLose = 1 - pWin;
    const drawFactor = Math.exp(-Math.pow(rA + homeAdvantage - rB, 2) / 200000);
    const draw = 0.27 * drawFactor;
    return { win: pWin * (1 - draw / 2), draw, loss: pLose * (1 - draw / 2) };
  }

  window.WCE = { TEAMS, CONFEDERATIONS, ratingTier, winProbability, resultSplit };
})();
