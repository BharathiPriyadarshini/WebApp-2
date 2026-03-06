// "use client";

// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/Button";
// import { useModels } from "@/hooks/useModels";

// /* ================= PAGE ================= */

// export default function BrandModelsPage({
//   searchParams,
// }: {
//   searchParams?: { id?: string };
// }) {
//   const { brandId } = useParams();

//   // Determine the actual _id of the brand from searchParams or slug
//   const id = searchParams?.id || (typeof brandId === "string" ? brandId : "");

//   const { models, loading, page, totalPages, loadMore } = useModels(id);

//   if (!id) return <div>Brand not found</div>;

//   return (
//     <div className="bg-muted/30 min-h-screen space-y-10 p-6 md:p-12">
//       <div className="max-w-7xl mx-auto px-6 py-20">
//         <h1 className="text-3xl font-bold mb-10 capitalize">Models</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading && models.length === 0
//             ? Array.from({ length: 6 }).map((_, i) => (
//               <Card
//                 key={i}
//                 className="p-8 bg-[#111] rounded-2xl animate-pulse h-20"
//               />
//             ))
//             : models.map((model) => (
//               <Link
//                 key={model._id}
//                 href={`/trims?brand=${id}&model=${model.name}`}
//                 className="p-8 bg-[#111] rounded-2xl border border-white/10 hover:border-blue-500 transition uppercase text-center md:text-left"
//               >
//                 {model.name}
//               </Link>
//             ))}
//         </div>

//         {page < totalPages && (
//           <div className="flex justify-center mt-6">
//             <Button
//               variant="outline"
//               className="rounded-full px-8"
//               onClick={loadMore}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Load more models"}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }