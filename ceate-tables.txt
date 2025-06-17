-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.profiles (
                                 id uuid NOT NULL,
                                 display_name text,
                                 avatar_url text,
                                 bio text,
                                 created_at timestamp with time zone DEFAULT now(),
                                 updated_at timestamp with time zone DEFAULT now(),
                                 CONSTRAINT profiles_pkey PRIMARY KEY (id),
                                 CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.task_collection_tasks (
                                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                                              task_id uuid NOT NULL,
                                              collection_id uuid NOT NULL,
                                              CONSTRAINT task_collection_tasks_pkey PRIMARY KEY (id),
                                              CONSTRAINT task_collection_tasks_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id),
                                              CONSTRAINT task_collection_tasks_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.task_collections(id)
);
CREATE TABLE public.task_collections (
                                         id uuid NOT NULL DEFAULT gen_random_uuid(),
                                         name text NOT NULL,
                                         description text,
                                         created_at timestamp with time zone DEFAULT now(),
                                         created_by uuid NOT NULL,
                                         CONSTRAINT task_collections_pkey PRIMARY KEY (id),
                                         CONSTRAINT task_collections_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.tasks (
                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                              title text NOT NULL,
                              description text,
                              created_at timestamp with time zone DEFAULT now(),
                              updated_at timestamp with time zone DEFAULT now(),
                              due_date timestamp with time zone,
                              status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])),
                              priority text DEFAULT 'medium'::text CHECK (priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text])),
                              created_by uuid NOT NULL,
                              assigned_to uuid,
                              CONSTRAINT tasks_pkey PRIMARY KEY (id),
                              CONSTRAINT tasks_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id),
                              CONSTRAINT tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES auth.users(id)
);
CREATE TABLE public.team_members (
                                     id uuid NOT NULL DEFAULT gen_random_uuid(),
                                     team_id uuid NOT NULL,
                                     user_id uuid NOT NULL,
                                     joined_at timestamp with time zone DEFAULT now(),
                                     CONSTRAINT team_members_pkey PRIMARY KEY (id),
                                     CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
                                     CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.team_task_collections (
                                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                                              team_id uuid NOT NULL,
                                              collection_id uuid NOT NULL,
                                              CONSTRAINT team_task_collections_pkey PRIMARY KEY (id),
                                              CONSTRAINT team_task_collections_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
                                              CONSTRAINT team_task_collections_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.task_collections(id)
);
CREATE TABLE public.teams (
                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                              team_name text NOT NULL UNIQUE,
                              description text,
                              owner_id uuid NOT NULL,
                              created_at timestamp with time zone DEFAULT now(),
                              updated_at timestamp with time zone DEFAULT now(),
                              avatar_url text,
                              CONSTRAINT teams_pkey PRIMARY KEY (id),
                              CONSTRAINT teams_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_task_collections (
                                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                                              user_id uuid NOT NULL,
                                              collection_id uuid NOT NULL,
                                              CONSTRAINT user_task_collections_pkey PRIMARY KEY (id),
                                              CONSTRAINT user_task_collections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
                                              CONSTRAINT user_task_collections_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.task_collections(id)
);