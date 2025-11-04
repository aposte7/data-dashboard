import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

function ProductTable({ products = [], onView, onEdit, onDelete }) {
  const [openId, setOpenId] = useState(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Rating</TableHead>
          <TableHead className="w-1">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={8}
              className="py-8 text-center text-sm text-gray-500"
            >
              No products yet.
            </TableCell>
          </TableRow>
        ) : (
          products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <div className="h-10 w-10 overflow-hidden rounded bg-gray-100">
                  <img
                    src={p.image || "https://via.placeholder.com/40"}
                    alt={p.title || "Product image"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </TableCell>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.brand}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell className="text-right">
                ${(p.priceNumber ?? 0).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {(p.rating ?? 0).toFixed(1)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu
                  open={openId === p.id}
                  onOpenChange={(o) => setOpenId(o ? p.id : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
                      aria-label="Open actions"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-700" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        onView?.(p);
                        setOpenId(null);
                      }}
                    >
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onEdit?.(p);
                        setOpenId(null);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-50"
                      onClick={() => {
                        onDelete?.(p);
                        setOpenId(null);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
