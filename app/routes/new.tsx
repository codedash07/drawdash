import { redirect, ActionFunction } from "@remix-run/node";
import { db } from "../utils/db.server";
import { requireUserId } from "../utils/session.server";
import { badRequest } from "../utils/request.server";

function validateDrawingName(name: string) {
  if (name.length < 3) {
    return "Drawing name must be at least 3 characters long";
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
