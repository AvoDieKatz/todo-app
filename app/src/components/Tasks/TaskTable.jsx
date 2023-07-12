import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { fetchAllList } from "../../services/TaskServices";
import Table from "react-bootstrap/Table";
import { dateFormatter } from "../../utils/common";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("id", {
        header: () => "ID",
    }),
    columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
        header: () => "Title",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: (info) => <i>{info.renderValue()}</i>,
        header: () => <span>Status</span>,
    }),
    columnHelper.accessor("created_at", {
        cell: (info) => (
            <i>
                {info.getValue()
                    ? dateFormatter(info.getValue(), "en-UK", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                      })
                    : "NaN"}
            </i>
        ),
        header: () => <span>Created at</span>,
    }),
    columnHelper.accessor("estimated", {
        header: () => "Estimated",
    }),
    columnHelper.accessor("actual", {
        header: () => "Actual",
    }),
];

const TaskTable = () => {
    const {
        isLoading,
        isError,
        data: tasks,
    } = useQuery({
        queryKey: ["todos", "list"],
        queryFn: async () =>
            await fetchAllList()
                .then((res) => res.data)
                .catch((err) => console.error(err)),
        staleTime: Infinity,
    });

    console.log(tasks);

    return (
        <>
            {isError ? (
                "Error!!!"
            ) : isLoading ? (
                "Loading..."
            ) : (
                <DataTable input={tasks} />
            )}
        </>
    );
};

const DataTable = ({ input }) => {
    const table = useReactTable({
        data: input,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </Table>
        </>
    );
};

DataTable.propTypes = {
    input: PropTypes.array.isRequired
}

export default TaskTable;
