'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDataDemo } from '@/services/demos';
import { Demo } from '@/types/demos';
import dayjs from 'dayjs';

export const columns: ColumnDef<Demo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="capitalize text-[12px] font-semibold">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'bio',
    header: () => <div>Bio</div>,
    cell: ({ row }) => (
      <div className="lowercase text-[12px] max-w-[100px] overflow-clip">{row.getValue('bio')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'language',
    header: () => <div>Language</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue('language')}</div>,
  },
  {
    accessorKey: 'version',
    header: () => <div>Version</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue('version')}</div>,
  },
  {
    id: 'actions',
    header: () => <div>Created Date</div>,
    cell: ({ row }) => (
      <div className="font-medium">
        {dayjs(new Date().toISOString()).format('DD/MM/YYYY HH:mm:ss')}
      </div>
    ),
  },
];

export default function DataTable() {
  const pageSize = 100;
  const [page, setPage] = React.useState(1);
  const [visibleDataDemo, setVisibleDataDemo] = React.useState<Demo[]>([]);
  const [allDataDemo, setAllDataDemo] = React.useState<Demo[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editingRows, setEditingRows] = React.useState<Set<string>>(new Set());
  const [tempIdCounter, setTempIdCounter] = React.useState(1);

  const table = useReactTable<Demo>({
    data: visibleDataDemo,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const fetchAllDataDemo = async () => {
    try {
      const data = await getDataDemo();
      setAllDataDemo(data);
      setVisibleDataDemo(data.slice(0, pageSize));
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchAllDataDemo();
  }, []);

  const loadMore = React.useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize;
    const end = start + pageSize;
    const more = allDataDemo.slice(start, end);

    if (more.length > 0) {
      setVisibleDataDemo((prev) => [...prev, ...more]);
      setPage(nextPage);
    }
  }, [page, allDataDemo]);

  const addNewRow = () => {
    const tempId = `temp_${tempIdCounter}`;
    const newRow: Demo = {
      id: tempId,
      amount: 0,
      status: 'pending',
      email: '',
    };

    setTempIdCounter((prev) => prev + 1);
    setVisibleDataDemo((prev) => [newRow, ...prev]);
    setEditingRows((prev) => new Set([...prev, tempId]));
  };

  const saveRow = (id: string, updatedData: Partial<Demo>) => {
    setVisibleDataDemo((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...updatedData } : row))
    );
    setEditingRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const cancelEdit = (id: string) => {
    if (id.startsWith('temp_')) {
      // Remove temporary row if canceling edit
      setVisibleDataDemo((prev) => prev.filter((row) => row.id !== id));
    } else {
      // Just stop editing for existing rows
      setEditingRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const startEdit = (id: string) => {
    setEditingRows((prev) => new Set([...prev, id]));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button onClick={addNewRow} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Row
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
