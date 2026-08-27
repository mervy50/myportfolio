import { ADMIN_PATH as DEFAULT_ADMIN_PATH } from "@shared/const";

/**
 * Set VITE_ADMIN_PATH in the hosting environment to change the private admin
 * route without editing application code. It must remain an absolute path.
 */
const configuredPath = import.meta.env.VITE_ADMIN_PATH;

export const ADMIN_PATH = configuredPath?.startsWith("/") && !configuredPath.startsWith("//")
  ? configuredPath.replace(/\/$/, "") || DEFAULT_ADMIN_PATH
  : DEFAULT_ADMIN_PATH;
