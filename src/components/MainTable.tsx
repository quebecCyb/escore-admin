import React from 'react';
import Table from "@/components/Table";

interface ListProps {
    uptimeStatuses: any[]
}

const MainTable: React.FC<ListProps> = ({ uptimeStatuses }) => {
    return (
        <Table rows={uptimeStatuses}></Table>
    );
};

export default MainTable;
