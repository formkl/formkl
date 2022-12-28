import Formkl from "formkl";

import fs from "fs";
import path from "path";

export interface PluginOptions {
  extenstion?: string;
  dts?: {
    dir?: string;
  };
}

export default (options?: PluginOptions) => {
  return {
    name: "formkl-loader",
    buildStart() {
      const declaration = `// Generated by '@formkl/plugin-vite'
import type { Formkl } from "@formkl/shared";\n
declare module "*.form" {
	const form: Formkl;
	export default form;
}`;

      fs.writeFile(
        path.resolve(options?.dts?.dir || "./", "form-shim.d.ts"),
        declaration,
        (err) => {
          if (err) throw err;
        },
      );
    },
    transform(code: string, id: string) {
      if (id.endsWith(options?.extenstion || ".form")) {
        let loadedFormModule = {};
        try {
          loadedFormModule = Formkl.parse(code);
        } catch (error) {
          console.error(error);
        }

        return `export default ${JSON.stringify(loadedFormModule)}`;
      }
    },
  };
};