#!/bin/bash
docker login --username hoangluong202;
# docker build -t registry-gitlab.geekup.io/gu_coi/coi-backend:latest .;
# docker push registry-gitlab.geekup.io/gu_coi/coi-backend:latest;

# ssh -T gu.aura.staging << EOF
#   cd coi-backend;
#   git pull;
#   docker pull registry-gitlab.geekup.io/gu_coi/coi-backend:latest;
#   docker compose -f docker-compose-staging.yml up -d --remove-orphans --force-recreate;
# EOF
