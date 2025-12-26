# ○ palla

## Game Server

To launch the game server locally, with [bun](https://bun.sh/), run:

```shell
bun start
```

## Build

Set the following environment variables

- `WEBSOCKET_URL`

then run

```shell
bun run build
```

it will generate files in the _public_ folder.

## Development

There are no dependencies other than _development dependencies_ needed to lint code, check types, etc.

To start contributing to the code base, install dependencies and the commit hook:

```shell
bun install
bun run install_pre_commit_hook
```

