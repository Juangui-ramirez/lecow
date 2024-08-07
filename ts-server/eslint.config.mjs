import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginJest from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  eslintPluginPrettierRecommended,
  {
    files: ["src/**/*.ts", "features/**/*.ts"],
    ignores: ["node_modules"],
    // rules: {
    //   semi: "error",
    //   "no-extra-semi": "error",
    // },
  },
  {
    files: ["features/**/*.ts"],
    plugins: [eslintPluginJest],
  },
);
