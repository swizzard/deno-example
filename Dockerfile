FROM denoland/deno:latest

WORKDIR /app

RUN chown deno:deno /app

EXPOSE 8081

USER deno

RUN deno install --allow-read --allow-run --allow-write --unstable --root /app --name denon https://deno.land/x/denon/denon.ts

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache main.ts

CMD ["/app/bin/denon", "run", "--allow-env", "--allow-net", "main.ts"]
