export type Team = {
  name: string;
};

export type Game = {
  home: Team;
  away: Team;
  homeScore: number;
  awayScore: number;
  date: Date;
};

export type Season = Array<Game>;

export type League = {
  teams: Array<Team>;
  seasons: Array<Season>;
};
