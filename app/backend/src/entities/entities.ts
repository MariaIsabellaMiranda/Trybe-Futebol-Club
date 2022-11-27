export interface ILogin {
  email: string,
  password: string,
}

export interface IUser {
  id?: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export enum StatusCodes {
  ok = 200,
  created = 201,
  tokenNot = 401,
  fieldsNot = 400,
  notExist = 404,
}

export interface IMatches {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: string | number,
}

export interface ITeamsHome {
  id: number,
  teamName: string,
  homeM: [
    {
      id: number,
      homeTeam: number,
      homeTeamGoals: number,
      awayTeam: number,
      awayTeamGoals: number,
      inProgress: boolean
    } ]
}

export interface ITeamsAway {
  id: number,
  teamName: string,
  awayM: [
    {
      id: number,
      homeTeam: number,
      homeTeamGoals: number,
      awayTeam: number,
      awayTeamGoals: number,
      inProgress: boolean
    } ]
}

export interface IRatings {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
