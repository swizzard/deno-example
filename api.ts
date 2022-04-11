// import { collections } from './deps.ts';
// import { oak } from './deps.ts';
import { datetime } from './deps.ts';
// import { Game, League } from './models.ts';

// type RC = oak.RouterContext<string, oak.RouteParams<string>, League>;

// export async function addTeam(ctx: RC) {
//   const jsn = await ctx.request.body({ type: 'json' }).value;
//   ctx.state.teams.push(jsn);
//   ctx.response.body = ctx.state.teams;
// }

export function parseGameDate(s: string): Date {
  return datetime.parse(s, 'yyyy-MM-dd');
}

// export async function addGame(ctx: RC) {
//   const { home, away, homeScore, awayScore, date } = await ctx.request.body({
//     type: 'json',
//   }).value;
//   const gameDate = parseGameDate(date);
//   const game: Game = {
//     home: { name: home },
//     away: { name: away },
//     homeScore,
//     awayScore,
//     date: gameDate,
//   };
//   if (!ctx.state.seasons) {
//     ctx.state.seasons.push([game]);
//   } else {
//     ctx.state.seasons[-1].push(game);
//   }
//   ctx.response.body = ctx.state.seasons[-1];
// }

// export function teamRecord(ctx: RC) {
//   const { name, seasonId } = ctx.request.params;
//   const team = { name };
//   if (ctx.state.teams.includes(team)) {
//     const season = ctx.state.seasons[seasonId];
//     if (typeof season !== 'undefined') {
//       const record = collections.groupBy(
//         season,
//         ({ home, away, homeScore, awayScore }: Game) => {
//           if (team === home) {
//             return homeScore > awayScore ? 'win' : 'loss';
//           } else if (team === away) {
//             return awayScore > homeScore ? 'win' : 'loss';
//           } else {
//             return 'neither';
//           }
//         }
//       );
//       ctx.response.body = {
//         team,
//         wins: record.win?.length ?? 0,
//         losses: record.loss?.length ?? 0,
//       };
//     }
//   }
// }
