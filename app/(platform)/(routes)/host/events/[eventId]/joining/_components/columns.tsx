"use client";

import { Button } from "@/components/ui/button"
import { Applicant } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
} from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import AttendanceConfirmationButton from "./attendance-confirmation-button"

export const columns: ColumnDef<Applicant>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <>
          アイコン
        </>
      )
    },
    cell: ({ row }) => {
      const iconImage = row.getValue("image") || null;
      return (
        <>
          <Avatar className="h-10 w-10">
            <AvatarImage src={`${iconImage}`} />
          </Avatar>
        </>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <>
          名前
        </>
      )
    }
  },
  {
    accessorKey: "nameKana",
    header: ({ column }) => {
      return (
        <>
          カナ
        </>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <>
          メールアドレス
        </>
      )
    }
  },
  {
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          学校名
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          学年
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fieldOfStudy",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          専門分野
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "prefecture",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 m-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          出身地
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.userId;
      const eventId = row.original.eventId;

      return (
        <>
          <AttendanceConfirmationButton
            eventId={eventId}
            userId={userId}
          />
        </>
      )
    }
  }
]
