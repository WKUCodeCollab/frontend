#!/bin/sh

docker exec blissful_allen /bin/sh -c "javac /usr/src/dockerTest/Main.java"
docker exec blissful_allen /bin/sh -c "cd usr/src/dockerTest; java Main > output.txt"

