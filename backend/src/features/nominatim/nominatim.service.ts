import { ApiError } from "../../types/error.types.js";
import type { LocationCoordinates } from "../user/user.types.js";
import { env } from "../../config/env.js";

let requestQueue: Promise<void> = Promise.resolve();
let nextRequestAt = 0;

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}

function firstString(
  record: Record<string, unknown> | undefined,
  keys: string[],
): string | null {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return null;
}

async function reverseGeocodeRequest(url: URL): Promise<Response> {
  const request = requestQueue.then(async () => {
    const delay = Math.max(0, nextRequestAt - Date.now());
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    nextRequestAt = Date.now() + 1000;

    return fetch(url, {
      headers: {
        "User-Agent": "Ivesome/1.0 (profile location reverse geocoding)",
      },
      signal: AbortSignal.timeout(5000),
    });
  });

  requestQueue = request.then(
    () => undefined,
    () => undefined,
  );
  return request;
}

export async function enrichLocation(
  location: LocationCoordinates,
): Promise<LocationCoordinates> {
  const url = new URL(env.nominatimReverseURL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("lat", String(location.latitude));
  url.searchParams.set("lon", String(location.longitude));

  let response: Response;
  try {
    response = await reverseGeocodeRequest(url);
  } catch {
    throw new ApiError(502, "Location lookup service is unavailable");
  }

  if (!response.ok) {
    throw new ApiError(502, "Location lookup service returned an error");
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ApiError(502, "Location lookup service returned an invalid response");
  }

  const address = asRecord(asRecord(result)?.address);
  const countryCode = firstString(address, ["country_code"]);
  return {
    ...location,
    countryCode: countryCode?.toUpperCase() ?? null,
  };
}
