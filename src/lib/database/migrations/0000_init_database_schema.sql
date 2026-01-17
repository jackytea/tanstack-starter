CREATE TABLE "accounts" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "name" text,
  "image" text,
  "scope" text,
  "id_token" text,
  "password" text,
  "description" text,
  "access_token" text,
  "refresh_token" text,
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL,
  "access_token_expires_at" timestamp,
  "refresh_token_expires_at" timestamp,
  "user_id" uuid NOT NULL
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "token" text NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL,
  "user_id" uuid NOT NULL,
  "account_id" uuid,
  CONSTRAINT "sessions_token_unique" UNIQUE("token")
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "image" text,
  "name" text NOT NULL,
  "description" text,
  "email" text NOT NULL,
  "email_verified" boolean NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL,
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE "verifications" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "value" text NOT NULL,
  "identifier" text NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE cascade;
