"use client"

import { Button } from "@/components/ui/button"
import { Event } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, FileCheck, MessageCircle, MoreHorizontal, Pencil, UserCheck } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format, isValid } from "date-fns"

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          タイトル
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          日程
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const datetime: string | null | undefined = row.getValue("datetime");
      // datetime が null または undefined でないことを確認
      if (datetime) {
        const formattedDate = format(new Date(datetime), "yyyy-MM-dd");
        return <span>{formattedDate}</span>;
      }

      return <span>日程が設定されていません</span>;
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          公開状況
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"

        )}>
          {isPublished ? "公開" : "非公開"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only"></span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/host/events/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                イベント編集
              </DropdownMenuItem>
            </Link>
            <Link href={`/host/events/${id}/comments`}>
              <DropdownMenuItem>
                <MessageCircle className="h-4 w-4 mr-2" />
                コメント一覧
              </DropdownMenuItem>
            </Link>
            <Link href={`/host/events/${id}/joining`}>
              <DropdownMenuItem>
                <UserCheck className="h-4 w-4 mr-2" />
                参加者一覧
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
