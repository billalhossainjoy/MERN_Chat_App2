/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
