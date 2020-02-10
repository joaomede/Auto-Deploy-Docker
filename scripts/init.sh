#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

sleep 5s
node dist/db/migrate.js
node dist/server.js