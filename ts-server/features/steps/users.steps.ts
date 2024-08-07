import { loadFeature, defineFeature } from "jest-cucumber";
import Context, { UserCtx } from "./context";

const feature = loadFeature("features/users.feature");
defineFeature(feature, (test) => {
  test("create an user", ({ when, then }) => {
    const ctx = new Context();
    let result: UserCtx | undefined;
    when(
      /^a user creation with name "(.*)" and email "(.*)" is requested$/,
      async (name: string, email: string) => {
        result = await ctx.createUser(name, email, {
          recordId: email,
          noValidate: true,
        });
      },
    );

    then("user is created correctly", () => {
      ctx.validateUserCtx(result);
    });
  });
});
