import { IRatings } from '../entities/entities';

const sortRating = (ratings: IRatings[]) => {
  const rating = ratings.sort((ratingsA: IRatings, ratingsB: IRatings) => {
    if (ratingsA.totalPoints < ratingsB.totalPoints) { return 1; }
    if (ratingsA.totalPoints > ratingsB.totalPoints) { return -1; }
    if (ratingsA.totalVictories < ratingsB.totalVictories) { return 1; }
    if (ratingsA.totalVictories > ratingsB.totalVictories) { return -1; }
    if (ratingsA.goalsBalance < ratingsB.goalsBalance) { return 1; }
    if (ratingsA.goalsBalance > ratingsB.goalsBalance) { return -1; }
    if (ratingsA.goalsFavor < ratingsB.goalsFavor) { return 1; }
    if (ratingsA.goalsFavor > ratingsB.goalsFavor) { return -1; }
    if (ratingsA.goalsOwn < ratingsB.goalsOwn) { return 1; }
    if (ratingsA.goalsOwn > ratingsB.goalsOwn) { return -1; }
    return 0;
  });
  return rating;
};

const sortTeams = (teams: IRatings[]) => {
  const teamsSorted = teams.sort((ratingA, ratingB) => {
    if (ratingA.name < ratingB.name) return -1;
    if (ratingB.name > ratingA.name) return 1;
    return 0;
  });

  return teamsSorted;
};

export default { sortRating, sortTeams };
