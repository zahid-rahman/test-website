import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { IPost } from "~/interfaces/Post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const response = await axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
  });

  const data = await response.data;
  return json({ posts: data });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="px-0 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* List Box Container */}
        <div className="max-h-auto overflow-y-auto">
          {/* List Box Header */}

          {/* List Box Items */}
          <ul role="listbox" className="">
            {/* List Item 1 */}

            {posts.map((post: IPost, index: number) => {
              return (
                <li
                  key={index}
                  className="px-4 py-6 hover:bg-blue-50 flex items-center space-x-4 border border-1 mb-2 rounded-md"
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar 1"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-gray-800 font-medium">{post.title}</h3>
                    <p className="text-gray-500 text-sm mt-3">{post.body}</p>
                    <Link className="bg-purple-600 text-sm px-2 py-1 text-white rounded-md"  to={`/posts/details/${post.id}`}>view link</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
