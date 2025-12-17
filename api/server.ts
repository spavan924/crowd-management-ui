import server from '../dist/crowd-management-ui/server/server.mjs';

export default function handler(req: any, res: any) {
  return server(req, res);
}