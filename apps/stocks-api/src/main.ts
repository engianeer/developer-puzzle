/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import {environment} from "./environments/environment";
import * as request from 'request-promise-native';
import {CacheSettings} from "./enums/stocks-api-enums";

const server = new Server({
  port: 3333,
  host: 'localhost'
});

const getHistoricalStockPrices = async (symbol, period) => {
  const url = environment.apiURL + '/beta/stock/' + symbol + '/chart/' + period + '?token=' + environment.apiKey;
  return await request(url);
};

server.method('getHistoricalStockPrices', getHistoricalStockPrices, {});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/api/{symbol}',
    handler: async (req, reply) => {

      const symbol = req.query.symbol;
      const period = req.query.period;

      return await server.methods.getHistoricalStockPrices(symbol, period);

    },
    options: {
      cache: {
        expiresIn: CacheSettings.TIME_OUT * 1000,
        privacy: 'private'
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
