import { loadFeature, defineFeature } from "jest-cucumber";
import { HTTP_CONFLICT, HTTP_CREATED } from "../../src/lib/httpCodes";
import Context, { CreateUser, CreateGroup } from "./context";

const feature = loadFeature("features/invites.feature");
defineFeature(feature, (test) => {
  test("Invite a user to group", ({ given, and, when, then }) => {
    const ctx = new Context();
    given("created users:", async (table: CreateUser[]) => {
      await ctx.createUsers(table);
    });

    and("created groups:", async (table: CreateGroup[]) => {
      await ctx.createGroups(table);
    });

    when(
      /^user "(.+)" is invited to group "(.+)"$/,
      async (user: string, group: string) => {
        await ctx.invite(user, group);
      },
    );

    then(/^the invite was successful$/, () => {
      ctx.wasLastInvite(HTTP_CREATED);
    });
  });

  test("User already invited", ({ given, and, when, then }) => {
    const ctx = new Context();
    given("created users:", async (table: CreateUser[]) => {
      await ctx.createUsers(table);
    });

    and("created groups:", async (table: CreateGroup[]) => {
      await ctx.createGroups(table);
    });

    when(
      /^user "(.+)" is invited to group "(.+)"$/,
      async (user: string, group: string) => {
        await ctx.invite(user, group);
      },
    );

    then(/^the invite was successful$/, () => {
      ctx.wasLastInvite(HTTP_CREATED);
    });

    when(
      /^user "(.+)" is invited again to group "(.+)"$/,
      async (user: string, group: string) => {
        await ctx.invite(user, group);
      },
    );

    then("the invite was not successful", () => {
      ctx.wasLastInvite(HTTP_CONFLICT);
    });
  });
});
