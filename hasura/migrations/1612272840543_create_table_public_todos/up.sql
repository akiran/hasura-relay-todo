CREATE TABLE "public"."todos"("id" uuid NOT NULL, "title" text NOT NULL, "completed" boolean NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
