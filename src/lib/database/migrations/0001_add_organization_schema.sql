CREATE TABLE "members" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "role" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL,
  "user_id" uuid NOT NULL,
  "organization_id" uuid NOT NULL
);

CREATE TABLE "organizations" (
  "id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
  "name" text,
  "slug" text NOT NULL,
  "logo" text,
  "metadata" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);

ALTER TABLE "accounts" ADD COLUMN "active_organization_id" uuid;
ALTER TABLE "sessions" ADD COLUMN "active_organization_id" uuid;
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "members" ADD CONSTRAINT "members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_active_organization_id_organizations_id_fk" FOREIGN KEY ("active_organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_active_organization_id_organizations_id_fk" FOREIGN KEY ("active_organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE cascade;
