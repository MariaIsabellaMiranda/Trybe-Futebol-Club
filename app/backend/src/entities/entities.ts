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
