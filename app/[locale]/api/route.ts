import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url_image } = await request.json();
  if (!url_image)
    return NextResponse.json(
      {
        message: "Url image is requrie",
        data: "",
      },
      {
        status: 404,
      }
    );

  let databody = JSON.stringify({
    requests: [
      {
        image: {
          content: url_image,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
      },
    ],
  });

  try {
    const res = await fetch(process.env.CONVERTDATAURL as string, {
      method: "POST",
      body: databody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const text = res.responses[0].textAnnotations[0].description;
    return NextResponse.json(
      {
        message: "succes",
        data: text,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
        data: "",
      },
      {
        status: 500,
      }
    );
  }
}
