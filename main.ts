import { collections, oak } from './deps.ts';
import { parseGameDate } from './api.ts';
import { Game, League, Team } from './models.ts';
// import * as api from './api.ts';

const state: League = {
  teams: ['Mets', 'Phillies', 'Braves', 'Nationals', 'Marlins'].map((name) => ({
    name,
  })),
  seasons: [
    [
      {
        home: { name: 'Mets' },
        away: { name: 'Nationals' },
        homeScore: 5,
        awayScore: 0,
        date: new Date(2022, 4, 7),
      },
      {
        home: { name: 'Phillies' },
        away: { name: 'Braves' },
        homeScore: 3,
        awayScore: 1,
        date: new Date(2022, 4, 7),
      },
      {
        home: { name: 'Mets' },
        away: { name: 'Nationals' },
        homeScore: 3,
        awayScore: 1,
        date: new Date(2022, 4, 8),
      },
      {
        home: { name: 'Phillies' },
        away: { name: 'Braves' },
        homeScore: 2,
        awayScore: 3,
        date: new Date(2022, 4, 8),
      },
    ],
  ],
};

const app = new oak.Application<League>({
  contextState: 'alias',
  state,
});

const router = new oak.Router();
router
  .post('/teams', async (ctx) => {
    const jsn = await ctx.request.body({ type: 'json' }).value;
    ctx.state.teams.push(jsn);
    ctx.response.body = ctx.state.teams;
  })
  .post('/games', async (ctx) => {
    const { home, away, homeScore, awayScore, date } = await ctx.request.body({
      type: 'json',
    }).value;
    const gameDate = parseGameDate(date);
    const game: Game = {
      home: { name: home },
      away: { name: away },
      homeScore,
      awayScore,
      date: gameDate,
    };
    if (!ctx.state.seasons.length) {
      ctx.state.seasons.push([game]);
    } else {
      ctx.state.seasons[ctx.state.seasons.length - 1].push(game);
    }
    ctx.response.body = ctx.state.seasons[ctx.state.seasons.length - 1];
  })
  .get('/teams/:name/seasons/:seasonId/record', (ctx) => {
    const { name, seasonId } = ctx.params;
    if (ctx.state.teams.find(({ name: teamName }: Team) => teamName === name)) {
      const season = ctx.state.seasons[seasonId];
      if (typeof season !== 'undefined') {
        const record = collections.groupBy(
          season,
          ({ home, away, homeScore, awayScore }: Game) => {
            if (name === home.name) {
              return homeScore > awayScore ? 'win' : 'loss';
            } else if (name === away.name) {
              return awayScore > homeScore ? 'win' : 'loss';
            } else {
              return 'neither';
            }
          }
        );
        ctx.response.body = {
          team: { name },
          wins: record.win?.length ?? 0,
          losses: record.loss?.length ?? 0,
        };
      }
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 8081 });
