FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD password

COPY ./createDB.sql /docker-entrypoint-initdb.d/

EXPOSE 40000




