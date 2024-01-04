import {
  type MetaFunction,
  ActionFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";
import { motion } from "framer-motion";
import { db } from "../utils/db.server";
import { useSearchParams, useActionData } from "@remix-run/react";
import { badRequest } from "../utils/request.server";
import {
  login,
  createUserSession,
  register,
  notRequireUserId,
} from "../utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Drawdash" },
    { name: "description", content: "Welcome to Drawdash!" },
  ];
};

function validateUsername(username: string) {
  if (username.length < 3) {
    return "Usernames must be at least 3 characters long";
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return "Passwords must be at least 6 characters long";
  }
}

function validateUrl(url: string) {
  const urls = ["/"];

  if (urls.includes(url)) {
    return url;
  }

  return "/";
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const password = form.get("password");
  const username = form.get("username");
  const redirectTo = validateUrl((form.get("redirectTo") as string) || "/");

  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { loginType, password, username };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  console.log(loginType);

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      console.log({ user });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Username/Password combination is incorrect",
        });
      }

      return createUserSession(user.id, redirectTo);
    }

    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Something went wrong trying to create a new user.",
        });
      }
      return createUserSession(user.id, redirectTo);
    }

    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export const loader: LoaderFunction = async ({ request }) =>
  notRequireUserId(request);

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

  const background = {
    hidden: { scale: 1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  const backdrop = {
    initial: {
      height: 0,
      overflow: "hidden",
      backdropFilter: "blur(0px)",
    },
    expanded: {
      height: "auto", // Adjust to the desired final height, or use 'auto'
      transition: { duration: 1 }, // Duration for the height transition
    },
    blurred: {
      backdropFilter: "blur(40px)", // Adjust the blur value as needed
      transition: { duration: 5, delay: 1 }, // Duration for the blur transition
    },
  };
  const drawdash = {
    initial: {
      width: 0,
      overflow: "hidden",
      transition: { duration: 0 }, // Instantly start at 0 width
    },
    expanded: {
      width: 300, // Adjust to the desired final width
      transition: {
        duration: 1, // Duration for the width transition
        delay: 1, // 1 second delay before the animation starts
      },
    },
  };

  return (
    <div className="relative bg-black">
      <motion.div
        className="h-screen z-0 overflow-hidden"
        initial="hidden"
        animate="visible"
        custom={-1}
        variants={background}
      >
        <img src="/backdrop.jpg" alt="landing-page" />
      </motion.div>
      <div className="flex flex-col text-white absolute top-0 w-full justify-center items-center rounded-2xl min-h-screen">
        <motion.div
          initial="initial"
          animate={["expanded", "blurred"]}
          custom={-1}
          variants={backdrop}
          className="w-full max-w-md bg-black bg-opacity-30 mb-20 rounded-2xl shadow mx-4"
        >
          <div className="w-full p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 font-borel">
              Dashpad
            </h1>
            <form method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") ?? undefined}
              />
              <fieldset className="mb-4">
                <legend className="text-lg font-semibold">
                  Login or Register?
                </legend>
                <div className="flex items-center justify-between max-w-[250px]">
                  <label className="block mt-2">
                    <input
                      type="radio"
                      name="loginType"
                      value="login"
                      defaultChecked={
                        !actionData?.fields?.loginType ||
                        actionData?.fields?.loginType === "login"
                      }
                      className="mr-2"
                    />
                    Login
                  </label>
                  <label className="block mt-2">
                    <input
                      type="radio"
                      name="loginType"
                      value="register"
                      defaultChecked={
                        actionData?.fields?.loginType === "register"
                      }
                      className="mr-2"
                    />
                    Register
                  </label>
                </div>
              </fieldset>
              <div className="mb-4">
                <label htmlFor="username-input" className="block">
                  Username
                </label>
                <input
                  type="text"
                  id="username-input"
                  name="username"
                  defaultValue={actionData?.fields?.username}
                  aria-errormessage={
                    actionData?.fieldErrors?.username
                      ? "username-error"
                      : undefined
                  }
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
                {actionData?.fieldErrors?.username ? (
                  <p
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                    id="username-error"
                  >
                    {actionData.fieldErrors.username}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="password-input" className="block">
                  Password
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  defaultValue={actionData?.fields?.password}
                  aria-errormessage={
                    actionData?.fieldErrors?.password
                      ? "password-error"
                      : undefined
                  }
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
                />
                {actionData?.fieldErrors?.password ? (
                  <p
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                    id="password-error"
                  >
                    {actionData.fieldErrors.password}
                  </p>
                ) : null}
              </div>
              <div id="form-error-message">
                {actionData?.formError ? (
                  <p className="text-red-500 text-sm" role="alert">
                    {actionData.formError}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="expanded"
          variants={drawdash}
          className="absolute bottom-16"
        >
          <img src="/drawdash.svg" alt="landing" width={500} />
        </motion.div>
      </div>
    </div>
  );
}
