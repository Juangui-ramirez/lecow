import { loadFeature, defineFeature } from "jest-cucumber";
import { UserEntity } from "../../src/types/app";
import { HTTP_CREATED, HTTP_OK } from "../../src/lib/httpCodes";
import { replacer } from "./utils";

const feature = loadFeature("features/users.feature");
defineFeature(feature, (test) => {
  // TODO improve this
  const url = "http://localhost:3000/api/v1/users";
  let newUser: Partial<UserEntity> = {};
  let allUsers: UserEntity[] = [];
  let replace = replacer();

  test("Create a user", ({ given, when, then }) => {
    given(/^user information name "(.*)" and email "(.*)"$/, (name, email) => {
      newUser = {
        ...newUser,
        name: replace(name),
        email: replace(email),
      };
    });
    when("create user api call is performed", async () => {
      const result = await fetch(url, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result.status).toBe(HTTP_CREATED);
      newUser = await result.json();
    });
    when("all users are queried", async () => {
      const result = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result.status).toBe(HTTP_OK);
      allUsers = await result.json();
    });
    then(
      /^user information name "(.*)" and email "(.*)" is received$/,
      (name, email) => {
        expect(newUser.id).toBeDefined();
        expect(newUser).toMatchObject({
          name: replace(name),
          email: replace(email),
        });
      },
    );
    then(
      /^user name "(.*)" and email "(.*)" is present in result$/,
      (tplname, tplemail) => {
        const name = replace(tplname);
        const email = replace(tplemail);
        const user = allUsers.find((user) => user.email === email);
        expect(user?.id).toBeDefined();
        expect(user).toMatchObject({
          name,
          email,
        });
      },
    );
  });
});
