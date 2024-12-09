/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Suspense } from "react";
import { IPost } from "~/interfaces/Post";

export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: `Post details - ${data?.post?.title}` },
    { name: "description", content: "post details " },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await axios({
    method: "GET",
    url: `https://jsonplaceholder.typicode.com/posts/${params?.id}`,
  });

  const data: IPost = await response.data;
  return json({ post: data });
};

function SkeletonPage() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2" />
              <div className="h-2 bg-slate-700 rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostDetailsPage() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<SkeletonPage />}>
      <Await resolve={post}>
        {(data) => {
          console.log(data);
          return (
            <div className="p-4 ">
              <div className="p-4">
                <div>
                  <h3 className="text-gray-800 font-medium text-lg">
                    {data.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-3">{data.body}</p>
                </div>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
