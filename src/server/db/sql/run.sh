#!/usr/bin/env sh
psql -h $SNIKTAU_DB_HOST -U $SNIKTAU_DB_USER -d sniktau -a -f src/db/sql/0001.sql
