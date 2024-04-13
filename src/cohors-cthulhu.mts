// Import helper/utility classes and constants.
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs";

import { HooksCohors } from "./hooks-cohors.mjs";

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */
registerHandlebarsHelpers();

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
HooksCohors.listen();
