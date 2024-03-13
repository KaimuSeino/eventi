"use client"

import { Button } from "@/components/ui/button"
import { Event } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  UserCheck,
  FileCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format, isValid } from "date-fns"
import { ja } from 'date-fns/locale';

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
    accessorFn: (row) => `${row.startDatetime} - ${row.endDatetime}`,
    header: '日程',
    cell: ({ getValue }) => {
      const dateRange = getValue() as string;
      const [startDatetime, endDatetime] = dateRange.split(' - ');
      const startDate = new Date(startDatetime);
      const endDate = new Date(endDatetime);
      const formattedStartDate = isValid(startDate) ? format(startDate, "yyyy-MM-dd") : '未定';
      const formattedEndDate = isValid(endDate) ? format(endDate, "yyyy-MM-dd") : '未定';
      return <span>{`${formattedStartDate}〜${formattedEndDate}`}</span>;
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
            <Link href={`/host/events/${id}/joining`}>
              <DropdownMenuItem>
                <UserCheck className="h-4 w-4 mr-2" />
                参加者一覧
              </DropdownMenuItem>
            </Link>
            <Link href={`/host/events/${id}/answers`}>
              <DropdownMenuItem>
                <FileCheck className="h-4 w-4 mr-2" />
                アンケート回答
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
