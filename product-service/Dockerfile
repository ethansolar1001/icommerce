FROM node:12-alpine as base
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /src

RUN chown -R appuser /src
USER appuser
COPY --chown=appuser:appgroup . .

RUN yarn install && yarn build

FROM base AS test
ENTRYPOINT ["yarn", "test"]

FROM base AS app
EXPOSE 5000
ENV NODE_ENV='production'
CMD ["yarn", "start:prod"]