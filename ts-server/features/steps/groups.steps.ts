import { loadFeature, defineFeature } from "jest-cucumber";
import Context, { GroupCtx } from "./context";

const feature = loadFeature("features/groups.feature");
defineFeature(feature, (test) => {
  test("create a group", ({ when, then }) => {
    const ctx = new Context();
    let result: GroupCtx | undefined;
    when(
      /^a group creation with name "(.*)" is requested$/,
      async (name: string) => {
        result = await ctx.createGroup(name, {
          noValidate: true,
        });
      },
    );

    then("group is created correctly", () => {
      ctx.validateGroupCtx(result);
    });
  });
});
