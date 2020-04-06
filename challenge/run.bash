#!/usr/bin/env bash

(cd client && ./run.bash) &
(cd server && npm run start) &

wait
