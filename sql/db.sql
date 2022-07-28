CREATE TABLE IF NOT EXISTS "sh".user_categories (
   "id" SERIAL PRIMARY KEY,
   "descripcion" varchar(255) NOT NULL, 
   "created_at" timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
   "updated_at" timestamp NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "sh".persons (
   "id" SERIAL PRIMARY KEY,
   "lastname" varchar(255) NOT NULL, 
   "firstname" varchar(255) NOT NULL, 
   "gender" varchar(255) NOT NULL, 
   "birth_date" date DEFAULT NULL, 
   "phone" varchar(255) DEFAULT NULL, 
   "created_at" timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
   "updated_at" timestamp NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "sh".users (
   "id" SERIAL PRIMARY KEY,
   "username" varchar(255) NOT NULL, 
   "email" varchar(255) NOT NULL, 
   "password" varchar(255) NOT NULL, 
   "user_status" boolean NOT NULL, 
   "remember_token" varchar(100) DEFAULT NULL, 
   "persons_id" bigint CHECK ("persons_id" >= 0) NOT NULL,
   "user_categories_id" bigint CHECK ("user_categories_id" >= 0) DEFAULT NULL,
   "created_at" timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
   "updated_at" timestamp NULL DEFAULT NULL
);

INSERT INTO "sh".user_categories (id, descripcion, created_at, updated_at) VALUES
	(1, 'Admin', now(), NULL),
	(2, 'Student', now(), NULL),
	(3, 'Owner', now(), NULL);
