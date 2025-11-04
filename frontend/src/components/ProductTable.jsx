import React from "react";
import Button from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { MoreVertical, ExternalLink, Eye, Copy } from "lucide-react";

export default function ProductTable({ products }) {
  if (!products.length) {
    return <div className="text-gray-500">No products match your filters.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-600">
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Image
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Name
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Category
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Price
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Rating
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Reviews
            </th>
            <th className="px-3 py-3 text-xs font-semibold tracking-wide uppercase">
              Availability
            </th>
            <th className="px-3 py-3 text-right text-xs font-semibold tracking-wide uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-3 py-3">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title || "Product image"}
                    className="h-12 w-12 rounded border object-cover"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded bg-gray-100 text-gray-400">
                    —
                  </div>
                )}
              </td>
              <td className="max-w-[360px] px-3 py-3">
                <a
                  href={p.productUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-gray-900 hover:underline"
                >
                  {p.title || "Untitled"}
                </a>
                <div className="text-xs text-gray-500">ID: {p.id}</div>
              </td>
              <td className="px-3 py-3">{p.category || "—"}</td>
              <td className="px-3 py-3">
                {p.priceDisplay ??
                  (p.priceNumber != null
                    ? `$${p.priceNumber.toFixed(2)}`
                    : "—")}
              </td>
              <td className="px-3 py-3">
                {p.rating != null ? `${p.rating.toFixed(1)}★` : "—"}
              </td>
              <td className="px-3 py-3">{p.reviewsCount ?? "—"}</td>
              <td className="px-3 py-3">
                {p.availability ? (
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 capitalize">
                    {p.availability}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      aria-label="Open actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={() => {
                        // Placeholder for a details view hook/route
                        alert(`Product ${p.id}: ${p.title || "Untitled"}`);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        if (p.productUrl) {
                          window.open(p.productUrl, "_blank", "noopener");
                        }
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Open link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={async () => {
                        try {
                          await navigator.clipboard.writeText(String(p.id));
                        } catch (e) {
                          console.warn("Clipboard unsupported", e);
                        }
                      }}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
