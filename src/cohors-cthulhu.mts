// Import helper/utility classes and constants.
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs";
import { CustomComponents } from "./helpers/custom-components.mjs";

import { HooksCohors } from "./hooks-cohors.mjs";

registerHandlebarsHelpers();
CustomComponents.defineComponents();

HooksCohors.listen();
