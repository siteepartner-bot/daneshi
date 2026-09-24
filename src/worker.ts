export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (env?.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    return new Response("موسسه آموزش عالی غیرانتفاعی سپاهان - پرتال دانشجویی", {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 200,
    });
  },
};
