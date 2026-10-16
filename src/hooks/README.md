# Hooks

`useGlassSettings` exposes the shared appearance settings from the shell's `GlassSettingsProvider`. Defaults render consistently on the server and client; saved localStorage preferences restore after hydration. Values are validated, changes persist immediately when storage is available, and other browser tabs stay in sync. Reusable React hooks belong here; add client boundaries where browser APIs or React hooks are needed.
