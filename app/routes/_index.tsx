import { Key } from "react";
import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { getUser, requireUserId } from "../utils/session.server";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Drawdash" },
    { name: "description", content: "Home of Drawdash!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
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
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{`Hi ${data.user.username}`}</h1>
        <form action="/logout" method="post">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700">Your Drawings</h2>
        <ul className="grid grid-cols-3 gap-4 mt-4">
          {data.drawings.map((drawing: { id: Key; name: string }) => (
            <li key={drawing.id} className="bg-white shadow-lg rounded-lg p-4">
              <Link
                to={`/drawing/${drawing.id}`}
                className="text-lg font-medium text-blue-500 hover:text-blue-600"
              >
                {drawing.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <form action="/new" method="post">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mt-8"
          type="submit"
        >
          New Drawing
        </button>
      </form>
    </div>
  );
}
