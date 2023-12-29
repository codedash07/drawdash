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
    <div>
      <span className="text-xl font-bold">{`Hi ${data.user.username}`}</span>
      <form action="/logout" method="post">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Logout
        </button>
      </form>

      <form action="/new" method="post">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          New Drawing
        </button>
      </form>

      <ol>
        {data.drawings.map((drawing: { id: Key; name: string }) => (
          <li key={drawing.id}>
            <Link
              to={`/drawing/${drawing.id}`}
              className="text-blue-500 hover:underline"
            >
              {drawing.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
