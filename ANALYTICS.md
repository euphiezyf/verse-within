# Verse Within Analytics

Verse Within tracks product events into `public.analytics_events` in Supabase. Events are designed for user-flow and practice-quality analysis without storing verse text, typed answers, transcripts, or raw search terms.

## Core Identity

- `anonymous_id`: stable browser-level id.
- `session_id`: stable id for the current browser tab session.
- `user_id`: Supabase auth user id when signed in.
- `device_type`: `mobile`, `tablet`, or `desktop`.
- `event_properties`: shared app state plus event-specific details.

## Event Groups

- App and navigation: `app_opened`, `tab_selected`, `add_verse_opened`, `add_verse_cancelled`.
- Auth and sync: `sign_in_started`, `user_signed_in`, `sign_out_clicked`, `cloud_progress_identical`, `sync_prompt_shown`, `sync_merge_clicked`, `sync_merge_succeeded`, `sync_merge_failed`, `sync_use_account_clicked`, `sync_decide_later_clicked`.
- Language and library: `ui_language_changed`, `library_language_changed`, `library_search_started`, `library_search_cleared`, `library_verse_opened`.
- Verse lifecycle: `verse_added`, `verse_deleted`, `verse_set_for_week`, `verse_removed_from_week`, `verse_completed`.
- Practice flow: `practice_mode_selected`, `practice_step_advanced`, `hide_difficulty_selected`, `fill_difficulty_selected`, `recall_input_selected`, `hint_toggled`, `hidden_token_toggled`, `practice_again_clicked`, `listen_clicked`, `answer_checked`.
- Speech: `speech_recitation_started`, `speech_recitation_stopped`, `speech_recitation_error`, `speech_recitation_unsupported`.
- Trouble words: `trouble_reset`, `all_trouble_reset`.

## Useful Dashboard Cuts

- Activation: `app_opened` to `verse_added` or `library_verse_opened`.
- Practice funnel: `practice_mode_selected` / `practice_step_advanced` to `answer_checked`.
- Mode effectiveness: compare `answer_checked.accuracy` by `practiceMode`, `hideDensity`, `clozeDensity`, and `recallInput`.
- Retention signal: repeated sessions by `anonymous_id` or `user_id`.
- Friction: search starts with no verse open, sync prompts deferred, speech unsupported/errors, repeated low-accuracy checks.
