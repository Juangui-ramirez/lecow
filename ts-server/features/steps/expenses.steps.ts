import { loadFeature, defineFeature } from "jest-cucumber";
import Context, { CreateGroup, CreateUser, UserBalance } from "./context";
import { StepsDefinitionCallbackFunction } from "jest-cucumber/dist/src/feature-definition-creation";

const generate3expenses: StepsDefinitionCallbackFunction = ({
  given,
  and,
  when,
  then,
}) => {
  const ctx = new Context();
  let participants: string[] = [];
  given("created users:", async (users: CreateUser[]) => {
    await ctx.createUsers(users);
  });

  and("created groups:", async (groups: CreateGroup[]) => {
    await ctx.createGroups(groups);
  });

  given(
    /^users belongs to group "(.*)":$/,
    async (group: string, users: CreateUser[]) => {
      await ctx.inviteAll(users, group);
      participants = users.map((i) => i.user);
    },
  );

  when(
    /^user "(.*)" pays for "(.*)" the amount "(.*)" in group "(.*)"$/,
    async (
      user: string,
      description: string,
      amount: string,
      group: string,
    ) => {
      await ctx.createExpense({
        user,
        group,
        description,
        amount,
        participants,
      });
    },
  );

  then("users have following balances:", async (items: UserBalance[]) => {
    await ctx.validateUsersBalance(items);
  });

  when(
    /^user "(.*)" pays for "(.*)" the amount "(.*)" in group "(.*)"$/,
    async (
      user: string,
      description: string,
      amount: string,
      group: string,
    ) => {
      await ctx.createExpense({
        user,
        group,
        description,
        amount,
        participants,
      });
    },
  );

  then("users have following balances:", async (items: UserBalance[]) => {
    await ctx.validateUsersBalance(items);
  });

  when(
    /^user "(.*)" pays for "(.*)" the amount "(.*)" in group "(.*)"$/,
    async (
      user: string,
      description: string,
      amount: string,
      group: string,
    ) => {
      await ctx.createExpense({
        user,
        group,
        description,
        amount,
        participants,
      });
    },
  );

  then("users have following balances:", async (items: UserBalance[]) => {
    await ctx.validateUsersBalance(items);
  });
};

const feature = loadFeature("features/expenses.feature");
defineFeature(feature, (test) => {
  test("all users pay the same", generate3expenses);
  test("all users pay some", generate3expenses);
});
