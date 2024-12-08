// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  console.log(request.headers);
  return Response.json({ message: "Ok" });
}
