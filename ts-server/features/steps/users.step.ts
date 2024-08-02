import { loadFeature, defineFeature } from "jest-cucumber";
import { UserEntity } from "../../src/types/app";
import { HTTP_CREATED } from "../../src/lib/httpCodes";

const replace = (function () {
  const replaceMap: Record<string, string> = {};
  return (text: string) => {
    let newText = text;
    for (const match of text.matchAll(new RegExp(/\{[^}]+\}/, "g"))) {
      let replacement = replaceMap[match[0]];
      if (!replacement) {
        replacement = `${Math.trunc(Math.random() * 100000)}`;
        replaceMap[match[0]] = replacement;
      }
      newText = newText.replace(`${match}`, replacement);
    }
    return newText;
  };
})();

const feature = loadFeature("features/users.feature");
defineFeature(feature, (test) => {
  const url = "http://localhost:3000/api/v1/users";
  let newUser: Partial<UserEntity> = {};

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
    then(
      /^user information name "(.*)" and email "(.*)" is received$/,
      (name, email) => {
        expect(newUser.id).toBeDefined();
        expect(newUser).toMatchObject({
          name: replace(name),
          email: replace(email),
        });
      }
    );
  });
});

// let url = "";
// let context: Partial<{
//   userData?: Partial<UserEntity>;
//   responseData?: UserEntity;
// }> = {};

// Before(function () {
//   context = {};
// });

// Given("server url {string}", function (server: string) {
//   url = server;
// });

// Given(
//   "user information name {string} and email {string}",
//   function (name: string, email: string) {
//     context.userData = {
//       name,
//       email,
//     };
//   },
// );

// When("create user api call is performed", async function () {
//   const result = await fetch(url, {
//     method: "post",
//     body: JSON.stringify(context.userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   expect(result.status).toBe(200);
//   context.responseData = (await result.json()) as UserEntity;
// });

// Then(
//   "user information name {string} and email {string} is received",
//   function (name: string, email: string) {
//     expect(context.responseData).toBe({
//       name,
//       email,
//     });
//   },
// );
