import { IRatings } from '../entities/entities';

const sumScores = (homeMatches: IRatings[], awayMatches: IRatings[]) => {
  const sum = homeMatches.map((teamHome, index) => {
    const totalGames = teamHome.totalGames + awayMatches[index].totalGames;
    const totalPoints = teamHome.totalPoints + awayMatches[index].totalPoints;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return {
      name: teamHome.name,
      totalPoints,
      totalGames,
      totalVictories: teamHome.totalVictories + awayMatches[index].totalVictories,
      totalDraws: teamHome.totalDraws + awayMatches[index].totalDraws,
      totalLosses: teamHome.totalLosses + awayMatches[index].totalLosses,
      goalsFavor: teamHome.goalsFavor + awayMatches[index].goalsFavor,
      goalsOwn: teamHome.goalsOwn + awayMatches[index].goalsOwn,
      goalsBalance: teamHome.goalsBalance + awayMatches[index].goalsBalance,
      efficiency: Number(efficiency.toFixed(2)),
    };
  });

  return sum;
};

export default { sumScores };
