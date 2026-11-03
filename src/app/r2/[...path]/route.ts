const R2_BASE = "https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const r2Url = `${R2_BASE}/${path.join("/")}`;
  const r2Response = await fetch(r2Url);

  if (!r2Response.ok) {
    return new Response(null, { status: r2Response.status });
  }

  const headers = new Headers();
  const contentType = r2Response.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const contentLength = r2Response.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(r2Response.body, { status: 200, headers });
}
