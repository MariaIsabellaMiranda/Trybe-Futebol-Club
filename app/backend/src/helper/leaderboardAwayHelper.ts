import { ITeamsAway } from '../entities/entities';

const calculateTotalPointsAway = (teams: any) => {
  let wins = 0;
  let loss = 0;
  let draw = 0;
  let totalPoints = 0;

  teams.awayM.forEach((matches: any) => {
    if (matches.homeTeamGoals < matches.awayTeamGoals) {
      wins += 1;
      totalPoints += 3;
    } else if (matches.homeTeamGoals > matches.awayTeamGoals) {
      loss += 1;
    } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
      draw += 1;
      totalPoints += 1;
    }
  });

  return { wins, loss, draw, totalPoints };
};

const calculateGoalsAway = (teams: ITeamsAway) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  teams.awayM.forEach((matches: any) => {
    goalsFavor += matches.awayTeamGoals;
    goalsOwn += matches.homeTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsFavor, goalsOwn };
};

const totalRatingAway = (teams: any) => {
  const points = calculateTotalPointsAway(teams);
  const goals = calculateGoalsAway(teams);
  const totalGames = teams.awayM.length;
  const efficiency = (points.totalPoints / (totalGames * 3)) * 100;

  return {
    name: teams.teamName,
    totalPoints: points.totalPoints,
    totalGames,
    totalVictories: points.wins,
    totalDraws: points.draw,
    totalLosses: points.loss,
    goalsFavor: goals.goalsFavor,
    goalsOwn: goals.goalsOwn,
    goalsBalance: goals.goalsBalance,
    efficiency: Number(efficiency.toFixed(2)),
  };
};

export default { totalRatingAway };
