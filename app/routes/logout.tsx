import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "../utils/session.server";

/*
First, the new logout route is just there to make it easy for us to logout.
The reason that we're using an action (rather than a loader) is because we want to avoid CSRF problems by using a POST request rather than a GET request.
This is why the logout button is a form and not a link.
Additionally, Remix will only re-call our loaders when we perform an action, so if we used a loader then the cache would not get invalidated.
The loader is just there in case someone somehow lands on that page, we'll just redirect them back home.
*/

export const action = ({ request }: ActionFunctionArgs) => logout(request);

export const loader = () => redirect("/");
