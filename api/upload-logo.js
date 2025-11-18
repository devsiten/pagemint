import { put } from "@vercel/blob";

export default async function handler(req, res) {
  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = "logo-" + Date.now() + ".png";

  const blob = await put(filename, buffer, {
    access: "public",
    contentType: "image/png"
  });

  res.json({ url: blob.url });
}
