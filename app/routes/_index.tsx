import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { getUser, requireUserId } from "../utils/session.server";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Drawdash" },
    { name: "description", content: "Home of Drawdash!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUser(request);

  return json({
    userId,
    user,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  console.log("#### data", data);

  return (
    <div>
      {data.user ? (
        <div className="user-info">
          <span className="text-xl font-bold">{`Hi ${data.user.username}`}</span>
          <form action="/logout" method="post">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </form>

          <form action="/new" method="post">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              New Drawing
            </button>
          </form>
        </div>
      ) : (
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      )}
    </div>
  );
}
