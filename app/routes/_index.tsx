import { Key } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  type MetaFunction,
} from "@remix-run/node";
import { motion } from "framer-motion";
import { getUser, getUserId, requireUserId } from "../utils/session.server";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { badRequest } from "../utils/request.server";
import Landing from "../components/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Drawdash" },
    { name: "description", content: "Home of Drawdash!" },
  ];
};

function validateDrawingName(name: string) {
  if (name.length < 3) {
    return "Enter at least 3 characters";
  }
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const name = form.get("name");

  if (typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { name };
  const fieldErrors = {
    name: validateDrawingName(name),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const drawingData = await db.drawing.create({
    data: {
      creatorId: userId,
      name,
    },
  });

  return redirect("/drawing/" + drawingData.id, { status: 303 });
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) {
    return json({
      userId: null,
      user: null,
      drawings: [],
    });
  }

  const user = await getUser(request);

  const drawings = await db.drawing.findMany({
    where: {
      creatorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({
    userId,
    user,
    drawings,
  });
};

export default function Index() {
  const newActionData = useActionData<typeof action>();
  const data = useLoaderData<typeof loader>();
  const containerVariants = {
    hidden: { opacity: 0, y: -400 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  if (!data.userId) {
    return <Landing />;
  }

  return (
    <div className="relative h-screen">
      <div className="absolute -z-20 top-0 left-0 h-screen overflow-hidden">
        <img src="/background-dashboard.jpg" alt="landing-page" />
      </div>

      <motion.div
        initial="hidden"
        variants={containerVariants}
        animate="visible"
        className="container mx-auto p-6 bg-gray-50 bg-opacity-70 backdrop-blur-lg rounded-b-xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">{`Hi, ${data.user.username}`}</h1>
          <form action="/logout" method="post">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
              type="submit"
            >
              Logout
            </motion.button>
          </form>
        </div>

        <form action="?index" method="post" className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Create a New Drawing
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              id="name-input"
              name="name"
              placeholder="Drawing Name"
              className="w-full md:w-auto flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
              aria-errormessage={
                newActionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
              type="submit"
            >
              Create
            </button>

            {newActionData?.fieldErrors?.name && (
              <p
                className="text-red-500 text-sm mt-1"
                role="alert"
                id="name-error"
              >
                {newActionData.fieldErrors.name}
              </p>
            )}
          </div>
        </form>

        {data.drawings.length > 0 && (
          <div className="border-t-2">
            <h2 className="text-2xl text-center py-2 mt-6 font-semibold text-gray-700 mb-4">
              Your Drawings
            </h2>
            <div className="flex items-center justify-center">
              <ul className="flex flex-wrap gap-6 justify-center">
                {data.drawings.map((drawing: { id: Key; name: string }) => (
                  <li
                    key={drawing.id}
                    className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition duration-200"
                  >
                    <Link
                      to={`/drawing/${drawing.id}`}
                      className="text-lg font-medium text-blue-500 hover:text-blue-600 transition duration-200"
                    >
                      {drawing.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
